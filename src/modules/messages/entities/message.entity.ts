import ChatEntity from 'src/modules/chats/entities/chat.entity';
import UserEntity from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export default class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  createdAt: number;

  @ManyToOne(() => ChatEntity, (chat) => chat.messages, { onDelete: 'CASCADE' })
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value?.getTime() ?? '',
    },
  })
  updatedAt: number;
}
