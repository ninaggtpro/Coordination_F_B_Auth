import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ 
    example: 'john.doe@example.com',
    description: 'Identifiant de connexion (email)' 
  })
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ 
    example: 'password123',
    description: 'Mot de passe du compte' 
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ 
    example: 'web', 
    description: 'Provenance de la requête (ex: web, mobile)',
    required: false
  })
  @IsString()
  @IsOptional()
  from?: string;
}