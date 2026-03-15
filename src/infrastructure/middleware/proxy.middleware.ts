import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware, fixRequestBody, RequestHandler } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../domain/services/token.service';
import { log } from 'console';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private proxies: Map<string, RequestHandler> = new Map();

  constructor(
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {
    this.setupProxies();
  }

  private setupProxies() {
    const services = [
      { path: '/api/booking', envKey: 'BOOKING_SERVICE_URL' },
      { path: '/api/movie', envKey: 'MOVIE_SERVICE_URL' },
      { path: '/api/cinema', envKey: 'CINEMA_SERVICE_URL' },
    ];

    services.forEach((service) => {
      const target = this.configService.get<string>(service.envKey);
      if (target) {
        console.log(`[PROXY CONFIG] Configured ${service.path} to target: ${target}`);
        this.proxies.set(
          service.path,
          createProxyMiddleware({
            target,
            changeOrigin: true,
            secure: false, // Bypass invalid SSL configs
            logger: console,
            pathRewrite: {
              [`^${service.path}`]: '',
            },
            on: {
              proxyReq: (proxyReq: any, req: any) => {
                console.log(`\n[PROXY] ${req.method} ${req.originalUrl}`);
                console.log(`[PROXY] -> Cible : ${target}${proxyReq.path}`);

                if (req['user_id']) {
                  proxyReq.setHeader('x-user-id', req['user_id']);
                }
                if (req['user_roles']) {
                  proxyReq.setHeader('x-user-roles', req['user_roles']);
                }
                
                // Fix body parsing issue
                if (req.body && Object.keys(req.body).length > 0) {
                  fixRequestBody(proxyReq, req);
                }
              },
              proxyRes: (proxyRes, req, res) => {
                console.log(`[PROXY RES] ${req.method} ${req.url} -> Status: ${proxyRes.statusCode}`);
              },
              error: (err, req, res) => {
                console.error(`[PROXY ERROR] Error for ${req.method} ${req.url}:`, err.message);
              }
            },
          }),
        );
      } else {
        console.warn(`[PROXY CONFIG] Missing env value for ${service.envKey}`);
      }
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    console.log(`\n[GATEWAY RECUE] ${req.method} ${req.originalUrl}`);

    // 1. Validation de l'authentification ICI pour les requêtes proxy
    const token = this.extractTokenFromHeader(req);
    console.log(`\n[GATEWAY RECUE] ${token}`);
    if (token) {
      try {
        const payload = this.tokenService.verifyToken(token);
        // On attache ces données pour que "proxyReq" puisse les lire juste après
        (req as any)['user_id'] = payload.sub;
        (req as any)['user_roles'] = Array.isArray(payload.roles)
          ? payload.roles.join(',')
          : payload.roles;
      } catch (error) {
        // Optionnel : Soit on bloque en jetant une erreur, soit on ignore.
        // On ignore pour laisser passer en "invité" si la route est publique.
      }
    }

    const route = Object.keys(Array.from(this.proxies.keys())).find((path) =>
      req.originalUrl.startsWith(path),
    );

    // Better way to find the matching proxy
    for (const [path, proxy] of this.proxies) {
      if (req.originalUrl.startsWith(path)) {
        return proxy(req, res, next);
      }
    }

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
