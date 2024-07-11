import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  execute(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    return this.userRepository.update(id, updateUserDto);
  }
}
