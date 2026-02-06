import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';
import { AuthService } from '../../../domain/services/auth.service';
import { TokenService } from '../../../domain/services/token.service';
import { LoginAccountDto } from './LoginAccountDTO';
import { LoginAccountValidator } from './LoginAccountValidator';
import { AccountStatus } from 'src/domain/entities/account.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginAccountUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        private readonly validator: LoginAccountValidator,
        private readonly jwtService: JwtService
    ) { }

    async execute(dto: LoginAccountDto): Promise<{
        accessToken: string;
        accessTokenExpiresAt: Date;
        refreshToken: string;
        refreshTokenExpiresAt: Date;
    }> {
        const account = await this.accountRepository.findByEmail(dto.email);

        if (!account || account.status === AccountStatus.CLOSED) {
            throw new ConflictException('Email doesn\'t exist or Account is closed');
        }

        const isPasswordValid = await this.authService.validatePassword(
            dto.password,
            account!.password
        );

        if (!isPasswordValid) {
            throw new NotFoundException('Identifiants non trouvé (paire login / mot de passe inconnue)');
        }

        const accessToken = this.tokenService.generateAccessToken(account!);
        const accessTokenExpiresAt = new Date(Date.now() + this.jwtService.decode(accessToken).exp * 1000);
        const refreshToken = this.tokenService.generateRefreshToken(account!);
        const refreshTokenExpiresAt = new Date(Date.now() + this.jwtService.decode(refreshToken).exp * 1000);

        return {
            accessToken,
            accessTokenExpiresAt,
            refreshToken,
            refreshTokenExpiresAt,
        };
    }
}
