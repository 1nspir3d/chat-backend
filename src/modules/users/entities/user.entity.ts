import ChatEntity from 'src/modules/chats/entities/chat.entity';
import MessageEntity from 'src/modules/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value?.getTime() ?? '',
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value?.getTime() ?? '',
    },
  })
  updatedAt: number;

  @ManyToMany(() => ChatEntity, (chat) => chat.users)
  @JoinTable()
  chats: ChatEntity[];

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  toResponse() {
    const { password, toResponse, ...rest } = this;
    return { ...rest };
  }
}
