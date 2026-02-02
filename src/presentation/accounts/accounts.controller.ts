// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { AccountsService } from './accounts.service';
// import { CreateAccountDto } from '../dtos/create-account.dto';
// import { UpdateAccountDto } from '../dtos/update-account.dto';
// import { CreateAccountUseCase } from '../../application/use-cases/create-account.usecase';
// import { CreateAccountCommand } from '../../application/use-cases/create-account.command';

// @Controller('accounts')
// export class AccountsController {
//   constructor(
//     private readonly accountsService: AccountsService,
//     private readonly createAccountUseCase: CreateAccountUseCase,
//   ) {}

//   @Post()
//   async create(@Body() createAccountDto: CreateAccountDto) {
//     const command = new CreateAccountCommand(
//       createAccountDto.login,
//       createAccountDto.roles || ['ROLE_USER'],
//       createAccountDto.password,
//       createAccountDto.status,
//     );
//     return this.createAccountUseCase.execute(command);
//   }

//   // TODO: Créer FindAllAccountsUseCase
//   // @Get()
//   // findAll() {
//   //   return this.accountsService.findAll();
//   // }

//   // TODO: Créer FindOneAccountUseCase
//   // @Get(':id')
//   // findOne(@Param('id') id: string) {
//   //   return this.accountsService.findOne(id);
//   // }

//   // TODO: Créer UpdateAccountUseCase
//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
//   //   return this.accountsService.update(id, updateAccountDto);
//   // }

//   // TODO: Créer DeleteAccountUseCase
//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.accountsService.remove(id);
//   // }
// }
