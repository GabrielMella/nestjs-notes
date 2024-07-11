import { CreateUserDto } from "../dto/create-user.dto";
import { IUserRepository } from "../repositories/user.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    async execute(createUserDto: CreateUserDto): Promise<void> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        const newUserDto = {
            ...createUserDto,
            password: hashedPassword,
        };

        return this.userRepository.create(newUserDto);
    }
}