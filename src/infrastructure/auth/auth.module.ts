import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../database/prisma/prisma.module';
import { RepositoriesModule } from '../database/repositories/repositories.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginAccountUseCase } from '../../application/use-cases/LoginAccount/LoginAccountUseCase';
import { LoginAccountValidator } from '../../application/use-cases/LoginAccount/LoginAccountValidator';
import { AuthController } from '../../presentation/auth/auth.controller';
import { AuthService } from '../../domain/services/auth.service';
import { TokenService } from '../../domain/services/token.service';

@Module({
  imports: [
    PrismaModule,
    RepositoriesModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRATION') || '7d') as any,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    LoginAccountValidator,
    JwtStrategy,
    LoginAccountUseCase,
  ],
  exports: [AuthService, TokenService, JwtStrategy, LoginAccountUseCase],
})
export class AuthModule {}
