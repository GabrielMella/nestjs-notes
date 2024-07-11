import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{
        id: 1,
        name: "teste",
        email: 'test@example.com',
        isAdmin: true||false
      }] as any;

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user if one is found', async () => {
      const result = {
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        isAdmin: true||false
      } as any;

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);
      expect(await service.findOne(1)).toBe(result);
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      expect(await service.findOne(1)).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const result = {
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        isAdmin: true||false,
        password: 'admin'
      } as any;

      const createUserDto: Prisma.UserCreateInput = {
        email: 'test@teste.com',
        name: 'test',
        password: 'admin',
        isAdmin: false
      }

      jest.spyOn(prisma.user, 'create').mockResolvedValue(result);

      expect(await service.create(createUserDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const result = {
        id: 1,
        email: 'test@example.com',
        name: 'teste',
        isAdmin: true,
        password: 'admin'
      };

      const data: UpdateUserDto = {
        email: 'test@example.com',
        name: 'update',
        isAdmin: true,
        password: 'admin2',
      };

      jest.spyOn(prisma.user, 'update').mockResolvedValue(result);

      expect(await service.update(1, data)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove and return a user', async () => {
      const result = { id: 1, email: 'test@example.com' } as any;
      jest.spyOn(prisma.user, 'delete').mockResolvedValue(result);

      expect(await service.remove(1)).toBe(result);
    });
  });

});
