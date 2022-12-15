import { PartialType, OmitType } from '@nestjs/mapped-types';
import CreateUserDto from './CreateUser.dto';

export default class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'repeatPassword'] as const),
) {}
