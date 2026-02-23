import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { RepositoriesModule } from '../../../infrastructure/database/repositories/repositories.module';
import { AuthService } from '../../../domain/services/auth.service';
import { AuthController } from './auth.controller';
import { LoginAccountUseCase } from 'src/application/use-cases/LoginAccount/LoginAccountUseCase';
import { TokenService } from 'src/domain/services/token.service';
import { LoginAccountValidator } from 'src/application/use-cases/LoginAccount/LoginAccountValidator';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenController } from '../refreshToken/RefreshToken.controller';
import { ValidTokenController } from '../validToken/ValidToken.controller';
import { RefreshAccountUseCase } from 'src/application/use-cases/RefreshAccount/RefreshAccountUseCase';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, 
    RepositoriesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Il va chercher ta clé dans le .env
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [AuthController, RefreshTokenController, ValidTokenController],
  providers: [
    LoginAccountUseCase,
    LoginAccountValidator,
    TokenService,
    AuthService,
    RefreshAccountUseCase,
  ],
})
export class AuthModule {}
