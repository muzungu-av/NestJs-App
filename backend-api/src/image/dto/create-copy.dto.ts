import { ImgFileProcessingResult } from 'image/gm/imageHandler';
import { User } from 'user/schemas/user.schema';
import { AllDimension, Dimension } from './create-image.dto';

export interface CopyAttribute {
  size?: Dimension;
  price?: number;
}

export class CreateCopyDto {
  uid: string;
  originalName: string;
  fileName: string;
  path: string;
  miniPath: string;
  miniFileName: string;
  sizeBytes: string;
  createdAt: string;
  description: string;
  name: string;
  typeOfImage: string;
  imageUrl: string;
  miniImageUrl: string;
  owner: User;
  dimension: AllDimension;
  copyAttribute: CopyAttribute[];

  constructor(
    imgFileProcessingResult: ImgFileProcessingResult,
    copyAttribute: CopyAttribute[],
  ) {
    this.uid = imgFileProcessingResult.uid;
    this.originalName = imgFileProcessingResult.originalName || '';
    this.fileName = imgFileProcessingResult.fileName || '';
    this.path = imgFileProcessingResult.path || '';
    this.miniFileName = imgFileProcessingResult.miniFileName || '';
    this.miniPath = imgFileProcessingResult.miniPath || '';
    this.sizeBytes = imgFileProcessingResult.sizeBytes?.toString() || '';
    this.createdAt = imgFileProcessingResult.createdAt?.toISOString() || '';
    this.description = imgFileProcessingResult.description || '';
    this.typeOfImage = imgFileProcessingResult.typeOfImage || '';
    this.name = imgFileProcessingResult.name || '';
    this.owner = imgFileProcessingResult.owner;
    this.dimension = imgFileProcessingResult.dimension;
    this.imageUrl = imgFileProcessingResult.imageUrl;
    this.miniImageUrl = imgFileProcessingResult.miniImageUrl;
    this.copyAttribute = copyAttribute;
  }
}
