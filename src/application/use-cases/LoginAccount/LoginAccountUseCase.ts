import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAccountRepository } from '../../../domain/repositories/IAccountRepositoy';
import { AuthService } from '../../../domain/services/auth.service';
import { TokenService } from '../../../domain/services/token.service';
import { LoginAccountDto } from './LoginAccountDTO';
import { LoginAccountValidator } from './LoginAccountValidator';

@Injectable()
export class LoginAccountUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        private readonly validator: LoginAccountValidator,
    ) {}

    async execute(dto: LoginAccountDto): Promise<{ accessToken: string }> {
        const account = await this.accountRepository.findByEmail(dto.email);
        
        this.validator.validateAccountExists(account);
        this.validator.validateAccountStatus(account!);

        const isPasswordValid = await this.authService.validatePassword(
            dto.password,
            account!.password
        );
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.tokenService.generateAccessToken(account!);

        return { accessToken };
    }
}
