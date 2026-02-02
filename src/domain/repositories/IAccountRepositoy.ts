import {AccountEntity} from '../entities/account.entity';


export abstract class IAccountRepository {
    abstract save(account: AccountEntity): Promise<AccountEntity>;
    abstract findAll(): Promise<AccountEntity[]>;
}