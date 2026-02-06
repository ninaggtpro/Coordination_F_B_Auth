import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountEntity, AccountStatus } from '../../../domain/entities/account.entity';

@Injectable()
export class LoginAccountValidator {
}
