import { Account, Role, Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AccountEntity implements Account {
    @ApiProperty()
    uid: string;
    @ApiProperty()
    login: string;
    @ApiProperty()
    password: string | null;
    @ApiProperty({ enum: ['ROLE_USER', 'ROLE_ADMIN'], isArray: true })
    roles: Role[];
    @ApiProperty({ enum: ['open', 'closed'] })
    status: Status;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
