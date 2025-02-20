import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, Inject, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { RemoveUserUseCase } from './use-cases/remove-user.use-case';
import { FindUserUseCase } from './use-cases/find-email-user.use-case';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {

  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase;

  @Inject(FindAllUsersUseCase)
  private readonly findAllUsersUseCase: FindAllUsersUseCase;

  @Inject(FindOneUserUseCase)
  private readonly findOneUserUseCase: FindOneUserUseCase;

  @Inject(FindUserUseCase)
  private readonly findUserUseCase: FindUserUseCase;
  
  @Inject(UpdateUserUseCase)
  private readonly updateUserUseCase: UpdateUserUseCase;
  
  @Inject(RemoveUserUseCase)
  private readonly removeUserUseCase: RemoveUserUseCase;

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.findOneUserUseCase.execute(+id);
  }

  @Post(':email')
  @UseGuards(JwtAuthGuard)
  findUser(@Param('email') email: string) {
    return this.findUserUseCase.execute(email);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.removeUserUseCase.execute(+id);
  }
}
