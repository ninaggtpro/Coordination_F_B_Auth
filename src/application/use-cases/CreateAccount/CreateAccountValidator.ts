import { BadRequestException } from '@nestjs/common';
import { CreateAccountDto } from './CreateAccountDTO';

export class CreateAccountValidator {

  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validateisEmail(email : string):void{
    if (!email) {
      throw new BadRequestException('Email is required');
    }

      if (!this.EMAIL_REGEX.test(email)) {
      throw new BadRequestException('Invalid email format');
    }
  }
}
