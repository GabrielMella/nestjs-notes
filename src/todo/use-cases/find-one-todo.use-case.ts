import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../repositories/todo.repository.interface';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class FindOneTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  execute(id: number): Promise<Todo | null> {
    return this.todoRepository.findById(id);
  }
}
