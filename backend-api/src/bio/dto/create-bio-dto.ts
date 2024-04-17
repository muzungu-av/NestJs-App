export class CreateBioDto {
  name: string;
  imgUrl: string;
  text: string;

  constructor(name: string, imgUrl: string, text: string) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.text = text;
  }
}
