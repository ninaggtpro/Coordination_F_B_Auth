import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, IsArray, IsOptional } from 'class-validator';
import { AccountRole, AccountStatus } from 'src/domain/entities/account.entity';

export class CreateAccountRequest {
  @ApiProperty({ 
    example: 'string',
    description: 'Identifiant de connexion (email)' 
  })
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ 
    example: 'string', 
    format: 'password',
    description: 'Mot de passe du compte'
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ 
    type: [String],
    enum: AccountRole, 
    isArray: true, 
    example: ['string'],
    description: 'Liste des rôles (ROLE_ADMIN ou ROLE_USER)'
  })
  @IsArray()
  @IsEnum(AccountRole, { each: true })
  roles: AccountRole[];

  @ApiProperty({ 
    enum: AccountStatus, 
    example: 'string',
    required: false,
    description: 'Statut : open ou closed'
  })
  @IsEnum(AccountStatus)
  @IsOptional()
  status: AccountStatus;
}