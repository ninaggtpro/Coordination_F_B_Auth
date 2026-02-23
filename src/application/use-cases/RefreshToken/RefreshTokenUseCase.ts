import { AccountEntity, AccountStatus } from "src/domain/entities/account.entity";
import { IAccountRepository } from "src/domain/repositories/IAccountRepositoy";
import { TokenService } from "src/domain/services/token.service";
import { ConflictException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';


export class RefreshTokenUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService
    ) { }
    async execute(uid: string): Promise<{
        accessToken: string,
        accessTokenExpiresAt: Date,
        refreshToken: string
        refreshTokenExpiresAt: Date
    }> {

        const existingAccount: AccountEntity | null = await this.accountRepository.findByUid(uid);

        if (!existingAccount || existingAccount.status === AccountStatus.CLOSED) {
            throw new ConflictException('Email doesn\'t exist or Account is closed');
        }
    
        const accessToken = this.tokenService.generateAccessToken(existingAccount!);
        const accessTokenExpiresAt = new Date(Date.now() + this.jwtService.decode(accessToken).exp * 1000);
        const refreshToken = this.tokenService.generateRefreshToken(existingAccount!);
        const refreshTokenExpiresAt = new Date(Date.now() + this.jwtService.decode(refreshToken).exp * 1000);

        return {
            accessToken,
            accessTokenExpiresAt,
            refreshToken,
            refreshTokenExpiresAt,
        };

    }
}
