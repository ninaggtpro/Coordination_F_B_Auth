import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountRequest } from './dtos/create-account.request';
import { UpdateAccountRequest } from './dtos/update-account.request';
import { CreateAccountUseCase } from '../../application/use-cases/CreateAccount/CreateAccountUseCase';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    @Inject('IAccountRepository')
    private readonly createAccountUseCase: CreateAccountUseCase,
  ) {}

  @Post()
  async create(@Body() createAccountRequest: CreateAccountRequest) {
    return this.createAccountUseCase.execute(createAccountRequest as any);
  }

  // TODO: Créer FindAllAccountsUseCase
  // @Get()
  // findAll() {
  //   return this.accountsService.findAll();
  // }

  // TODO: Créer FindOneAccountUseCase
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountsService.findOne(id);
  // }

  // TODO: Créer UpdateAccountUseCase
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountsService.update(id, updateAccountDto);
  // }

  // TODO: Créer DeleteAccountUseCase
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountsService.remove(id);
  // }
}

