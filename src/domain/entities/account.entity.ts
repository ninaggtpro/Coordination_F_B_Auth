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
  }

  private static validateEmail(email: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    return email;
  }

  private static applyRoleLogic(roles?: AccountRole[]): AccountRole[] {
    if (!roles || roles.length === 0) {
      return [AccountRole.USER];
    }

    if (roles.includes(AccountRole.ADMIN)) {
      return [AccountRole.ADMIN, AccountRole.USER];
    }
    return [AccountRole.USER];
  }

  private static validateStatus(status: AccountStatus | undefined): AccountStatus {
    if(status === null || status === undefined) {
      return AccountStatus.OPEN;
    }
    if (!Object.values(AccountStatus).includes(status) ) {
      return AccountStatus.OPEN;
    } 
    return status;
  }

  private static validatePassword(password: string): string {
    if (!password || password.trim() === '') {
      throw new Error('Password cannot be empty');
    }
    return password;
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
    return new AccountEntity(
      randomUUID(),
      this.validateEmail(props.email),
      this.validatePassword(props.password),
      props.firstName,
      props.lastName,
      this.applyRoleLogic(props.roles),
      this.validateStatus(props.status),
      new Date(),
      new Date(),
    );
  }
}
