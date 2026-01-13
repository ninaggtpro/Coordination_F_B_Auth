import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AccountRepository } from './account.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
  ],
  exports: ['IAccountRepository'],
})
export class RepositoriesModule {}