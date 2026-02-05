import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAccountRequest } from '../dto/create-account.request';
import { UpdateAccountRequest } from '../dto/update-account.request';
import { AccountResponse } from '../dto/account.response';
import { CreateAccountUseCase } from '../../../application/use-cases/CreateAccount/CreateAccountUseCase';
import { CreateAccountDto } from '../../../application/use-cases/CreateAccount/CreateAccountDTO';
import { AccountRole, AccountStatus } from '../../../domain/entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
  ) {}

  @Post()
  async create(@Body() createAccountRequest: CreateAccountRequest): Promise<AccountResponse> {
    const createAccountDto: CreateAccountDto = {
      email: createAccountRequest.email,
      password: createAccountRequest.password,
      firstName: createAccountRequest.firstName,
      lastName: createAccountRequest.lastName,
      roles: createAccountRequest.roles,
      status: createAccountRequest.status,
    };
    const account = await this.createAccountUseCase.execute(createAccountDto);
    return new AccountResponse(account);
  }

  // TODO: Créer FindAllAccountsUseCase
  // @Get()
  // findAll() {
  //   return this.findAllAccountsUseCase.execute();
  // }

  // TODO: Créer FindOneAccountUseCase
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.findOneAccountUseCase.execute(id);
  // }

  // TODO: Créer UpdateAccountUseCase
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountRequest: UpdateAccountRequest) {
  //   return this.updateAccountUseCase.execute(id, updateAccountRequest);
  // }

  // TODO: Créer DeleteAccountUseCase
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.deleteAccountUseCase.execute(id);
  // }
}

