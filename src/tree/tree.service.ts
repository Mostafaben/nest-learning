import { Injectable } from '@nestjs/common';
import { Item, ItemType, Resource } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityDto, PathDto, ResourceDto } from './item.dto';

@Injectable()
export class TreeService {
  constructor(private prismaService: PrismaService) {}

  createPath({ title, parentId }: PathDto): Promise<Item> {
    return this.prismaService.item.create({
      data: {
        title,
        parentId,
      },
    });
  }

  createActivity(activityDto: ActivityDto): Promise<Item> {
    return this.prismaService.item.create({
      data: {
        title: activityDto.title,
        parentId: activityDto.parentId,
        type: ItemType.ACTIVITY,
        activity: {
          create: {
            coef: activityDto.coef,
          },
        },
      },
    });
  }

  async getByLevel(parentId: number | null = null): Promise<Array<Item>> {
    return this.prismaService.item.findMany({
      where: {
        parentId,
      },
      include: {
        activity: {
          include: {
            Resource: true,
          },
        },
      },
    });
  }

  async getDetailedTree(parentId: number | null = null) {
    return Promise.all(
      (await this.getByLevel(parentId)).map(async (item: any) => {
        if (item.type == ItemType.PATH) {
          item = {
            ...item,
            children: await this.getDetailedTree(item.id),
          };
          delete item.activity;
        }
        return item;
      }),
    );
  }

  createResource({ url, activityId }: ResourceDto): Promise<Resource> {
    return this.prismaService.resource.create({
      data: {
        url,
        activity: {
          connect: {
            id: activityId,
          },
        },
      },
    });
  }
}
