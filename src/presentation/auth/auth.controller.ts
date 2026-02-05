import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginAccountUseCase } from '../../application/use-cases/LoginAccount/LoginAccountUseCase';
import { LoginRequest } from './dtos/login.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly loginAccountUseCase: LoginAccountUseCase) {}

    @Post('login')
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiResponse({ status: 200, description: 'Returns JWT access token' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginRequest: LoginRequest) {
        const loginAccountDto = {
            email: loginRequest.email,
            password: loginRequest.password,
        };
        return this.loginAccountUseCase.execute(loginAccountDto);
    }
}
