import { IsIn, IsOptional, IsString } from 'class-validator';

export class GetImagesFilterDto {
  @IsOptional()
  @IsIn(['isPainting', 'isAtelier', 'isCopy'])
  typeOfImage?: string;
  @IsOptional()
  @IsString()
  fields?: string;
}
