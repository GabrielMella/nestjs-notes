import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../repositories/todo.repository.interface';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class FindAllTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  execute(userid: number): Promise<Todo[]> {
    return this.todoRepository.findAll(userid);
  }
}
