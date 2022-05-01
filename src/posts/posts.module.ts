import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';

@Module({
  providers: [PostService],
  imports: [PrismaModule],
  exports: [PostService],
  controllers: [PostController],
})
export class PostsModule {}
