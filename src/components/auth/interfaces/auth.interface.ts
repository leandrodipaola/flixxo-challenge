import { RoleType } from "../../user/utils/Enums";


export interface PayloadToken {
  role: RoleType;
  sub: string;
}
