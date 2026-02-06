import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../../domain/entities/account.entity';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';
import { PrismaService } from 'src/infrastructure/services/Prisma.service';

@Injectable()
export class PrismaAccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}


  async findByUid(uid: string): Promise<AccountEntity | null> {
    const account = await this.prisma.account.findUnique({
      where: { uid },
    });

    return account ? AccountEntity.fromPrisma(account) : null;
  }

  async create(account: AccountEntity): Promise<AccountEntity> {
    const created = await this.prisma.account.create({
      data: {
        uid: account.uid,
        email: account.email,
        password: account.password,
        firstName: account.firstName,
        lastName: account.lastName,
        roles: account.roles,
        status: account.status,
      },
    });

    return AccountEntity.fromPrisma(created);
  }

  async findAll(): Promise<AccountEntity[]> {
    const accounts = await this.prisma.account.findMany();
    return accounts.map((acc) => AccountEntity.fromPrisma(acc));
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.prisma.account.findUnique({
      where: { email },
    });

    return account ? AccountEntity.fromPrisma(account) : null;
  }
}
