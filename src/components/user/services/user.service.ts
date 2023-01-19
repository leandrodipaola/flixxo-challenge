import { DeleteResult, UpdateResult } from "typeorm";
import * as bcrypt from "bcrypt";
import { BaseService } from "../../../config/base.service";
import { UserDTO, UserUpdateDTO } from "../dto/userInput.dto";
import { User } from "../entities/user.entity";
import { RoleType } from "../utils/Enums";
export class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }

  async findAllUser(): Promise<User[]> {
    return (await this.execRepository).find();
  }
  async findUserById(id: number): Promise<User | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findUserWithRole(
    id: number,
    role: RoleType
  ): Promise<User | null> {
    const user = (await this.execRepository)
      .createQueryBuilder("user")
      .where({ id })
      .andWhere({ role })
      .getOne();

    return user;
  }


  async findByEmail(email: string): Promise<User | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ email })
      .getOne();
  }

  async findByUsername(username: string): Promise<User | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ username })
      .getOne();
  }

  async createUser(body: UserDTO): Promise<User> {
    const newUser = (await this.execRepository).create(body);
    const hashPass = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPass;
    return (await this.execRepository).save(newUser);
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  async updateUser(id: string, infoUpdate: UserUpdateDTO): Promise<UpdateResult> {
    const newUser = (await this.execRepository).create(infoUpdate);
    return (await this.execRepository).update(id, newUser);
  }

  async updatePassword(id: string, password: string): Promise<UpdateResult> {
    const newPass = (await this.execRepository).create({ password });
    const hashPass = await bcrypt.hash(newPass.password, 10);
    newPass.password = hashPass;
    return (await this.execRepository).update(id, newPass);
  }
}
