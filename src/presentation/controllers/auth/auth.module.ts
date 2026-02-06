import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { RepositoriesModule } from '../../../infrastructure/database/repositories/repositories.module';
import { AuthService } from '../../../domain/services/auth.service';
import { AuthController } from './auth.controller';
import { LoginAccountUseCase } from 'src/application/use-cases/LoginAccount/LoginAccountUseCase';
import { TokenService } from 'src/domain/services/token.service';
import { LoginAccountValidator } from 'src/application/use-cases/LoginAccount/LoginAccountValidator';
import { JwtService } from '@nestjs/jwt';
import { CreateAccountValidator } from 'src/application/use-cases/CreateAccount/CreateAccountValidator';
import { RefreshTokenController } from '../refreshToken/RefreshToken.controller';
import { ValidTokenController } from '../validToken/ValidToken.controller';
import { RefreshAccountUseCase } from 'src/application/use-cases/RefreshAccount/RefreshAccountUseCase';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  controllers: [AuthController, RefreshTokenController, ValidTokenController],
  providers: [
    LoginAccountUseCase,
    LoginAccountValidator,
    TokenService,
    AuthService,
    JwtService,
    RefreshAccountUseCase,
    // {
    //   provide: IAccountRepository,
    //   useClass: PrismaAccountRepository, 
    // },
  ],
})
export class AuthModule {}
