import {AccountEntity} from '../entities/account.entity';


export abstract class IAccountRepository {
    abstract create(account: AccountEntity): Promise<AccountEntity>;
    abstract findAll(): Promise<AccountEntity[]>;
    abstract findByLogin(login: string): Promise<AccountEntity | null>;
}