import { IsString, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  repeatPassword: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
