import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateAccountRequest } from '../dto/create-account.request';
import { AccountResponse } from '../dto/account.response';
import { CreateAccountUseCase } from '../../../application/use-cases/CreateAccount/CreateAccountUseCase';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('account')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
  ) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ 
    summary: "Création d'un compte utilisateur",
    description: `Le statut peut être :
    * "open" pour un compte ouvert
    * "closed" pour un compte fermé
    
    Par défaut, si aucun statut n'est précisé, le statut de l'utilisateur est "open".
    
    Les rôles peuvent être les suivants :
    * "ROLE_ADMIN" pour un administrateur
    * "ROLE_USER" pour un simple utilisateur
    
    Un "ROLE_ADMIN" dispose aussi de "ROLE_USER" par héritage.
    
    Renvoie un compte utilisateur`
  })
  @ApiBody({ 
    type: CreateAccountRequest,
    description: "Paramètres de création du compte" 
  })
  @ApiResponse({
    status: 201,
    description: "Création avec succès de l'utilisateur",
    type: AccountResponse,
  })
  @ApiResponse({
    status: 401,
    description: "Il est nécessaire d'être authentifié",
  })
  @ApiResponse({
    status: 403,
    description: "Il est nécessaire de disposer d'un compte admin pour créer un compte",
  })
  @ApiResponse({
    status: 422,
    description: "Paramètre de connexion invalide: admin token manquant et / ou incorrect",
  })
  async create(@Body() request: CreateAccountRequest): Promise<AccountResponse> {
    const account = await this.createAccountUseCase.execute(request);
    return new AccountResponse(account);
  }
}

