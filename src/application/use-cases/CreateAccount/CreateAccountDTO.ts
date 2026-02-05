export interface CreateAccountDTO {
    login: string;
    password?: string | null;
    roles?: string[];
    status?: string;
    provider?: string;
}