import { ApiProperty } from '@nestjs/swagger';

export class ValidTokenResponse {
    @ApiProperty({
        description: "Indique si le token est valide",
        example: true
    })
    isValid: boolean;

    constructor(isValid: boolean) {
        this.isValid = isValid;
    }
}
