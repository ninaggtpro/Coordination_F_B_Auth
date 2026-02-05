import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ example: 'ey...' })
  accessToken: string;

  @ApiProperty({ example: '2026-02-05T17:20:00Z' })
  accessTokenExpiresAt: string;

  @ApiProperty({ example: 'ey...' })
  refreshToken: string;

  @ApiProperty({ example: '2026-02-05T18:20:00Z' })
  refreshTokenExpiresAt: string;

  constructor(partial: Partial<LoginResponse>) {
    Object.assign(this, partial);
  }
}
