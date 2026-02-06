import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../infrastructure/database/repositories/repositories.module';
import { CreateAccountUseCase } from '../../../application/use-cases/CreateAccount/CreateAccountUseCase';
import { AuthService } from '../../../domain/services/auth.service';
import { IAccountRepository } from 'src/domain/repositories/IAccountRepositoy';
import { PrismaAccountRepository } from 'src/infrastructure/database/repositories/account.repository';
import { AccountsController } from './Accounts.controller';
import { CreateAccountValidator } from 'src/application/use-cases/CreateAccount/CreateAccountValidator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  controllers: [AccountsController],
  providers: [
    CreateAccountUseCase,
    CreateAccountValidator,
    AuthService,
    {
      provide: IAccountRepository,
      useClass: PrismaAccountRepository, 
    },
  ],
})
export class AccountsModule {}
