import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { TokenService } from './token.service';
import UserDto from './user.dto';
import { UserService } from './user.service';

export type SignUpResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @Post('sign-up')
  async signUp(
    @Body(new ValidationPipe()) userDto: UserDto,
  ): Promise<SignUpResponse> {
    return this.tokenService.generateTokens(
      await this.userService.createUser(userDto),
    );
  }

  @Post('login')
  getUser(
    @Body(new ValidationPipe())
    credentials: Pick<UserDto, 'email' | 'password'>,
  ): Promise<{ accessToken: string }> {
    return this.userService.login(credentials);
  }

  @Get()
  async users(): Promise<Array<UserModel>> {
    return this.userService.users({});
  }
}
