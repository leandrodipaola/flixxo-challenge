import { BaseDTO } from "../../../config/base.dto";

export class UserDTO extends BaseDTO {
    name: string;
    lastname: string;
    username: string;
    email: string;
    country?: string;
    role: string;

    constructor(userDTO: Partial<UserDTO>) {
    super();
      Object.assign(this, userDTO);
    }
  }