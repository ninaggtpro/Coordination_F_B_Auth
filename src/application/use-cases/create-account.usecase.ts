import { Inject, Injectable } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import type { IAccountRepository } from '../../domain/repositories/IAccountRepositoy';
import { CreateAccountCommand } from './create-account.command'; // Assure-toi de l'import

@Injectable() // N'oublie pas le décorateur pour NestJS
export class CreateAccountUseCase {
  constructor(
    @Inject('IAccountRepository') 
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(command: CreateAccountCommand): Promise<AccountEntity> {
     const account = AccountEntity.create({
      login: command.login,
      password: command.password, // Important pour ton repo Prisma !
      roles: command.roles,
      status: command.status
    });

    // 2. On appelle la méthode 'create' (comme définie dans ton repo)
    await this.accountRepository.create(account);

    return account;
  }
}