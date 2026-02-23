import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(account: AccountEntity): string {
    const payload = {
      sub: account.uid,
      email: account.email,
      roles: account.roles,
    };
    
    return this.jwtService.sign(payload, { 
      expiresIn: '60m' 
    });
  }

  generateRefreshToken(account: AccountEntity): string {
  
  const payload = {
    sub: account.uid,
    type: 'refresh',
  };
  
  return this.jwtService.sign(payload, { 
    expiresIn: '120m', 
    secret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret', 
  });
}
  verifyToken(token: string, isRefresh = false): any {
  try {
      const payload = this.jwtService.verify(token, {
        secret: isRefresh 
          ? (process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret') 
          : undefined
      });

      if (isRefresh && payload.type !== 'refresh') {
        throw new UnauthorizedException('This is not a refresh token');
      }
      
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
}
}
