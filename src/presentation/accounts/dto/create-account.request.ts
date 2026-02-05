import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEnum, IsArray, IsEmail } from 'class-validator';
import { AccountRole, AccountStatus } from '../../../domain/entities/account.entity';

export class CreateAccountRequest {
  @ApiProperty({ description: 'User email (used as login)', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123', minLength: 6, maxLength: 42 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(42)
  password: string;

  @ApiProperty({ description: 'First name', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ 
    enum: AccountRole, 
    isArray: true, 
    default: [AccountRole.ROLE_USER],
    required: false,
    example: [AccountRole.ROLE_USER]
  })
  @IsOptional()
  @IsArray()
  @IsEnum(AccountRole, { each: true })
  roles?: AccountRole[];

  @ApiProperty({ 
    enum: AccountStatus, 
    default: AccountStatus.OPEN,
    required: false,
    example: AccountStatus.OPEN
  })
  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus;
}
