import { Injectable, ConflictException } from '@nestjs/common';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';
import { AccountEntity } from '../../../domain/entities/account.entity';
import { AuthService } from '../../../domain/services/auth.service';
import { CreateAccountDto } from './CreateAccountDTO';
import { CreateAccountValidator } from './CreateAccountValidator';

@Injectable()
export class CreateAccountUseCase {
    private readonly validator = new CreateAccountValidator();

    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly authService: AuthService,
    ) { }

    async execute(dto: CreateAccountDto): Promise<AccountEntity> {
        this.validator.validate(dto);

        const existingAccount = await this.accountRepository.findByEmail(dto.login);
        if (existingAccount) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await this.authService.hashPassword(dto.password);
        const account = AccountEntity.create({
            email: dto.login,
            password: hashedPassword,
            firstName: '',
            lastName: '',
            roles: dto.roles,
            status: dto.status,
        });
        await this.accountRepository.create(account);

        return account;
    }
}
