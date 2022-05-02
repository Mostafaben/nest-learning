import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { jwtPayload, TokenService } from 'src/user/token.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const {
      headers: { authorization },
    }: any = request;
    const payload: jwtPayload = this.tokenService.validateToken(
      (<string>authorization)?.split(' ')[1],
    );
    if (!payload) return false;
    request.user = await this.userService.getUserById({ id: payload.id });
    return true;
  }
}
