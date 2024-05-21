import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from '../image/schemas/image.schema';
import { v2 } from 'cloudinary';
import { winstonLogger } from 'winston.logger';
import { Copy } from 'image/schemas/copy.schema';

@Injectable()
export class CloudinaryService {
  cloudinary: typeof v2;
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    @InjectModel(Copy.name) private readonly copyeModel: Model<Copy>,
  ) {
    this.cloudinary = v2;
    this.cloudinary.config({
      secure: true,
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    });

    winstonLogger.info(
      `Cloudinary.config = ${JSON.stringify(this.cloudinary.config())}`,
    );
  }

  public async upload(
    userId: string,
    file: string,
    fileName: string,
  ): Promise<string> {
    winstonLogger.info(
      `Uploading images ${file} to Cloudinary, user id: ${userId}`,
    );
    let secure_url = undefined;
    try {
      const f = fileName.replace(/\.[^/.]+$/, '');
      // const f = 'thumbnail_'.concat(fileName.replace(/\.[^/.]+$/, ''));
      await this.cloudinary.uploader.upload(
        file,
        { public_id: f, folder: userId },
        (error, result) => {
          if (error) {
            winstonLogger.error(error);
          } else {
            secure_url = result.secure_url;
            winstonLogger.info(`Succesful. URL = ${result.secure_url}`);
          }
        },
      );

      return secure_url;
    } catch (error) {
      winstonLogger.error(
        `Error when loading an image: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  public async delete(cloudinaryPath: string): Promise<any> {
    return this.cloudinary.api.delete_resources([cloudinaryPath], {
      type: 'upload',
      resource_type: 'image',
    });
  }
  public async deleteAllBioImg(prefix: string): Promise<any> {
    return this.cloudinary.api.delete_resources_by_prefix(prefix);
  }
}
// ОТВЕТ CLOUDINARY
// {"api_key":"149313672292296",
// "asset_id":"18e57281d0defff0d41a1e110fa73be7",
// "bytes":124405,
// "created_at":"2024-02-22T13:58:05Z",
// "etag":"3c428a3857ec6cf6dace9ec6ecd344fa",
// "folder":"",
// "format":"jpg",
// "height":842,
// "original_filename":"1708610284453_000123",
// "placeholder":false,
// "public_id":"1708610284453_000123",
// "resource_type":"image",
// "secure_url":"https://res.cloudinary.com/halt-paints/image/upload/v1708610285/1708610284453_000123.jpg",
// "signature":"237c2857e7679928296841e4dec094f0f78877cc",
// "tags":[],
// "type":"upload",
// "url":"http://res.cloudinary.com/halt-paints/image/upload/v1708610285/1708610284453_000123.jpg",
// "version":1708610285,
// "version_id":"2ba816b9e0c1e81dfe01b985bc90fd4f",
// "width":700}
