import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordManagementService } from './password-management.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UserService, PasswordManagementService, TokenService],
  controllers: [UserController],
  imports: [PrismaModule, JwtModule.register({})],
  exports: [UserService],
})
export class UserModule {}
