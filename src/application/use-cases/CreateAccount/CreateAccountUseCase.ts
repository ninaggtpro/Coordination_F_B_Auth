import { Injectable, ConflictException } from '@nestjs/common';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';
import { AccountEntity } from '../../../domain/entities/account.entity';
import { AuthService } from '../../../domain/services/auth.service';
import { CreateAccountDto } from './CreateAccountDTO';
import { CreateAccountValidator } from './CreateAccountValidator';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly authService: AuthService,
    private readonly validator: CreateAccountValidator,
  ) {}

  async execute(dto: CreateAccountDto): Promise<AccountEntity> {

    this.validator.validateisEmail(dto.email);
    
    const existingAccount = await this.accountRepository.findByEmail(dto.email);
    if (existingAccount) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.authService.hashPassword(dto.password);
    const account = AccountEntity.create({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName ?? '',
      lastName: dto.lastName ?? '',
      roles: dto.roles,
      status: dto.status,
    });
    await this.accountRepository.create(account);

    return account;
  }

  async getAccountById(id: string): Promise<AccountEntity | null> {
    return await this.accountRepository.findByUid(id);
  }
  async findAll(): Promise<AccountEntity[]> {
    return await this.accountRepository.findAll();
  }
}
