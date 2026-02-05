import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly accountRepository: IAccountRepository,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret',
        });
    }

    async validate(payload: any) {
        const account = await this.accountRepository.findByEmail(payload.email);
        
        if (!account) {
            throw new UnauthorizedException();
        }

        return { 
            uid: payload.uid, 
            email: payload.email, 
            roles: payload.roles 
        };
    }
}
