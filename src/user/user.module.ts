import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
