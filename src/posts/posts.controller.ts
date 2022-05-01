import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async posts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: {
              startsWith: searchString,
            },
          },
          {
            author: {
              OR: [
                {
                  email: {
                    contains: searchString,
                  },
                },
              ],
            },
          },
        ],
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
  @Post()
  async createDraft(
    @Body() postData: Pick<PostModel, 'authorId' | 'content' | 'title'>,
  ): Promise<PostModel> {
    const { title, content, authorId } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: {
          id: authorId,
        },
      },
    });
  }
  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }
}
