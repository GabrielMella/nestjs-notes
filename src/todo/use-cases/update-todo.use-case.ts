import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../repositories/todo.repository.interface';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class UpdateTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  execute(id: number, updateTodoDto: UpdateTodoDto): Promise<void> {
    return this.todoRepository.update(id, updateTodoDto);
  }
}
