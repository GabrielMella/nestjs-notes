import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class RemoveUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  execute(id: number): Promise<void> {
    return this.userRepository.remove(id);
  }
}
