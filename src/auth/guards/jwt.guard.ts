import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const [req] = context.getArgs();
        console.log(req);
        return super.canActivate(context);
    }
}