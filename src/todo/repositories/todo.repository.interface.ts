import { CreateTodoDto } from "../dto/create-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { Todo } from "../entities/todo.entity";


export interface ITodoRepository {
    create(createTodoDto: CreateTodoDto): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findById(id: number): Promise<Todo | null>;
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<void>;
    remove(id: number): Promise<void>;
}