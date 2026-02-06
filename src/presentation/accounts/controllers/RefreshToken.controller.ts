import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateAccountRequest } from "../dto/create-account.request";
import { RefreshAccountUseCase } from "src/application/use-cases/RefreshAccount/RefreshAccountUseCase";
import { RefreshTokenResponse } from "../dto/refreshToken.reponse";
import { request } from "https";

@ApiTags('refresh-token')
@Controller('refresh-token')
export class RefreshTokenController {
    constructor(
        private readonly refreshTokenService: RefreshAccountUseCase,
    ) { }

    @Post(':refreshToken/token')
    @HttpCode(201)
    @ApiOperation({ 
        summary: "Création d'un access token à partir d'un refresh token.",
        description: "Permet la génération d'un nouvel access token sans avoir à s'authentifier de nouveau..." 
    })
    @ApiParam({ 
        name: 'refreshToken', 
        description: 'Refresh token à consommer',
        required: true 
    })
    @ApiResponse({
        status: 201,
        description: "Création avec succès des nouveaux tokens",
        type: RefreshTokenResponse,
    })
    @ApiResponse({
        status: 404,
        description: "Token invalide ou inexistant",
    })
  
    async create(@Param('refreshToken') refreshToken: string): Promise<RefreshTokenResponse> {
        const newTokens = await this.refreshTokenService.execute(refreshToken);

        if (!newTokens) {
            throw new Error("Invalid refresh token"); 
        }

        return new RefreshTokenResponse(
            newTokens.accessToken,
            newTokens.accessTokenExpiresAt,
            newTokens.refreshToken,
            newTokens.refreshTokenExpiresAt
        );
    }
}