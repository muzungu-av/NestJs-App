export interface Dimension {
  width: number;
  height: number;
}
export interface AllDimension {
  basic?: Dimension;
  mini?: Dimension;
}
export interface User {
  username: string;
  email: string;
  password: string;
}
interface CreateImageDto {
  uid: string;
  originalName: string;
  fileName: string;
  path: string;
  miniPath: string;
  miniFileName: string;
  sizeBytes: string;
  createdAt: string;
  description: string;
  name: string;
  typeOfImage: string;
  imageUrl: string;
  miniImageUrl: string;
  owner: User;
  dimension: AllDimension;
}
