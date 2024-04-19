import { User } from 'user/schemas/user.schema';

export class CreateVideoDto {
  name: string;
  imgUrl: string;
  link: string;
  owner: User;
  description: string;
  fileName: string;

  constructor(
    name: string,
    imgUrl: string,
    link: string,
    owner: User,
    description: string,
    fileName: string,
  ) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.link = link;
    this.owner = owner;
    this.description = description;
    this.fileName = fileName;
  }
}
