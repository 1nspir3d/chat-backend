import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import CreateChatDto from '../dtos/CreateChat.dto';
import { ChatsService } from '../services/chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get()
  async getChats() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  async getChat(@Param('id') id: string) {
    return this.chatsService.findOne(id);
  }

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    return this.chatsService.delete(id);
  }
}
