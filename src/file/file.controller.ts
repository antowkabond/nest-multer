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

@Controller('files')
export class FileController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    return {
      originName: file.originalname,
      filename: file.filename,
    };
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploads',
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
