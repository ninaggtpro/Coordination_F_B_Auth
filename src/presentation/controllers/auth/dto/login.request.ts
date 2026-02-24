import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ 
    example: 'john.doe@example.com',
    description: 'Identifiant de connexion (email)' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    example: 'password123',
    description: 'Mot de passe du compte' 
  })
  @IsString()
  @IsNotEmpty()
  password: string;

}