import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Item, Resource } from '@prisma/client';
import { PathDto } from './item.dto';
import { TreeService } from './tree.service';

@Controller('tree')
export class TreeController {
  constructor(private treeService: TreeService) {}

  @Post('activity')
  createActivity(
    @Body()
    activityDto: {
      title: string;
      parentId: number;
      coef: number;
    },
  ): Promise<Item> {
    return this.treeService.createActivity(activityDto);
  }

  @Post('path')
  createPath(@Body() pathDto: PathDto): Promise<Item> {
    return this.treeService.createPath(pathDto);
  }

  @Get('detailed')
  getTree(): Promise<Array<any>> {
    return this.treeService.getDetailedTree();
  }

  @Get()
  getFirstLevel(): Promise<Array<any>> {
    return this.treeService.getByLevel();
  }

  @Get(':id')
  getLevel(@Param('id', ParseIntPipe) parentId: number): Promise<Array<any>> {
    return this.treeService.getByLevel(parentId);
  }

  @Post(':id/resource')
  addResource(
    @Param('id', ParseIntPipe) activityId: number,
    @Body('url') url: string,
  ): Promise<Resource> {
    return this.treeService.createResource(activityId, url);
  }
}
