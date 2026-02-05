import { BadRequestException } from '@nestjs/common';
import { CreateAccountDto } from "./CreateAccountDTO";

export class CreateAccountValidator {
    validate(dto: CreateAccountDto): void {
        // Aucune validation spécifique pour le moment
    }
}