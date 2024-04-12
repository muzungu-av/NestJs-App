import { User } from 'user/schemas/user.schema';

export class CreateVideoDto {
  name: string;
  link: string;
  owner: User;

  constructor(name: string, link: string, owner: User) {
    this.name = name;
    this.link = link;
    this.owner = owner;
  }
}
