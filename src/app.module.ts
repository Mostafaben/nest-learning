import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [PrismaModule, UserModule, PostsModule, TreeModule],
  controllers: [AppController],
})
export class AppModule {}
