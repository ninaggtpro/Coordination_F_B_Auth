import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { UpdateAccountDto } from '../dtos/update-account.dto';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: Remplacer par un Use Case
  // create(createAccountDto: CreateAccountDto) {
  //   return this.prisma.account.create({ data: createAccountDto });
  // }

  // TODO: Créer FindAllAccountsUseCase
  // findAll() {
  //   return this.prisma.account.findMany();
  // }

  // TODO: Créer FindOneAccountUseCase
  // findOne(uid: string) {
  //   return this.prisma.account.findUnique({ where: { uid } });
  // }

  // TODO: Créer UpdateAccountUseCase
  // update(uid: string, updateAccountDto: UpdateAccountDto) {
  //   return this.prisma.account.update({ where: { uid }, data: updateAccountDto });
  // }

  // TODO: Créer DeleteAccountUseCase
  // remove(uid: string) {
  //   return this.prisma.account.delete({ where: { uid } });
  // }
}
