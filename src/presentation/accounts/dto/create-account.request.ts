import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, IsArray } from 'class-validator';
import { AccountRole, AccountStatus } from '../../../domain/entities/account.entity';

export class CreateAccountRequest {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'L\'identifiant de connexion (email)' 
  })
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'password123', format: 'password' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ 
    enum: AccountRole, 
    isArray: true, 
    example: [AccountRole.USER] 
  })
  @IsArray()
  @IsEnum(AccountRole, { each: true })
  roles: AccountRole[];

  @ApiProperty({ 
    enum: AccountStatus, 
    example: AccountStatus.OPEN 
  })
  @IsEnum(AccountStatus)
  status: AccountStatus;
}