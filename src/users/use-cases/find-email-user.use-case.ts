import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}