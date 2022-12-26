import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsService } from 'src/modules/chats/services/chats.service';
import { UsersService } from 'src/modules/users/services/users.service';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import CreateMessageDto from '../dtos/CreateMessage.dto';
import UpdateMessageDto from '../dtos/UpdateMessage.dto';
import MessageEntity from '../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
    private chatsService: ChatsService,
    private usersService: UsersService,
  ) {}

  async findAll() {
    return await this.messageRepo.find();
  }

  async findOne(id: string) {
    const message = await this.messageRepo.findOne({
      where: {
        id,
      },
    });

    if (!message) {
      throw new HttpException('Message with such id does not exist', 404);
    }

    return message;
  }

  async create(createMessageDto: CreateMessageDto) {
    const uuid = uuid4();

    const { chatId, authorId, ...rest } = createMessageDto;

    const chat = await this.chatsService.findOne(chatId);
    const user = await this.usersService.findOne(authorId);

    const newMessage = {
      ...rest,
      id: uuid,
      chat,
      user,
    };

    const createdMessage = this.messageRepo.create(newMessage);
    console.log('createdMessage: ', createdMessage);

    return await this.messageRepo.save(createdMessage);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);

    Object.assign(message, {
      ...updateMessageDto,
    });

    return await this.messageRepo.save(message);
  }
}
