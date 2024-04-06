import { ImgFileProcessingResult } from 'image/gm/imageHandler';
import { User } from 'user/schemas/user.schema';

export interface Dimension {
  width: number;
  height: number;
}

export interface AllDimension {
  basic?: Dimension;
  mini?: Dimension;
}

export class CreateImageDto {
  uid: string;
  originalName: string;
  fileName: string;
  path: string;
  miniPath: string;
  miniFileName: string;
  sizeBytes: string;
  createdAt: string;
  description: string;
  typeOfImage: string;
  imageUrl: string;
  owner: User;
  dimension: AllDimension;

  constructor(imgFileProcessingResult: ImgFileProcessingResult) {
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
    this.owner = imgFileProcessingResult.owner;
    this.dimension = imgFileProcessingResult.dimension;
  }
}
