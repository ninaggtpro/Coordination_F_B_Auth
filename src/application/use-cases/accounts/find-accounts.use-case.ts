// TODO: À implémenter plus tard
/*
import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import type { IAccountRepository } from '../../../domain/repositories/account.repository.interface';

@Injectable()
export class FindAccountsUseCase {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async findOne(uid: string): Promise<Account | null> {
    return this.accountRepository.findOne(uid);
  }

  async findByLogin(login: string): Promise<Account | null> {
    return this.accountRepository.findByLogin(login);
  }
}
*/
