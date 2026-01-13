// TODO: À implémenter plus tard
/*
import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import type { IAccountRepository } from '../../../domain/repositories/account.repository.interface';

@Injectable()
export class DeleteAccountUseCase {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(uid: string): Promise<Account> {
    // Vérification que le compte existe
    const account = await this.accountRepository.findOne(uid);
    if (!account) {
      throw new Error(`Account with uid ${uid} not found`);
    }
    
    return this.accountRepository.remove(uid);
  }
}
*/
