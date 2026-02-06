import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ example: 'ey...' })
  accessToken: string;

  @ApiProperty({ example: '2026-02-05T17:20:00Z' })
  accessTokenExpiresAt: Date;

  @ApiProperty({ example: 'ey...' })
  refreshToken: string;

  @ApiProperty({ example: '2026-02-05T18:20:00Z' })
  refreshTokenExpiresAt: Date;

  constructor(tokens :LoginResponse) {
    this.accessToken = tokens.accessToken;
    this.accessTokenExpiresAt = tokens.accessTokenExpiresAt;
    this.refreshToken = tokens.refreshToken;
    this.refreshTokenExpiresAt = tokens.refreshTokenExpiresAt;
  }
}
