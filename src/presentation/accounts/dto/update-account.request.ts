import { PartialType } from '@nestjs/swagger';
import { CreateAccountRequest } from './create-account.request';

export class UpdateAccountRequest extends PartialType(CreateAccountRequest) {}
