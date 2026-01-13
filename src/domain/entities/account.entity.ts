import { RolesValueObject } from '../value_objects/role.value-object';
import { StatusValueObject } from '../value_objects/status.value-object';

export class AccountEntity {
    public readonly uid: string;
    public readonly login: string;
    private _password: string | null;
    private _roles: RolesValueObject;
    private _status: StatusValueObject;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    constructor(props: {
        uid: string;
        login: string;
        password?: string | null;
        roles: RolesValueObject;
        status: StatusValueObject;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.uid = props.uid;
        this.login = props.login;
        this._password = props.password ?? null;
        this._roles = props.roles;
        this._status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    get roles(): string[] {
        return this._roles.getValues();
    }

    get status(): string {
        return this._status.getValue();
    }
}
