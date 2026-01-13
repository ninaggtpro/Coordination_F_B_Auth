export type AccountStatus = 'open' | 'closed';

export class StatusValueObject {
  private readonly status: AccountStatus;
  private static readonly validStatuses: AccountStatus[] = ['open', 'closed'];
  constructor(value: string) {
    if (!StatusValueObject.validStatuses.includes(value as AccountStatus)) {
      throw new Error(`Invalid status value: ${value}`);
    }
    this.status = value as AccountStatus;
  }

  getValue(): AccountStatus {
    return this.status;
  }
}
