import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { FindUserUseCase } from "src/users/use-cases/find-email-user.use-case";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
       private findUserByEmail: FindUserUseCase
    ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.findUserByEmail.execute(payload.email)
        return user;
    }
}
