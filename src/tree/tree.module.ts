import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordManagementService } from 'src/user/password-management.service';
import { TokenService } from 'src/user/token.service';
import { UserService } from 'src/user/user.service';
import { TreeController } from './tree.controller';
import { TreeService } from './tree.service';

@Module({
  controllers: [TreeController],
  providers: [
    TreeService,
    AuthGuard,
    TokenService,
    AuthGuard,
    UserService,
    PasswordManagementService,
  ],
  imports: [PrismaModule, JwtModule.register({})],
})
export class TreeModule {}
