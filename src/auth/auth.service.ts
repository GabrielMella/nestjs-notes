import { HttpException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FindUserUseCase } from 'src/users/use-cases/find-email-user.use-case';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByEmail: FindUserUseCase,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async Authenticate(authPayloadDto: AuthPayloadDto) {
    try {
      const user = await this.findUserByEmail.execute(authPayloadDto.email);

      const passwordMatch = await bcrypt.compare(authPayloadDto.password,user?.password);
  
      if (!passwordMatch) {
        throw new UnauthorizedException();
      }

      return {
        access_token: this.jwtService.sign({ email: user?.email }),
      };

    } catch(e) {
      throw new HttpException('Invalid Credentials', 401);
    }
  }
}
