import { User } from "src/user/model/user.entity";

export class LoginPayloadDto {
  idUser: number;
  typeUser: string;

  constructor(user: User) {
    this.idUser = user.idUser;
    this.typeUser = user.typeUser;
  }
}