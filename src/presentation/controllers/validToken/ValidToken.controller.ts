import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Public } from '../../guards/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenService } from '../../../domain/services/token.service';
import { ValidTokenRequest } from './dto/valid-token.request';
import { ValidTokenResponse } from './dto/valid-token.response';

@ApiTags('Valid Token')
@Controller('valid-token')
export class ValidTokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Public()
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: "Vérification de la validité d'un token",
    description:
      'Vérifie si le token fourni est valide et non expiré. Retourne true si valide, false sinon.',
  })
  @ApiBody({ type: ValidTokenRequest })
  @ApiResponse({
    status: 200,
    description: 'Résultat de la vérification',
    type: ValidTokenResponse,
  })
  checkToken(@Body() request: ValidTokenRequest): ValidTokenResponse {
    try {
      this.tokenService.verifyToken(request.token);
      return new ValidTokenResponse(true);
    } catch (error) {
      return new ValidTokenResponse(false);
    }
  }
}
