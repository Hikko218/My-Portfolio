import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const uploadPath = path.resolve(__dirname, '../../public/uploads');

@Controller('uploads')
export class UploadsController {
  /**
   * Uploads a new file.
   * Returns the URL of the uploaded file.
   * Throws BadRequestException if the upload fails.
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          // Generates a unique filename using timestamp and original name
          const unique =
            Date.now() + '-' + file.originalname.replace(/\s/g, '');
          cb(null, unique);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return { url: `/uploads/${file.filename}` };
    } catch {
      // Throws if file upload fails
      throw new BadRequestException('File could not be uploaded');
    }
  }
  /**
   * Updates (overwrites) an existing file by filename.
   * Deletes the old file if it exists and saves the new one.
   * Returns the URL of the updated file.
   * Throws BadRequestException if the update fails.
   */
  @Put(':filename')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          // Overwrites the file with the name from the URL
          cb(null, file.originalname.replace(/\s/g, ''));
        },
      }),
    }),
  )
  async updateFile(
    @Param('filename') filename: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const filePath = path.join(uploadPath, filename);
    try {
      // Deletes the old file if it exists
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
      // The new file is saved
      return { url: `/uploads/${file.filename}` };
    } catch {
      // Throws if file update fails
      throw new BadRequestException('File could not be updated');
    }
  }
  /**
   * Deletes a file by filename.
   * Returns { deleted: true } if successful.
   * Throws NotFoundException if the file is not found or deletion fails.
   */
  @Delete(':filename')
  async deleteFile(
    @Param('filename') filename: string,
  ): Promise<{ deleted: boolean; reason?: string }> {
    const filePath = path.join(uploadPath, filename);
    try {
      await fs.promises.unlink(filePath);
      return { deleted: true };
    } catch {
      // Throws if file is not found or deletion fails
      throw new NotFoundException('File not found');
    }
  }
}
