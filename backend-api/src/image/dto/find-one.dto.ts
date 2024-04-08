import { IsOptional, IsString } from 'class-validator';

export class FindOneDto {
  @IsOptional()
  @IsString()
  fields?: string;
}
