import { PartialType } from '@nestjs/mapped-types';
import { AuthPayloadDto } from './auth.dto';

export class UpdateAuthDto extends PartialType(AuthPayloadDto) {}
