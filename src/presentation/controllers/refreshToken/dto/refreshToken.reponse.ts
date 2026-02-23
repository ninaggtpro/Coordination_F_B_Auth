import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
  @ApiProperty({ example: 'ey...' })
  accessToken: string;

  @ApiProperty({ example: '2026-02-05T17:20:00Z' })
  accessTokenExpirationAt: Date;

  @ApiProperty({ example: 'ey...' })
  refreshToken: string;

  @ApiProperty({ example: '2026-02-05T18:20:00Z' })
  refreshTokenExpirationAt: Date;

  constructor(
    accessToken: string,
    accessTokenExpirationAt: Date,
    refreshToken: string,
    refreshTokenExpirationAt: Date,
  ) {
    this.accessToken = accessToken;
    this.accessTokenExpirationAt = accessTokenExpirationAt;
    this.refreshToken = refreshToken;
    this.refreshTokenExpirationAt = refreshTokenExpirationAt;
  }
}
