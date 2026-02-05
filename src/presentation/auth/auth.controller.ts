import { Body, Controller, Post, HttpCode, Headers, Ip } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // Ajout de ApiExcludeParam
import { LoginAccountUseCase } from '../../application/use-cases/LoginAccount/LoginAccountUseCase';
import { LoginRequest } from './dto/login.request';
import { LoginResponse } from './dto/login.response';

@ApiTags('auth')
@Controller('token')
export class AuthController {
    constructor(private readonly loginAccountUseCase: LoginAccountUseCase) {}

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Création d’un token de connexion' })
    @ApiBody({ type: LoginRequest })
    @ApiResponse({ 
        status: 201, 
        description: 'Création avec succès des tokens', 
        type: LoginResponse 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Identifiants non trouvé (paire login / mot de passe inconnue)' 
    })
    async login(
        @Body() loginRequest: LoginRequest,

        @Headers('user-agent') userAgent: any,      
        @Ip() ip: string

    ): Promise<LoginResponse> {

        const fromValue = userAgent || 'unknown';

        const result = await this.loginAccountUseCase.execute({
            email: loginRequest.login,
            password: loginRequest.password,
            from: fromValue,
            ip: ip,
        });

        return new LoginResponse(result);
    }
}