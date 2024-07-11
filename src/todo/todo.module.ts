import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repositories/todo.repository';
import { CreateTodoUseCase } from './use-cases/create-todo.use-case';
import { FindAllTodoUseCase } from './use-cases/find-all-todo.use-case';
import { RemoveTodoUseCase } from './use-cases/remove-todo.use-case';
import { UpdateTodoUseCase } from './use-cases/update-todo.use-case';
import { FindOneTodoUseCase } from './use-cases/find-one-todo.use-case';

@Module({
  // Importamos apenas as entidades que queremos usar nesse modulo
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [
    TodoRepository,
    CreateTodoUseCase,
    FindAllTodoUseCase,
    FindOneTodoUseCase,
    UpdateTodoUseCase,
    RemoveTodoUseCase,
    {
      provide: 'ITodoRepository',
      useExisting: TodoRepository,
    },
  ],
})
export class TodoModule {}
