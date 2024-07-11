import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class FindOneUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  execute(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}