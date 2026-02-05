import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEnum, IsArray, IsEmail } from 'class-validator';

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
    enum: ['ROLE_USER', 'ROLE_ADMIN'], 
    isArray: true, 
    default: ['ROLE_USER'],
    required: false,
    example: ['ROLE_USER']
  })
  @IsOptional()
  @IsArray()
  @IsEnum(['ROLE_USER', 'ROLE_ADMIN'], { each: true })
  roles?: string[];

  @ApiProperty({ 
    enum: ['open', 'closed'], 
    default: 'open',
    required: false,
    example: 'open'
  })
  @IsOptional()
  @IsEnum(['open', 'closed'])
  status?: string;
}
