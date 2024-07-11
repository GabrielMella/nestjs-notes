import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoUseCase } from './use-cases/create-todo.use-case';
import { FindAllTodoUseCase } from './use-cases/find-all-todo.use-case';
import { FindOneTodoUseCase } from './use-cases/find-one-todo.use-case';
import { UpdateTodoUseCase } from './use-cases/update-todo.use-case';
import { RemoveTodoUseCase } from './use-cases/remove-todo.use-case';

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
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.createTodoUseCase.execute(createTodoDto);
  }

  @Get()
  findAll() {
    return this.findAllTodoUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneTodoUseCase.execute(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.updateTodoUseCase.execute(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeTodoUseCase.execute(+id);
  }
}
