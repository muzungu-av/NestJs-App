import { IsString } from 'class-validator';

export class DeleteVideoDto {
  @IsString()
  fileName: string;

  @IsString()
  id: string;
}
