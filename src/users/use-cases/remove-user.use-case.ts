import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';

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
