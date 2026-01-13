// TODO: À implémenter plus tard
/*
import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import type { IAccountRepository } from '../../../domain/repositories/account.repository.interface';
import { UpdateAccountDto } from '../../dto/update-account.dto';

@Injectable()
export class UpdateAccountUseCase {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(uid: string, data: UpdateAccountDto): Promise<Account> {
    // Vérification que le compte existe
    const account = await this.accountRepository.findOne(uid);
    if (!account) {
      throw new Error(`Account with uid ${uid} not found`);
    }
    
    return this.accountRepository.update(uid, data);
  }
}
*/
