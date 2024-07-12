import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Req } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoUseCase } from './use-cases/create-todo.use-case';
import { FindAllTodoUseCase } from './use-cases/find-all-todo.use-case';
import { FindOneTodoUseCase } from './use-cases/find-one-todo.use-case';
import { UpdateTodoUseCase } from './use-cases/update-todo.use-case';
import { RemoveTodoUseCase } from './use-cases/remove-todo.use-case';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';

@Controller('todo')
export class TodoController {

  @Inject(CreateTodoUseCase)
  private readonly createTodoUseCase: CreateTodoUseCase;

  @Inject(FindAllTodoUseCase)
  private readonly findAllTodoUseCase: FindAllTodoUseCase;

  @Inject(FindOneTodoUseCase)
  private readonly findOneTodoUseCase: FindOneTodoUseCase;
  
  @Inject(UpdateTodoUseCase)
  private readonly updateTodoUseCase: UpdateTodoUseCase;
  
  @Inject(RemoveTodoUseCase)
  private readonly removeTodoUseCase: RemoveTodoUseCase;

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.createTodoUseCase.execute(createTodoDto);
  }

  @Get(':userid')
  @UseGuards(JwtAuthGuard)
  findAll(@Param('userid') userid: string) {
    return this.findAllTodoUseCase.execute(+userid);
  }

  @Get(':id/:userid')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Param('userid') userid: string) {
    return this.findOneTodoUseCase.execute(+id, +userid);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.updateTodoUseCase.execute(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.removeTodoUseCase.execute(+id);
  }
}
