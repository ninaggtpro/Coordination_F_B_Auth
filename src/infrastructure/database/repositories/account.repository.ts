import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccountEntity } from '../../../domain/entities/account.entity';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(private prisma: PrismaService) {}

  async create(account: AccountEntity): Promise<AccountEntity> {
    const created = await this.prisma.account.create({ 
      data: { 
        uid: account.uid,
        login: account.login,
        roles: account.roles,
        password: account.password,
        status: account.status,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      } 
    });

    return AccountEntity.fromPrisma(created);
  }

  async findAll(): Promise<AccountEntity[]> {
    const accounts = await this.prisma.account.findMany();
    return accounts.map(acc => AccountEntity.fromPrisma(acc));
  }
}