import { User } from 'user/schemas/user.schema';

export class CreateVideoDto {
  name: string;
  imgUrl: string;
  link: string;
  owner: User;

  constructor(name: string, imgUrl: string, link: string, owner: User) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.link = link;
    this.owner = owner;
  }
}
