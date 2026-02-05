import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { RepositoriesModule } from '../../infrastructure/database/repositories/repositories.module';
import { CreateAccountUseCase } from '../../application/use-cases/CreateAccount/CreateAccountUseCase';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  controllers: [AccountsController],
  providers: [CreateAccountUseCase],
})
export class AccountsModule {}
