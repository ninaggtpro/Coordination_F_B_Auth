import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsOptional, 
  IsEnum, 
  MinLength, 
  MaxLength, 
  IsArray, 
  ValidateIf,
  IsNotEmpty 
} from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ 
    description: 'User login/username',
    example: 'john.doe'
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ 
    required: false, 
    description: 'Password (required for local registration)',
    example: 'securePassword123',
    minLength: 6,
    maxLength: 42
  })
  @ValidateIf((o) => o.provider === 'local' || !o.provider)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(42)
  password?: string;

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

  @ApiProperty({ 
    enum: ['local', 'github', 'google'], 
    default: 'local',
    required: false,
    description: 'Authentication provider',
    example: 'local'
  })
  @IsOptional()
  @IsEnum(['local', 'github', 'google'])
  provider?: string;
}