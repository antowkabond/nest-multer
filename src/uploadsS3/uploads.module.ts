import { Module } from '@nestjs/common';
import { UploadsS3Controller } from './uploads.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, MulterModule.register()],
  controllers: [UploadsS3Controller],
})
export class UploadsS3Module {}
