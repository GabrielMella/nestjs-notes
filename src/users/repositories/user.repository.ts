import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = this.typeOrmRepo.create(createUserDto);
    await this.typeOrmRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.typeOrmRepo.find();
  }

  findById(id: number): Promise<User | null> {
    return this.typeOrmRepo.findOneOrFail({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.typeOrmRepo.findOneOrFail({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.typeOrmRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}
