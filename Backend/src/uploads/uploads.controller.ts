import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const uploadPath = path.resolve(__dirname, '../../public/uploads');

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          // z.B. timestamp + originalname
          const unique =
            Date.now() + '-' + file.originalname.replace(/\s/g, '');
          cb(null, unique);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/${file.filename}` };
  }

  @Put(':filename')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          // Überschreibt die Datei mit dem Namen aus der URL
          cb(null, file.originalname.replace(/\s/g, ''));
        },
      }),
    }),
  )
  async updateFile(
    @Param('filename') filename: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    // Optional: Alte Datei löschen, falls vorhanden
    const filePath = path.join(uploadPath, filename);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
    // Die neue Datei wird gespeichert
    return { url: `/uploads/${file.filename}` };
  }

  @Delete(':filename')
  async deleteFile(
    @Param('filename') filename: string,
  ): Promise<{ deleted: boolean; reason?: string }> {
    const filePath = path.join(uploadPath, filename);
    try {
      await fs.promises.unlink(filePath);
      return { deleted: true };
    } catch {
      return { deleted: false, reason: 'not found' };
    }
  }
}
