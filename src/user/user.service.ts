import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordManagementService } from './password-management.service';
import { TokenService } from './token.service';
import UserDto from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordManagementService: PasswordManagementService,
    private tokenService: TokenService,
  ) {}

  async login({
    email,
    password,
  }: Pick<UserDto, 'email' | 'password'>): Promise<{ accessToken: string }> {
    const user: UserModel = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException({ message: 'user was not found' });
    if (!compareSync(password, user.password))
      throw new ForbiddenException({
        message: 'email or password does not match',
      });
    return {
      accessToken: this.tokenService.generateAccessToken(user.email, user.id),
    };
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  createUser({ password, email, name }: UserDto): Promise<UserModel> {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password: this.passwordManagementService.hashPassword(password),
      },
    });
  }

  updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserModel> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserModel> {
    return this.prisma.user.delete({
      where,
    });
  }

  getUserById(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
      select: {
        email: true,
        password: false,
        id: true,
      },
    });
  }
}
