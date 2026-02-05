import { BadRequestException } from "@nestjs/common";
import { CreateAccountDTO } from "./CreateAccountDTO";

export class CreateAccountValidator {
    validate(dto: CreateAccountDTO): void {
        if (!dto.login || dto.login.trim() === '') {
            throw new BadRequestException('Login is required.');
        }

        const provider = dto.provider ?? 'local';
        
        // Pour l'inscription locale, le password est obligatoire
        if (provider === 'local') {
            if (!dto.password || dto.password.trim() === '') {
                throw new BadRequestException('Password is required for local registration.');
            }
            if (dto.password.length < 6) {
                throw new BadRequestException('Password must be at least 6 characters long.');
            }
            if (dto.password.length > 42) {
                throw new BadRequestException('Password must be at most 42 characters long.');
            }
        }
        
        // Pour OAuth (github, google), le password n'est pas nécessaire
    }
}