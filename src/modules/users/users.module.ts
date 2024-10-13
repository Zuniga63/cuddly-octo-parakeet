import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ImageResource } from '../image-resources/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, ImageResource]), CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
