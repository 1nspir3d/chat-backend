import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateChatDto from '../dtos/CreateChat.dto';
import ChatEntity from '../entities/chat.entity';
import { v4 as uuid4 } from 'uuid';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatsRepository: Repository<ChatEntity>,
    private usersService: UsersService,
  ) {}

  async findAll() {
    return this.chatsRepository.find();
  }

  async findOne(id: string) {
    return this.chatsRepository.findOne({
      where: { id },
    });
  }

  async create(chatDto: CreateChatDto) {
    const id = uuid4();
    const { users, ...rest } = chatDto;

    const queriedUsers = await Promise.all(
      users.map(async (id) => {
        try {
          return await this.usersService.findOne(id);
        } catch (err) {}
      }),
    );

    const newChat = {
      ...rest,
      users: queriedUsers,
      id,
    };
    const createdChat = this.chatsRepository.create(newChat);

    return await this.chatsRepository.save(createdChat);
  }

  async delete(id: string) {
    const deletedChat = await this.chatsRepository.delete(id);

    if (deletedChat.affected === 0) {
      throw new HttpException('Chat with such id does not exist', 400);
    }
  }
}
