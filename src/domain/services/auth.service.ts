import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly roundsOfHashing = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.roundsOfHashing);
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
