import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { name: 'Test', email: 'test@example.com', password: 'test', isAdmin: false };
      const result: User = { id: 1, ...createUserDto };
      
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createUserDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [{ id: 1, name: 'Test', email: 'test@example.com', password: 'test', isAdmin: false }];
      
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result: User = { id: 1, name: 'Test', email: 'test@example.com', password: 'test', isAdmin: false };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated',
        email: 'updated@example.com',
        password: 'updated',
        isAdmin: true
      };
      const result: User = {
        id: 1,
        name: 'Updated',
        email: 'updated@example.com',
        password: 'updated',
        isAdmin: true
       };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateUserDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const result: User = { id: 1, name: 'Test', email: 'test@example.com', password: 'test', isAdmin: false };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
