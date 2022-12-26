import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from '../dtos/CreateUser.dto';
import UserEntity from '../entities/user.entity';
import { v4 as uuid4 } from 'uuid';
import UpdateUserDto from '../dtos/UpdateUser.dto';
import UpdatePasswordDto from '../dtos/UpdatePassword.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['chats'],
    });

    if (user) return user.toResponse();
    throw new HttpException('User with such id does not exist', 404);
  }

  async create(userDto: CreateUserDto) {
    const { repeatPassword, ...user } = userDto;
    if (userDto.password !== repeatPassword)
      throw new HttpException("Passwords don't match", 400);

    const uuid = uuid4();

    const newUser = {
      ...user,
      id: uuid,
    };

    const createdUser = this.usersRepository.create(newUser);

    return (await this.usersRepository.save(createdUser)).toResponse();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User with such id does not exist', 404);
    }

    Object.assign(user, {
      ...updateUserDto,
    });

    return (await this.usersRepository.save(user)).toResponse();
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Wrong old password', 400);
    }

    Object.assign(user, {
      password: updatePasswordDto.password,
    });

    return (await this.usersRepository.save(user)).toResponse();
  }

  async delete(id: string) {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException("User with such id doesn't exist", 404);
    }
  }
}
