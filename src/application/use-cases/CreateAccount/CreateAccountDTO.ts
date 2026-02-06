import { AccountRole, AccountStatus } from '../../../domain/entities/account.entity';

export class CreateAccountDto {
    readonly email!: string;
    readonly password!: string;
    readonly roles?: AccountRole[];
    readonly status?: AccountStatus;
}