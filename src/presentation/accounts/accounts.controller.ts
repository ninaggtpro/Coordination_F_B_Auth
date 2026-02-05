import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { CreateAccountUseCase } from '../../application/use-cases/CreateAccount/CreateAccountUseCase';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({ 
    status: 201, 
    description: 'Account created successfully' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request - Validation failed' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Login already exists' 
  })
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.createAccountUseCase.execute(createAccountDto);
  }

  // TODO: Créer FindAllAccountsUseCase
  // @Get()
  // findAll() { }

  // TODO: Créer FindOneAccountUseCase
  // @Get(':id')
  // findOne(@Param('id') id: string) { }

  // TODO: Créer UpdateAccountUseCase
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) { }

  // TODO: Créer DeleteAccountUseCase
  // @Delete(':id')
  // remove(@Param('id') id: string) { }
}
