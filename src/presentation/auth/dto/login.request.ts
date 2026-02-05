import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
    description: 'Provenance de la requête (ex: web, mobile, ios)' 
  })
  @IsString()
  @IsNotEmpty()
  from: string;
}