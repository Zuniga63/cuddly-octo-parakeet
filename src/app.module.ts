import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { appConfig, JoiValidationSchema, typeOrmConfig } from './config';

import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { ImageResourcesModule } from './modules/image-resources/image-resources.module';
import { MailsModule } from './modules/mails/mails.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({ uri: configService.get<string>('mongo')! }),
    }),

    CommonModule,

    AuthModule,

    UsersModule,

    RolesModule,

    CloudinaryModule,

    ImageResourcesModule,

    MailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
