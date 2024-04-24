export class CreateBioDto {
  imgUrl: string;
  text_bio: string;

  constructor(imgUrl: string, text_bio: string) {
    this.imgUrl = imgUrl;
    this.text_bio = text_bio;
  }
}
