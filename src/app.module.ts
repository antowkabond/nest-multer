import { Module } from '@nestjs/common';
import { UploadsModule } from './uploads/uploads.module';
import { ConfigModule } from '@nestjs/config';
import { UploadsS3Module } from './uploadsS3/uploads.module';
import { envVariables } from './config/';

@Module({
  imports: [
    UploadsModule,
    UploadsS3Module,
    ConfigModule.forRoot({
      load: [envVariables],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
