import { IsOptional, IsString, Matches } from 'class-validator';

export class FindAllDto {
  @IsOptional()
  @IsString()
  @Matches(/^([a-zA-Z0-9_]+,)*[a-zA-Z0-9_]+$/)
  fields?: string;
}
