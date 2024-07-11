import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { RemoveUserUseCase } from './use-cases/remove-user.use-case';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    RemoveUserUseCase,
    {
      provide: 'IUserRepository',
      useExisting: UserRepository,
    },
  ],
})

export class UsersModule {}
