import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    const MULTER_DEST = this.configService.get<string>('MULTER_DEST');
    const MAX_FILE_SIZE = this.configService.get<number>('MAX_FILE_SIZE')! + 1;
    const ALLOWED_IMAGE_EXTENSIONS =
      this.configService
        .get('ALLOWED_IMAGE_EXTENSIONS')
        .split(',')
        .map((ext: string) => ext.trim()) || [];
    return {
      limits: {
        fileSize: MAX_FILE_SIZE || 1048576, // or 1Mb
      },
      fileFilter: (req: any, file: any, cb: any) => {
        if (
          path
            .extname(file.originalname)
            .match(new RegExp(`\\.(${ALLOWED_IMAGE_EXTENSIONS.join('|')})$`))
        ) {
          cb(null, true);
        } else {
          cb(
            new HttpException(
              `Unsupported file type ${path.extname(file.originalname)}`,
              HttpStatus.UNPROCESSABLE_ENTITY,
            ),
            false,
          );
        }
      },
      // Storage properties
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = `${MULTER_DEST}`;
          // Create folder if doesn't exist
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
          // Calling the callback passing the random name generated with the original extension name
          cb(null, uuid_fn(file));
        },
      }),
    };
  }
}

function uuid_fn(file: Express.Multer.File) {
  return `${Date.now()}_${file.originalname}`;
}
