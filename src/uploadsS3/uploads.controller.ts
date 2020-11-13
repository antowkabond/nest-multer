import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../helpers';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { S3Options } from '../config';

const s3 = new AWS.S3(S3Options);

console.log(process.env.ACCESS_KEY_ID);

@Controller('uploads-s3')
export class UploadsS3Controller {
  constructor(private configService: ConfigService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: 'multer-bucket',
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
          cb(null, Date.now().toString() + '-' + file.originalname);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    return {
      ...file,
    };
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileResponse = {
        originName: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    return response;
  }

  @Get(':img')
  seeUploadedFile(@Param('img') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
