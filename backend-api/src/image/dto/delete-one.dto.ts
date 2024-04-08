import { IsNotEmpty } from 'class-validator';

export class DeleteOneDto {
  @IsNotEmpty()
  uid: string;
}
