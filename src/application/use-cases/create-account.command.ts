export class CreateAccountCommand {
  constructor(
    public readonly login: string,
    public readonly roles: string[],
    public readonly password?: string,
    public readonly status?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}