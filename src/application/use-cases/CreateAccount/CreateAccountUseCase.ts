import { Injectable, ConflictException } from '@nestjs/common';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';
import { AccountEntity, AccountRole, AccountStatus, AccountProvider } from '../../../domain/entities/account.entity';
import { CreateAccountDTO } from './CreateAccountDTO';
import { CreateAccountValidator } from './CreateAccountValidator';

@Injectable()
export class CreateAccountUseCase {
    private readonly validator = new CreateAccountValidator();
    
    constructor(private readonly accountRepository: IAccountRepository) {}

    async execute(dto: CreateAccountDTO): Promise<AccountEntity> {
        this.validator.validate(dto);

        const existingAccount = await this.accountRepository.findByLogin(dto.login);
        if (existingAccount) {
            throw new ConflictException('Login already exists');
        }

        const account = AccountEntity.create({
            login: dto.login,
            password: dto.password,
            roles: dto.roles as AccountRole[],
            status: dto.status as AccountStatus,
            provider: dto.provider as AccountProvider,
        });
        
        await this.accountRepository.create(account);
        
        return account;
    }
}