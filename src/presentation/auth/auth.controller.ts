import { Body, Controller, Post, HttpCode, Headers, Ip, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // Ajout de ApiExcludeParam
import { LoginAccountUseCase } from '../../application/use-cases/LoginAccount/LoginAccountUseCase';
import { LoginRequest } from './dto/login.request';
import { LoginResponse } from './dto/login.response';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/infrastructure/auth/guards/RolesGuard';

@ApiTags('Access token')
@Controller('token')
export class AuthController {
    constructor(private readonly loginAccountUseCase: LoginAccountUseCase) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(201)
    @ApiOperation({ 
        summary: 'Création d’un token de connexion',
        description: `Création d'un access token à partir d'un login et d'un mot de passe.
        L'access token a une validité de 60 minutes.
        Le refresh token a une validité de 120 minutes.
        Si plus de 3 échecs en 5 min, l'utilisateur ne peut pas retenter de se connecter pour les 30 prochaines minutes.
        Le blocage est basé sur l'adresse IP de l'utilisateur.`
    })
    @ApiBody({ type: LoginRequest })
    @ApiResponse({
        status: 201,
        description: 'Création avec succès des tokens',
        type: LoginResponse
    })
    @ApiResponse({
        status: 404,
        description: 'Identifiants non trouvé (paire login / mot de passe inconnue)',
    })
    async login(
        @Body() loginRequest: LoginRequest,

        @Headers('user-agent') userAgent: any,
        @Ip() ip: string

    ): Promise<LoginResponse> {

        const fromValue = loginRequest.from || userAgent || 'unknown';

        const result = await this.loginAccountUseCase.execute({
            email: loginRequest.login,
            password: loginRequest.password,
            from: fromValue,
            ip: ip,
        });

        if (!result) {
            throw new NotFoundException('Identifiants non trouvé (paire login / mot de passe inconnue)');
        }

        return new LoginResponse(result);
    }
}