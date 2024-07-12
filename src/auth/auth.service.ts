import { HttpException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FindUserUseCase } from 'src/users/use-cases/find-email-user.use-case';


@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByEmail: FindUserUseCase,
    private jwtService: JwtService
  ) {}

  async authenticate({email, password}: AuthPayloadDto) {
    try {
      const user = await this.findUserByEmail.execute(email);

      const passwordMatch = await bcrypt.compare(password, user?.password);
  
      if (!passwordMatch) {
        throw new UnauthorizedException();
      }

      return {
        access_token: this.jwtService.sign({ email: user?.email }),
        userid: user?.id,
        username: user?.name
      };

    } catch(e) {
      throw new HttpException('Invalid Credentials', 401);
    }
  }
}
