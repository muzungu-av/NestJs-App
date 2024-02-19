import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as gm from 'gm';
import * as path from 'path';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { winstonLogger } from 'winston.logger';
import { CryptoHash } from 'image/crypto/crypto';

export interface ImgFileProcessingResult {
  uid?: string;
  success: boolean;
  originalName?: string;
  fileName?: string;
  path?: string;
  miniPath?: string;
  sizeBytes?: number;
  createdAt?: Date;
  description?: string;
}

@Injectable()
export class ImageHandler {
  private readonly readFileAsync = promisify(fs.readFile);
  private readonly dest: string;
  private readonly mini_prefix: string = 'mini_';
  constructor(
    private configService: ConfigService,
    private crypto: CryptoHash,
  ) {
    this.dest = this.configService.get<string>('MULTER_DEST');
  }

  async do(file: Express.Multer.File): Promise<ImgFileProcessingResult> {
    const originalFileName = file.originalname; // see MulterConfigService
    const newFileName = file.filename;
    const filePath = path.join(process.cwd(), this.dest, newFileName); // from MulterConfigService

    const miniFilePath = path.join(
      process.cwd(),
      this.dest,
      this.mini_prefix + newFileName.replace(/\.[^/.]+$/, ''),
      this.mini_prefix + newFileName,
    );

    const fileSize = file.size;

    const uid = await this.crypto
      .calculateFileHash(filePath)
      .then((hash) => {
        winstonLogger.info(`File hash ${filePath}: ${hash}`);
        return hash;
      })
      .catch((error) => {
        winstonLogger.info(`Error when calculating the file hash: ${error}`);
        return '';
      });

    winstonLogger.info(`Work with the file begins (ImageHandler): ${filePath}`);

    const imageFileBuffer = await this.readFileAsync(filePath);

    const result: ImgFileProcessingResult = {
      success: false,
    };

    try {
      const identifyResult = await this.identify(imageFileBuffer);

      if (identifyResult.success) {
        winstonLogger.info(`Identification was successful`);
        const resizedResult = await this.resize(
          identifyResult.buffer,
          miniFilePath,
        );
        if (resizedResult.resized !== undefined) {
          //todo  `Добавить в МОНГО: ${filePath} - ${resizedResult.resized}`,
        }
        winstonLogger.info(`The resysis was a success`);

        result.uid = uid;
        result.originalName = originalFileName;
        result.fileName = newFileName;
        result.path = filePath;
        result.miniPath = miniFilePath;
        result.sizeBytes = fileSize;
        result.createdAt = new Date();
        result.success = true;
        return result;
      } else {
        return result;
      }
    } catch (error) {
      winstonLogger.info(`There's been an error: ${error.errorMsg}`);
      winstonLogger.info(`Deleting the file: ${filePath}`);
      this.remove(filePath);
      return result;
    }
  }

  private async identify(
    buffer: Buffer,
  ): Promise<{ success: boolean; buffer: Buffer }> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      gm(buffer).identify((err, _value) => {
        if (err) {
          reject({ success: false, errorMsg: err.message });
        } else {
          // Если необходимо дополнительно обработать полученные данные, то это можно сделать здесь
          resolve({ success: true, buffer: buffer });
        }
      });
    });
  }

  private async resize(
    buffer: Buffer,
    newPath: string,
  ): Promise<{ success: boolean; resized?: string }> {
    const directoryPath = path.dirname(newPath);

    // Проверяем существование директории
    if (!fs.existsSync(directoryPath)) {
      // Если директории нет, создаем её
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      gm(buffer)
        .resize(300)
        .write(newPath, (err) => {
          if (err) {
            reject({ success: false, errorMsg: err.message });
          } else {
            resolve({ success: true, resized: newPath });
          }
        });
    });
  }

  private remove(filePath: string) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      winstonLogger.info(`The file has been successfully deleted: ${filePath}`);
    } else {
      winstonLogger.info(`The file does not exist: ${filePath} `);
    }
  }
}
