import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../dtos/accounts/create-account.dto';
import { UpdateAccountDto } from '../dtos/accounts/update-account.dto';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({ data: createAccountDto });
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  findOne(uid: string) {
    return this.prisma.account.findUnique({ where: { uid } });
  }

  update(uid: string, updateAccountDto: UpdateAccountDto) {
    return this.prisma.account.update({ where: { uid }, data: updateAccountDto });
  }

  remove(uid: string) {
    return this.prisma.account.delete({ where: { uid } });
  }
}
