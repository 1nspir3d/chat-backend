import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import CreateMessageDto from './CreateMessage.dto';

export default class UpdateMessageDto extends PickType(CreateMessageDto, [
  'value',
] as const) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
