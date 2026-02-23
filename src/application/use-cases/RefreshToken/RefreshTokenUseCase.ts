import { AccountEntity, AccountStatus } from "src/domain/entities/account.entity";
import { IAccountRepository } from "src/domain/repositories/IAccountRepositoy";
import { TokenService } from "src/domain/services/token.service";
import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService
    ) { }
    async execute(refreshTokenInput: string): Promise<{
        accessToken: string,
        accessTokenExpiresAt: Date,
        refreshToken: string
        refreshTokenExpiresAt: Date
    }> {
        const decoded = this.tokenService.verifyToken(refreshTokenInput, true);

        const account = await this.accountRepository.findByUid(decoded.sub);

        if (!account || account.status === AccountStatus.CLOSED) {
            throw new ConflictException('Account doesn\'t exist or is closed');
        }
    
        const accessToken = this.tokenService.generateAccessToken(account);
        const refreshToken = this.tokenService.generateRefreshToken(account);

        const decodedAccess = this.jwtService.decode(accessToken) as any;
        const decodedRefresh = this.jwtService.decode(refreshToken) as any;

        const accessTokenExpiresAt = new Date(decodedAccess.exp * 1000);
        const refreshTokenExpiresAt = new Date(decodedRefresh.exp * 1000);

        return {
            accessToken,
            accessTokenExpiresAt,
            refreshToken,
            refreshTokenExpiresAt,
        };
    }
}