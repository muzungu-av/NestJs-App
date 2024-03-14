import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as gm from 'gm';
import * as path from 'path';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { winstonLogger } from 'winston.logger';
import { CryptoHash } from 'image/crypto/crypto';
import { UserService } from 'user/user.service';
import { User } from 'user/schemas/user.schema';
import { AllDimension, Dimension } from 'image/dto/createImageDto';

export interface ImgFileProcessingResult {
  uid?: string;
  success: boolean;
  originalName?: string;
  fileName?: string;
  path?: string;
  miniFileName?: string;
  miniPath?: string;
  sizeBytes?: number;
  createdAt?: Date;
  description?: string;
  imageUrl?: string;
  miniImageUrl?: string;
  errorMessage?: string;
  owner: User;
  dimension?: AllDimension;
}

@Injectable()
export class ImageHandler {
  private readonly readFileAsync = promisify(fs.readFile);
  private readonly dest: string;
  private readonly mini_prefix: string = 'mini_';
  constructor(
    private configService: ConfigService,
    private crypto: CryptoHash,
    private userService: UserService,
  ) {
    this.dest = this.configService.get<string>('MULTER_DEST');
  }

  private getImageSize = (path): Promise<Dimension> => {
    return new Promise((resolve, reject) => {
      gm(path).size((err, size) => {
        if (err) {
          reject(err);
        } else {
          resolve(size);
        }
      });
    });
  };

  async do(
    userId: string,
    file: Express.Multer.File,
  ): Promise<ImgFileProcessingResult> {
    const originalFileName = file.originalname; // see MulterConfigService
    const newFileName = file.filename;
    const filePath = path.join(process.cwd(), this.dest, newFileName); // from MulterConfigService

    const miniFilePath = path.join(
      process.cwd(),
      this.dest,
      this.mini_prefix + newFileName.replace(/\.[^/.]+$/, ''),
      this.mini_prefix + newFileName,
    );

    const miniFileName = this.mini_prefix + newFileName;

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

    const owner = await this.userService
      .findOneById(userId)
      .then((user: User | null) => {
        return user;
      });
    winstonLogger.info(
      `The user uploading the picture was found: ${JSON.stringify(owner.email)}`,
    );
    const result: ImgFileProcessingResult = {
      owner: owner,
      success: false,
    };

    const basicDimension: Dimension = (await this.getImageSize(filePath)
      .then((size) => {
        return { width: size.width, height: size.height };
      })
      .catch((err) => {
        winstonLogger.error(`Error when retrieving image dimensions: ${err}`);
      })) as Dimension;

    try {
      const identifyResult = await this.identify(imageFileBuffer);
      if (identifyResult.success) {
        winstonLogger.info(`Identification was successful`);

        await this.resize(identifyResult.buffer, miniFilePath);

        const mini_size = (await this.getImageSize(miniFilePath)
          .then((size) => {
            return { width: size.width, height: size.height };
          })
          .catch((err) => {
            winstonLogger.error(
              `Error when retrieving image dimensions: ${err}`,
            );
          })) as Dimension;

        winstonLogger.info(`The resizing was successful`);

        result.uid = uid;
        result.originalName = originalFileName;
        result.fileName = newFileName;
        result.path = filePath;
        result.miniFileName = miniFileName;
        result.miniPath = miniFilePath;
        result.sizeBytes = fileSize;
        result.createdAt = new Date();
        result.success = true;
        result.imageUrl = undefined; //Promises<string>
        result.miniImageUrl = undefined; //Promises<string>
        result.dimension = { basic: basicDimension, mini: mini_size };
        return result;
      } else {
        winstonLogger.info(`Identification wasn't successful`);
        return result;
      }
    } catch (error) {
      winstonLogger.error(`There's been an error: ${error.errorMsg}`);
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
  ): Promise<{ success: boolean; resizedPath?: string }> {
    const directoryPath = path.dirname(newPath);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      gm(buffer)
        .resize(300)
        .write(newPath, (err) => {
          if (err) {
            reject({ success: false, errorMsg: err.message });
          } else {
            resolve({ success: true, resizedPath: newPath });
          }
        });
    });
  }

  public remove(filePath: string) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      winstonLogger.info(`The file has been successfully deleted: ${filePath}`);
    } else {
      winstonLogger.info(`The file does not exist: ${filePath} `);
    }
  }

  public removeDir(filePath: string) {
    try {
      const directoryPath = path.dirname(filePath);
      // Delete directory synchronously and recursively
      fs.rmdirSync(directoryPath, { recursive: true });
      winstonLogger.info(`Directory successfully deleted ${directoryPath}`);
    } catch (err) {
      winstonLogger.error(`Error when deleting a directory: ${err.message}`);
    }
  }
}
