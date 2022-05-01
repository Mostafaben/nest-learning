import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signUp(
    @Body() userDto: Pick<UserModel, 'name' | 'email'>,
  ): Promise<UserModel> {
    return this.userService.createUser(userDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Get()
  async users(): Promise<Array<UserModel>> {
    return this.userService.users({});
  }
}
