import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaAccountRepository } from './account.repository';
import { IAccountRepository } from 'src/domain/repositories/IAccountRepositoy';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IAccountRepository,
      useClass: PrismaAccountRepository,
    },
  ],
  exports: [IAccountRepository],
})
export class RepositoriesModule {}