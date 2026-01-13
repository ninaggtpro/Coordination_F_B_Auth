import { ApiProperty } from '@nestjs/swagger';
export class CreateAccountDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password?: string;

  @ApiProperty({ enum: ['ROLE_USER', 'ROLE_ADMIN'], isArray: true, default: ['ROLE_USER'] })
  roles?: string[];

  @ApiProperty({ enum: ['open', 'closed'], default: 'open' })
  status?: string;
}