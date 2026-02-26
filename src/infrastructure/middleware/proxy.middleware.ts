import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private proxies: Map<string, RequestHandler> = new Map();

  constructor(private configService: ConfigService) {
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
        this.proxies.set(
          service.path,
          createProxyMiddleware({
            target,
            changeOrigin: true,
            pathRewrite: {
              [`^${service.path}`]: '',
            },
            on: {
              proxyReq: (proxyReq, req: any) => {
                // Transmettre les headers enrichis par l'AuthGuard
                if (req.headers['x-user-id']) {
                  proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
                }
                if (req.headers['x-user-roles']) {
                  proxyReq.setHeader(
                    'x-user-roles',
                    req.headers['x-user-roles'],
                  );
                }
              },
            },
          }),
        );
      }
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
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
}
