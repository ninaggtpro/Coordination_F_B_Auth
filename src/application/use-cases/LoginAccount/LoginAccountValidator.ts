import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountEntity, AccountStatus } from '../../../domain/entities/account.entity';

@Injectable()
export class LoginAccountValidator {
    validateAccountStatus(account: AccountEntity): void {
        if (account.status === AccountStatus.CLOSED) {
            throw new UnauthorizedException('Account is closed');
        }
    }

    validateAccountExists(account: AccountEntity | null): void {
        if (!account) {
            throw new NotFoundException('Identifiants non trouvé (paire login / mot de passe inconnue)');
        }
    }
}
