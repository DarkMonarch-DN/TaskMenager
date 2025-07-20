import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './tasks.interface';
import { UsersService } from 'src/users/users.service';
import { QueryDto } from './dto/query.dto';

const sortMap = {
  asc: (a: ITask, b: ITask) => a.title.localeCompare(b.title),
  desc: (a: ITask, b: ITask) => a.desc.localeCompare(b.desc),
  createAt: (a: ITask, b: ITask) => a.createAt - b.createAt,
};

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];
  constructor(private readonly userService: UsersService) {}
  create(createTaskDto: CreateTaskDto): ITask {
    this.userService.findOne(createTaskDto.userId);
    const newTask: ITask = {
      id: Date.now(),
      ...createTaskDto,
      createAt: Date.now(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(query: QueryDto): ITask[] {
    const { sort, limit, search } = query;
    let result: ITask[] = [...this.tasks];

    if (search) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.desc.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (limit && !isNaN(+limit)) {
      result = result.slice(0, Number(limit));
    }

    if (sort && sortMap[sort]) {
      result = result.sort(sortMap[sort]);
    }

    return result;
  }

  findOne(id: number): ITask {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  update(id: number, userId: number, updateTaskDto: UpdateTaskDto): ITask {
    this.userService.findOne(userId);
    const index = this.tasks.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    const existing = this.tasks[index];
    const updated = { ...existing, ...updateTaskDto };
    this.tasks[index] = updated;
    return updated;
  }

  remove(id: number, userId: number): void {
    this.userService.findOne(userId);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getUserTasks(userId: number) {
    return this.tasks.filter((task) => task.userId === userId);
  }
}
