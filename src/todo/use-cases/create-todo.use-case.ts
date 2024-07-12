import { Injectable, Inject } from "@nestjs/common";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { ITodoRepository } from "../repositories/todo.repository.interface";
import { Todo } from "../entities/todo.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class CreateTodoUseCase {
    constructor(
        @Inject('ITodoRepository')
        private readonly todoRepository: ITodoRepository
    ) {}

    async execute(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
        createTodoDto.userid = user.id;
        return this.todoRepository.create(createTodoDto);
    }
}