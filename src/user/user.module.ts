import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordManagementService } from './password-management.service';
import { TokenService } from './token.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PasswordManagementService, TokenService, AuthGuard],
  controllers: [UserController],
  imports: [PrismaModule, JwtModule.register({})],
  exports: [UserService, TokenService],
})
export class UserModule {}
