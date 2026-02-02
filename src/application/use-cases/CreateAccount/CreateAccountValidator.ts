import { CreateAccountDto } from "./CreateAccountDTO";

export class CreateAccountValidator {
    validate(dto: CreateAccountDto): void {
        if (!dto.login || dto.login.trim() === '') {
            throw new Error('Login is required.');
        }
        if (dto.roles.length === 0) {
            throw new Error('At least one role must be specified.');
        }
        if (dto.status && dto.status !== 'open' && dto.status !== 'closed') {
            throw new Error('Invalid status value.');
        }
        if (dto.password && dto.password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }
        if (dto.password && dto.password.length > 42) {
            throw new Error('Password must be at most 42 characters long.');
        }
    }
}