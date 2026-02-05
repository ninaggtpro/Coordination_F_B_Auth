import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { RepositoriesModule } from '../../infrastructure/database/repositories/repositories.module';
import { CreateAccountUseCase } from '../../application/use-cases/CreateAccount/CreateAccountUseCase';
import { AuthService } from '../../domain/services/auth.service';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  controllers: [AccountsController],
  providers: [AccountsService, CreateAccountUseCase, AuthService],
})
export class AccountsModule {}
