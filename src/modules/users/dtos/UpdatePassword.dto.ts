import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import CreateUserDto from './CreateUser.dto';

export default class UpdatePasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
