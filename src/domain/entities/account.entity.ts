import { randomUUID } from 'crypto';

export type AccountStatus = 'open' | 'closed';
export type AccountRole = 'ROLE_ADMIN' | 'ROLE_USER';
export type AccountProvider = 'local' | 'github' | 'google';

export class AccountEntity {
  constructor(
    public readonly uid: string,
    public readonly login: string,
    private readonly _password: string | null,
    private readonly _roles: AccountRole[],
    private readonly _status: AccountStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly provider?: AccountProvider,
  ) {
    AccountEntity.validatePassword(_password, provider);
  }

  private static validatePassword(password: string | null, provider?: AccountProvider): void {
    const authProvider = provider ?? 'local';
    if (authProvider === 'local') {
      if (!password || password.trim() === '') {
        throw new Error('Password is required for local authentication');
      }
    }
  }

  private static applyRoleLogic(roles?: AccountRole[]): AccountRole[] {
    if(!roles || roles.length === 0) {
      return ['ROLE_USER'];
    }
    
    if(roles.includes('ROLE_ADMIN')) {
      return ['ROLE_ADMIN', 'ROLE_USER'];
    }
    return [...new Set(roles)];
  }

  private static applyStatusLogic(status?: AccountStatus): AccountStatus {
    return status ?? 'open';
  }

  private static applyProviderLogic(provider?: AccountProvider): AccountProvider {
    return provider ?? 'local';
  }

  get roles(): AccountRole[] {
    return this._roles;
  }

  get status(): AccountStatus {
    return this._status;
  }

  get password(): string | null {
    return this._password;
  }

  changeRoles(newRoles: AccountRole[]): AccountEntity {
    const finalRoles = AccountEntity.applyRoleLogic(newRoles);

    return new AccountEntity(
      this.uid,
      this.login,
      this._password,
      finalRoles,
      this._status,
      this.createdAt,
      new Date(),
      this.provider,
    );
  }

  
  static fromPrisma(data: any): AccountEntity {
    return new AccountEntity(
      data.uid,
      data.login,
      data.password,
      data.roles,
      data.status,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.provider,
    );
  }

  static create(props: {
    login: string;
    password?: string | null;
    roles?: AccountRole[];
    status?: AccountStatus;
    provider?: AccountProvider;
  }): AccountEntity {
    const finalRoles = AccountEntity.applyRoleLogic(props.roles);
    const finalStatus = AccountEntity.applyStatusLogic(props.status);
    const finalProvider = AccountEntity.applyProviderLogic(props.provider);
    
    return new AccountEntity(
      randomUUID(),
      props.login,
      props.password ?? null,
      finalRoles,
      finalStatus,
      new Date(),
      new Date(),
      finalProvider,
    );
  }
}

