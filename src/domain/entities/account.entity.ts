export type AccountStatus = 'open' | 'closed';
export type AccountRole = 'ROLE_ADMIN' | 'ROLE_USER';

export class AccountEntity {
  constructor(
    public readonly uid: string,
    public readonly login: string,
    private readonly _password: string | null,
    private readonly _roles: AccountRole[],
    private readonly _status: AccountStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    AccountEntity.validateStatus(_status);
    AccountEntity.validateRoles(_roles);
  }

  private static validateStatus(status: string): void {
    if(status !== 'open' && status !== 'closed') {
      throw new Error(`Invalid status value: ${status}`);
    }
  }

  private static validateRoles(roles: AccountRole[]): void {
    roles.forEach(role => {
      if(role !== 'ROLE_ADMIN' && role !== 'ROLE_USER') {
        throw new Error(`Invalid role value: ${role}`);
      }
    });
  }

  private static applyRoleLogic(roles: AccountRole[]): AccountRole[] {
    if(!roles || roles.length === 0) {
      return ['ROLE_USER'];
    }
    
    if(roles.includes('ROLE_ADMIN')) {
      return ['ROLE_ADMIN', 'ROLE_USER'];
    }
    return [...new Set(roles)];
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
    AccountEntity.validateRoles(newRoles);
    const finalRoles = AccountEntity.applyRoleLogic(newRoles);

    return new AccountEntity(
      this.uid,
      this.login,
      this._password,
      finalRoles,
      this._status,
      this.createdAt,
      new Date(),
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
    );
  }

  static create(props: {
    login: string;
    password?: string;
    roles: AccountRole[];
    status?: AccountStatus;
  }): AccountEntity {
    const finalRoles = AccountEntity.applyRoleLogic(props.roles);
    
    return new AccountEntity(
      require('crypto').randomUUID(),
      props.login,
      props.password || null,
      finalRoles,
      props.status || 'open',
      new Date(),
      new Date(),
    );
  }
}

