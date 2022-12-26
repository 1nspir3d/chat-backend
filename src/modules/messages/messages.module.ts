import { Module } from '@nestjs/common';
import { MessagesService } from './services/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import MessageEntity from './entities/message.entity';
import { ChatsModule } from '../chats/chats.module';
import { UsersModule } from '../users/users.module';
import { MessagesGateway } from './controllers/messages.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    ChatsModule,
    UsersModule,
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
