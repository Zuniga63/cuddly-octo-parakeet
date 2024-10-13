import { Module } from '@nestjs/common';
import { ImageResourcesService } from './image-resources.service';
import { ImageResourcesController } from './image-resources.controller';

@Module({
  controllers: [ImageResourcesController],
  providers: [ImageResourcesService],
})
export class ImageResourcesModule {}
