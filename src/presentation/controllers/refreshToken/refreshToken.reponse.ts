export class RefreshTokenResponse {
  accessToken: string;
  accessTokenExpirationAt: Date;
  refreshToken: string;
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
