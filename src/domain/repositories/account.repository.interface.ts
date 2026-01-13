import { Account } from '@prisma/client';
import { CreateAccountDto } from '../../presentation/dtos/accounts/create-account.dto';

export interface IAccountRepository {
  create(data: CreateAccountDto): Promise<Account>;
}