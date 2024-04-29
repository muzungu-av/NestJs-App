import { IsString } from 'class-validator';

export class DeleteOneDto {
  @IsString()
  fileName: string;

  @IsString()
  id: string;
}
