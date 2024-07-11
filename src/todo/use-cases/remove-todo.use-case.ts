import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../repositories/todo.repository.interface';

@Injectable()
export class RemoveTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  execute(id: number): Promise<void> {
    return this.todoRepository.remove(id);
  }
}
