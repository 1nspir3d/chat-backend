import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsNumber()
  @IsNotEmpty()
  createdAt: number;
}
