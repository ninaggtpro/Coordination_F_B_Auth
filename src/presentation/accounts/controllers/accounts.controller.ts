import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateAccountRequest } from '../dto/create-account.request';
import { AccountResponse } from '../dto/account.response';
import { CreateAccountUseCase } from '../../../application/use-cases/CreateAccount/CreateAccountUseCase';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('account')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
  ) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Création d'un utilisateur" })
  @ApiBody({ type: CreateAccountRequest })
  @ApiResponse({
    status: 201,
    description: "Création avec succès de l'utilisateur",
    type: AccountResponse,
  })
  @ApiResponse({
    status: 401,
    description: "Il est nécéssaire d'être authentifié",
  })
  @ApiResponse({
    status: 403,
    description: "Il est nécéssaire de disposer d'un compte admin pour créer un compte",
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

