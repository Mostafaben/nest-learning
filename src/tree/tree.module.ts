import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TreeController } from './tree.controller';
import { TreeService } from './tree.service';

@Module({
  controllers: [TreeController],
  providers: [TreeService],
  imports: [PrismaModule],
})
export class TreeModule {}
