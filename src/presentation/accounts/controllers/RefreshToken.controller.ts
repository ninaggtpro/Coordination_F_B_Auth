import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateAccountRequest } from "../dto/create-account.request";
import { RefreshAccountUseCase } from "src/application/use-cases/RefreshAccount/RefreshAccountUseCase";
import { RefreshTokenResponse } from "../dto/refreshToken.reponse";

@Controller(`refresh-token/token`)
export class RefreshTokenController {
    constructor(
        private readonly refreshTokenService: RefreshAccountUseCase,
    ) { }
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: "Création d'un utilisateur" })
    @ApiBody({ type: CreateAccountRequest })
    @ApiResponse({})     
    async create(@Body() request: string): Promise<RefreshTokenResponse | Error> {
        const newTokens = await this.refreshTokenService.execute(request);
        if (!newTokens) {
           return new Error("Invalid refresh token");
        }
        return new RefreshTokenResponse(
            newTokens.accessToken,
            newTokens.accessTokenExpiresAt,
            newTokens.refreshToken,
            newTokens.refreshTokenExpiresAt
        );
    }
}