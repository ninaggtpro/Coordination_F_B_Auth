import { randomUUID } from 'crypto';
import { Account } from '@prisma/client';

export enum AccountStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum AccountRole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}

export class AccountEntity {
  constructor(
    public readonly uid: string,
    public readonly email: string,
    private readonly _password: string,
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _roles: AccountRole[],
    private readonly _status: AccountStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.validateStatus(_status);
    this.validateRoles(_roles);
    this.validatePassword(_password);
  }

  private validateStatus(status: AccountStatus): void {
    if (!Object.values(AccountStatus).includes(status)) {
      throw new Error(`Invalid status value: ${status}`);
    }
  }

  private validateRoles(roles: AccountRole[]): void {
    if (!roles || roles.length === 0) {
      throw new Error('At least one role is required');
    }

    const validRoles = Object.values(AccountRole);
    roles.forEach((role) => {
      if (!validRoles.includes(role)) {
        throw new Error(`Invalid role value: ${role}`);
      }
    });
  }

  private validatePassword(password: string): void {
    if (!password || password.trim() === '') {
      throw new Error('Password cannot be empty');
    }
  }

  private static applyRoleLogic(roles?: AccountRole[]): AccountRole[] {
    if (!roles || roles.length === 0) {
      return [AccountRole.USER];
    }

    if (roles.includes(AccountRole.ADMIN)) {
      return [AccountRole.ADMIN, AccountRole.USER];
    }
    return [...new Set(roles)];
  }

  private static applyStatusLogic(status?: AccountStatus): AccountStatus {
    return status ?? AccountStatus.OPEN;
  }

  get roles(): AccountRole[] {
    return this._roles;
  }

  get status(): AccountStatus {
    return this._status;
  }

  get password(): string {
    return this._password;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  changeRoles(newRoles: AccountRole[]): AccountEntity {
    this.validateRoles(newRoles);
    const finalRoles = AccountEntity.applyRoleLogic(newRoles);

    return new AccountEntity(
      this.uid,
      this.email,
      this._password,
      this._firstName,
      this._lastName,
      finalRoles,
      this._status,
      this.createdAt,
      new Date(),
    );
  }

  static fromPrisma(data: Account): AccountEntity {
    return new AccountEntity(
      data.uid,
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      data.roles as AccountRole[],
      data.status as AccountStatus,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }

  static create(props: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roles?: AccountRole[];
    status?: AccountStatus;
  }): AccountEntity {
    const finalRoles = AccountEntity.applyRoleLogic(props.roles);
    const finalStatus = AccountEntity.applyStatusLogic(props.status);

    return new AccountEntity(
      randomUUID(),
      props.email,
      props.password,
      props.firstName,
      props.lastName,
      finalRoles,
      finalStatus,
      new Date(),
      new Date(),
    );
  }
}
