import { IsIn } from 'class-validator';

export class GetImagesFilterDto {
  @IsIn(['isPainting', 'isAtelier', 'isCopy'])
  typeOfImage?: string;
}
