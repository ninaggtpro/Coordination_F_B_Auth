import { RolesValueObject } from '../value_objects/role.value-object';
import { StatusValueObject } from '../value_objects/status.value-object';

export class AccountEntity {
  constructor(
    public readonly uid: string,
    public readonly login: string,
    private readonly _password: string | null,
    private readonly _roles: RolesValueObject,
    private readonly _status: StatusValueObject,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  get roles(): RolesValueObject {
    return this._roles;
  }

  get status(): StatusValueObject {
    return this._status;
  }

  get password(): string | null {
    return this._password;
  }

  
  static fromPrisma(data: any): AccountEntity {
    return new AccountEntity(
      data.uid || data.id, // On gère les deux noms possibles
      data.login,
      data.password,
      new RolesValueObject(data.roles),
      new StatusValueObject(data.status),
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }

  static create(props: {
    login: string;
    password?: string;
    roles: string[];
    status?: string;
  }): AccountEntity {
    return new AccountEntity(
      require('crypto').randomUUID(),
      props.login,
      props.password || null,
      new RolesValueObject(props.roles),
      new StatusValueObject(props.status || 'open'),
      new Date(),
      new Date(),
    );
  }
}
