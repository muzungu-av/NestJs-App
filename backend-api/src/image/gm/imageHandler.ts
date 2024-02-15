import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as gm from 'gm';
import * as path from 'path';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { winstonLogger } from 'winston.logger';

@Injectable()
export class ImageHandler {
  private readonly readFileAsync = promisify(fs.readFile);
  private readonly dest: string;
  private readonly mini_prefix: string = 'mini_';
  constructor(private configService: ConfigService) {
    this.dest = this.configService.get<string>('MULTER_DEST');
  }

  async do(fileName: string): Promise<boolean> {
    const filePath = path.join(process.cwd(), this.dest, fileName);
    winstonLogger.info(`(ImageHandler) Work with the file begins: ${filePath}`);
    const imageFileBuffer = await this.readFileAsync(filePath);
    try {
      const identifyResult = await this.identify(imageFileBuffer);

      if (identifyResult.success) {
        winstonLogger.info(`Identification was successful`);

        const newFilePath = path.join(
          process.cwd(),
          this.dest,
          this.mini_prefix + fileName.replace(/\.[^/.]+$/, ''),
          this.mini_prefix + fileName,
        );
        const resizedResult = await this.resize(
          identifyResult.buffer,
          newFilePath,
        );
        if (resizedResult.resized !== undefined) {
          //todo  `Добавить в МОНГО: ${filePath} - ${resizedResult.resized}`,
        }
        winstonLogger.info(`The resysis was a success`);
        return true;
      } else return false;
    } catch (error) {
      winstonLogger.info(`There's been an error: ${error.errorMsg}`);
      winstonLogger.info(`Deleting the file: ${filePath}`);
      this.remove(filePath);
      return false;
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
