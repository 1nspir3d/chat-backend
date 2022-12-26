import { Module } from '@nestjs/common';
import { ChatsService } from './services/chats.service';
import { ChatsController } from './controllers/chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChatEntity from './entities/chat.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity]), UsersModule],
  providers: [ChatsService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
