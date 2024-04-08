import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetForBlockDto {
  @IsInt()
  count: number;

  @IsOptional()
  @IsString()
  fields?: string;
}
