import { IsIn } from 'class-validator';

export class GetImagesFilterDto {
  @IsIn(['isPainting', 'isAtelier'])
  typeOfImage?: string;
}
