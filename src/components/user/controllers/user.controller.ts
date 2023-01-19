import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { OutputMapper } from "../mappers/OutputMapper";
import { UserDTO } from "../dto/userInput.dto";
import { User } from "../entities/user.entity";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) { }

  async createUser(req: Request, res: Response) {
    try {
      const data: UserDTO = req.body.data
      console.log(data)

      const existsEmail = await this.userService.findByEmail(data.email!);
      const existsUsername = await this.userService.findByUsername(data.username!);
      if (existsEmail || existsUsername) {
        return this.httpResponse.UnprocessableEntity(res, "Existing user")
      }

      const result = await this.userService.createUser(data);
      const response = OutputMapper.parseToUserDTO(result)
      return res.send(response)
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e)
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.findAllUser();

      if (users.length === 0) {
        return this.httpResponse.NotFound(res, "Users not found.");
      }
      const response = OutputMapper.parseToArrUserDTO(users)

      return this.httpResponse.Ok(res, response);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserById(parseInt(id));
      if (!data) {
        return this.httpResponse.NotFound(res, "User not found");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }



  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updateParams = req.body.data
      const user = await this.userService.findUserById(parseInt(id));
      if (!user) {
        return this.httpResponse.NotFound(res, "User not found");
      }
      const data: UpdateResult = await this.userService.updateUser(
        id,
        updateParams
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error while updating user");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updatePassword(req: Request, res: Response) {
    const { userId } = req.params
    const { password } = req.body.data
    try {
      if (userId) {
        const data: UpdateResult = await this.userService.updatePassword(
          userId,
          password
        );
        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Error while updating password");
        }
        return this.httpResponse.Ok(res, data);
      }else{
        return this.httpResponse.NotFound(res, "Error while updating password");
      }
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.userService.deleteUser(parseInt(id));
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error while deleting user");
      }
      return this.httpResponse.Ok(res, { message: "Deleted successfully" });
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

}
