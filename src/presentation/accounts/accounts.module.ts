import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { RepositoriesModule } from '../../infrastructure/database/repositories/repositories.module';
import { CreateAccountUseCase } from '../../application/use-cases/CreateAccount/CreateAccountUseCase';
import { AuthService } from '../../domain/services/auth.service';
import { IAccountRepository } from 'src/domain/repositories/IAccountRepositoy';
import { PrismaAccountRepository } from 'src/infrastructure/database/repositories/account.repository';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  controllers: [AccountsController],
  providers: [
    CreateAccountUseCase,
    AuthService,
    {
      provide: IAccountRepository,
      useClass: PrismaAccountRepository, 
    },
  ],
})
export class AccountsModule {}
