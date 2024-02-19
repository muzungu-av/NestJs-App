import { ImgFileProcessingResult } from 'image/gm/imageHandler';

export class CreateImageDto {
  uid: string;
  originalName: string;
  fileName: string;
  path: string;
  miniPath: string;
  sizeBytes: string;
  createdAt: string;
  description: string;

  constructor(imgFileProcessingResult: ImgFileProcessingResult) {
    this.uid = imgFileProcessingResult.uid;
    this.originalName = imgFileProcessingResult.originalName || '';
    this.fileName = imgFileProcessingResult.fileName || '';
    this.path = imgFileProcessingResult.path || '';
    this.miniPath = imgFileProcessingResult.miniPath || '';
    this.sizeBytes = imgFileProcessingResult.sizeBytes?.toString() || '';
    this.createdAt = imgFileProcessingResult.createdAt?.toISOString() || '';
    this.description = imgFileProcessingResult.description || '';
  }
}
