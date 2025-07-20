import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './tasks.interface';
import { QueryDto } from './dto/query.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() query: QueryDto): ITask[] {
    return this.tasksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ITask {
    return this.tasksService.findOne(id);
  }

  @Patch(':userId/:id')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    return this.tasksService.update(id, userId, updateTaskDto);
  }

  @Delete(':userId/:id')
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): void {
    return this.tasksService.remove(id, userId);
  }

  @Get('user/:userId')
  getUserTasks(@Param('userId', ParseIntPipe) userId: number): ITask[] {
    return this.tasksService.getUserTasks(userId);
  }
}
