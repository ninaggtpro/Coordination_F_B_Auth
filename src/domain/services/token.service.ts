import { Injectable } from '@nestjs/common';
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
    
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
