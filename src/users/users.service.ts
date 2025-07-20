import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  private users: IUser[] = [];
  create(createUserDto: CreateUserDto): IUser {
    const newUser = {
      id: Date.now(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findOne(id: number): IUser {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): IUser {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    const existing = this.users[index];
    const updated = { ...existing, ...updateUserDto };
    this.users[index] = updated;
    return updated;
  }
}
