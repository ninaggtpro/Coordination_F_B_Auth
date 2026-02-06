import { Controller, Post, Body, HttpCode, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { CreateAccountUseCase } from '../../../application/use-cases/CreateAccount/CreateAccountUseCase';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateAccountRequest } from './dto/create-account.request';
import { AccountResponse } from './dto/account.response';

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
    const account = await this.createAccountUseCase.execute({
      email: request.login,
      password: request.password,
      roles: request.roles,
      status: request.status,
    });
    if(!account) {
      throw new NotFoundException(`Erreur lors de la création du compte`);
    }
    return new AccountResponse(account);
  }

  @Get("/:id")
  @HttpCode(200)
  @ApiOperation({
    summary: "Récupération d'un compte par son ID",
    description: "Retourne les informations détaillées d'un compte utilisateur."
  })
  @ApiParam({
    name: 'id',
    description: "Identifiant unique du compte (UUID)",
    required: true,
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Compte trouvé",
    type: AccountResponse
  })
  @ApiResponse({
    status: 404,
    description: "Compte non trouvé"
  })
  async getAccountById(@Param('id') id: string): Promise<AccountResponse> {
    const response = await this.createAccountUseCase.getAccountById(id);
    if(!response) {
      throw new NotFoundException(`Compte avec l'id ${id} non trouvé`);
    }
    return new AccountResponse(response);
}

  @Get("/all")
  @HttpCode(200)
  @ApiOperation({
    summary: "Récupération de tous les comptes",
    description: "Retourne la liste de tous les comptes enregistrés."
  })
  @ApiResponse({
    status: 200,
    description: "Liste des comptes récupérée avec succès",
    type: [AccountResponse]
  })
  @ApiResponse({
    status: 404,
    description: "Aucun compte trouvé"
  })
  async getAllAccounts(): Promise<AccountResponse[]> {
    const accounts = await this.createAccountUseCase.findAll();
    if(!accounts || accounts.length === 0) {
      throw new NotFoundException(`Aucun compte trouvé`);
    }
    return accounts.map(account => new AccountResponse(account));
  }

}