import { Injectable } from '@nestjs/common';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';
import { AccountEntity, AccountRole, AccountStatus } from '../../../domain/entities/account.entity';
import { CreateAccountDto } from './CreateAccountDTO';

@Injectable()
export class CreateAccountUseCase {
    constructor(private readonly accountRepository: IAccountRepository) {}

    async execute(dto: CreateAccountDto): Promise<AccountEntity> {
        const account = AccountEntity.create(dto);
        await this.accountRepository.save(account);
        
        return account;
    }
}