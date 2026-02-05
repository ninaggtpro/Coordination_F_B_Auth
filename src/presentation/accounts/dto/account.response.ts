import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity, AccountRole, AccountStatus } from '../../../domain/entities/account.entity';

export class AccountResponse {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  uid: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: ['ROLE_USER'] })
  roles: AccountRole[];

  @ApiProperty({ example: 'open' })
  status: AccountStatus;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  updatedAt: Date;

  constructor(account: AccountEntity) {
    this.uid = account.uid;
    this.email = account.email;
    this.firstName = account.firstName;
    this.lastName = account.lastName;
    this.roles = account.roles;
    this.status = account.status;
    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
  }
}
