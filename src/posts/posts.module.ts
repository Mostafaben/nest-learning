import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostService } from './posts.service';

@Module({
  providers: [PostService],
  imports: [PrismaModule],
  exports: [PostService],
})
export class PostsModule {}
