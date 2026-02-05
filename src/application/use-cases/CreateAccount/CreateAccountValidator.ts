import { BadRequestException } from '@nestjs/common';
import { CreateAccountDto } from "./CreateAccountDTO";

export class CreateAccountValidator {
    validate(dto: CreateAccountDto): void {
        if (dto.email.endsWith('@admin.com') && !dto.roles?.includes('ROLE_ADMIN')) {
            throw new BadRequestException('Admin email requires ROLE_ADMIN');
        }
    }
}