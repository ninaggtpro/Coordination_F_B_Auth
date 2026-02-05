import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { RepositoriesModule } from '../../infrastructure/database/repositories/repositories.module';
import { CreateAccountUseCase } from '../../application/use-cases/CreateAccount/CreateAccountUseCase';
import { AuthService } from '../../application/services/auth.service';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  controllers: [AccountsController],
  providers: [CreateAccountUseCase, AuthService],
})
export class AccountsModule {}
