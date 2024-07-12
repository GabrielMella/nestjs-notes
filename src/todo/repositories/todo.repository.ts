import { Injectable } from "@nestjs/common";
import { ITodoRepository } from "./todo.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "../entities/todo.entity";
import { Repository } from "typeorm";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";


@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
      @InjectRepository(Todo)
      private typeOrmRepo: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
      const todo = this.typeOrmRepo.create(createTodoDto);
      return await this.typeOrmRepo.save(todo);
  }
  
  findAll(userid: number): Promise<Todo[]> {
    return this.typeOrmRepo.find({
      where: {userid: userid}
    });
  }
  
  findById(id: number, userid: number): Promise<Todo | null> {
    return this.typeOrmRepo.findOneOrFail({
      where: { id: id, userid: userid },
    });
  }
  
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<void> {
    await this.typeOrmRepo.update(id, updateTodoDto);
  }
  
  async remove(id: number): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}