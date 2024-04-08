import { IsEmpty } from 'class-validator';

export class DocumentCountDto {
  @IsEmpty()
  emptyField: string;
}
