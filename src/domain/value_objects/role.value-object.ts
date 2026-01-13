export type AccountRole = 'ROLE_ADMIN' | 'ROLE_USER';

export class RolesValueObject {
  private readonly roles: AccountRole[];

  private static readonly validRoles: string[] = ['ROLE_ADMIN', 'ROLE_USER'];

  constructor(values: string[]) {
    const rolesSet = new Set<AccountRole>();
    for (const val of values) {
      if (!RolesValueObject.validRoles.includes(val)) {
        throw new Error(`Invalid role value: ${val}`);
      }

      const role = val as AccountRole;

      if (role === 'ROLE_ADMIN') {
        rolesSet.add('ROLE_ADMIN');
        rolesSet.add('ROLE_USER');
      } else {
        rolesSet.add(role);
      }
    }

    this.roles = Array.from(rolesSet);
  }

  getValues(): AccountRole[] {
    return this.roles;
  }

  hasRole(role: AccountRole): boolean {
    return this.roles.includes(role);
  }
}