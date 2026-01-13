// TODO: À implémenter plus tard
/*
import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { IAccountRepository } from '../../../domain/repositories/account.repository.interface';
import { CreateAccountDto } from '../../../application/dto/create-account.dto';
import { UpdateAccountDto } from '../../../application/dto/update-account.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountRepositoryImpl implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAccountDto): Promise<Account> {
    return this.prisma.account.create({ data });
  }

  async findAll(): Promise<Account[]> {
    return this.prisma.account.findMany();
  }

  async findOne(uid: string): Promise<Account | null> {
    return this.prisma.account.findUnique({ where: { uid } });
  }

  async update(uid: string, data: UpdateAccountDto): Promise<Account> {
    return this.prisma.account.update({ where: { uid }, data });
  }

  async remove(uid: string): Promise<Account> {
    return this.prisma.account.delete({ where: { uid } });
  }

  async findByLogin(login: string): Promise<Account | null> {
    return this.prisma.account.findUnique({ where: { login } });
  }
}
*/
