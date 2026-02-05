import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity, AccountRole, AccountStatus } from '../../../domain/entities/account.entity';

export class AccountResponse {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Identifiant unique du compte (UUID)'
  })
  uid: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Identifiant de connexion (mappé depuis l\'email interne)'
  })
  login: string;

  @ApiProperty({
    type: [String],
    enum: AccountRole,
    isArray: true,
    example: [AccountRole.USER],
    description: 'Liste des rôles attribués au compte'
  })
  roles: AccountRole[];

  @ApiProperty({
    type: String,
    enum: AccountStatus,
    example: AccountStatus.OPEN,
    description: 'Statut actuel du compte (open ou closed)'
  })
  status: AccountStatus;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2024-05-02T14:09:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2024-05-02T14:09:00Z'
  })
  updatedAt: Date;

  constructor(account: AccountEntity) {
    if (account) {
      this.uid = account.uid;
      this.login = account.email;
      this.roles = account.roles;
      this.status = account.status;
      this.createdAt = account.createdAt;
      this.updatedAt = account.updatedAt;
    }
  }
}