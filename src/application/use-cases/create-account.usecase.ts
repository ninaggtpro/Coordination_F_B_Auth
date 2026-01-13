// TODO: À implémenter plus tard
import { Inject, Injectable } from '@nestjs/common';
// import { Account } from '@prisma/client';
import type { IAccountRepository } from '../../../domain/repositories/account.repository.interface';
import { CreateAccountCommand } from './create-account.command';
import { AccountEntity } from 'src/domain/entities/account.entity';

export class CreateAccountUseCase {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(command: CreateAccountCommand): Promise<AccountEntity> {
    return this.accountRepository.create(command);
  }
}

