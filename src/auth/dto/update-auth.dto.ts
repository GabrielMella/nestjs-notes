import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
