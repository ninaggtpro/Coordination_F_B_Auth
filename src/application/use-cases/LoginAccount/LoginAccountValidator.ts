import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountEntity } from '../../../domain/entities/account.entity';

@Injectable()
export class LoginAccountValidator {
    validateAccountStatus(account: AccountEntity): void {
        if (account.status === 'closed') {
            throw new UnauthorizedException('Account is closed');
        }
    }

    validateAccountExists(account: AccountEntity | null): void {
        if (!account) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
