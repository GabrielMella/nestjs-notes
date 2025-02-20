import { Injectable, Inject, Logger } from "@nestjs/common";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { ITodoRepository } from "../repositories/todo.repository.interface";
import { Todo } from "../entities/todo.entity";

@Injectable()
export class CreateTodoUseCase {
    constructor(
        @Inject('ITodoRepository')
        private readonly todoRepository: ITodoRepository
    ) {}

    execute(createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoRepository.create(createTodoDto);
    }
} 
