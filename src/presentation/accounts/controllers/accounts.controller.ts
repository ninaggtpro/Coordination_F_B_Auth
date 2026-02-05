import { Controller, Post, Body } from '@nestjs/common';
import { CreateAccountRequest } from '../dto/create-account.request';
import { AccountResponse } from '../dto/account.response';
import { CreateAccountUseCase } from '../../../application/use-cases/CreateAccount/CreateAccountUseCase';

@Controller('account')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
  ) { }

  @Post()
  async create(@Body() request: CreateAccountRequest): Promise<AccountResponse> {
    const account = await this.createAccountUseCase.execute(request);
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

