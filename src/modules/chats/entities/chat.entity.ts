import MessageEntity from 'src/modules/messages/entities/message.entity';
import UserEntity from 'src/modules/users/entities/user.entity';
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

@Entity({ name: 'chats' })
export default class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

  @ManyToMany(() => UserEntity, (user) => user.chats, {
    eager: true,
    onDelete: 'CASCADE',
  })
  users: UserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.chat)
  @JoinTable()
  messages: MessageEntity[];
}
