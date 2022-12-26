import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export default class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  users: string[];
}
