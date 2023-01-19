import { validate } from "class-validator";
import { decode } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserDTO, UserUpdateDTO, UserUpdatePasswordDTO, UserUpdateRoleDTO } from "../dto/userInput.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { UserService } from "../services/user.service";
import { InputMapper } from "../mappers/InputMapper";

export class UserMiddleware extends SharedMiddleware {
  constructor(private readonly userService: UserService = new UserService()) {
    super();
  }
  async userCreateValidator(req: Request, res: Response, next: NextFunction) {
    const userInputDTO: UserDTO = InputMapper.parseToUserDTO(
      this.userCreateParams(req)
    );
    const errors = await validate(userInputDTO);

    if (errors.length > 0) {
      return this.httpResponse.UnprocessableEntity(res, errors);
    }
    req.body.data = userInputDTO;
    next()
  }

  async userUpdateValidator(req: Request, res: Response, next: NextFunction) {
    const userInputDTO: UserUpdateDTO = InputMapper.parseToUserUpdateDTO(
      this.userUpdateParams(req)
    );
    const errors = await validate(userInputDTO);

    if (errors.length > 0) {
      return this.httpResponse.UnprocessableEntity(res, errors);
    }
    req.body.data = userInputDTO;
    next()
  }

  async userUpdateRoleValidator(req: Request, res: Response, next: NextFunction) {
    const userInputDTO: UserUpdateRoleDTO = InputMapper.parseToUserUpdateRoleDTO(
      this.userUpdateRoleParams(req)
    );
    const errors = await validate(userInputDTO);

    if (errors.length > 0) {
      return this.httpResponse.UnprocessableEntity(res, errors);
    }
    req.body.data = userInputDTO;
    next()
  }

  async userUpdatePasswordValidator(req: Request, res: Response, next: NextFunction) {
    const userInputDTO: UserUpdatePasswordDTO = InputMapper.parseToUserUpdatePasswordDTO(
      this.userUpdatePasswordParams(req)
    );
    const errors = await validate(userInputDTO);

    if (errors.length > 0) {
      return this.httpResponse.UnprocessableEntity(res, errors);
    }
    req.body.data = userInputDTO;
    next()
  }

  compareIdUser(req: Request, res: Response, next: NextFunction) {
    const paramId = req.params.id;
    const token = req.headers.authorization;
    if (!token) { return this.httpResponse.Unauthorized(res, "Invalid user credentials") }
    const info = decode(token.split(" ")[1]);
    if (info!.sub === paramId || info!["role"] === "ADMIN") {
      next();
    } else {
      return this.httpResponse.Unauthorized(res, "Invalid user credentials");
    }

  }

  async checkTokenExpiration(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) { return this.httpResponse.Unauthorized(res, "Not authenticated"); }
    const info: any = decode(token.split(" ")[1]);

    if (info!.sub) {
      const user = await this.userService.findUserById(parseInt(info!.sub));
      if (user !== null) {
        const currentDate = new Date();
        const expiresDate = new Date(info!.exp);
        if (+expiresDate >= +currentDate / 1000) {
          req.params.userId = info!.sub
          next();
        } else {
          return this.httpResponse.Unauthorized(res, "Token expired");
        }
      } else {
        return this.httpResponse.Unauthorized(res, "Invalid Token, user not found");
      }
    }

  }

  private userCreateParams(req: Request): any {
    const { name,
      lastname,
      username,
      email,
      password,
      country,
      role, } =
      req.body
    return {
      name,
      lastname,
      username,
      email,
      password,
      country,
      role,
    }
  }

  private userUpdateParams(req: Request): any {
    const { name,
      lastname,
      country } =
      req.body
    return {
      name,
      lastname,
      country,
    }
  }

  private userUpdatePasswordParams(req: Request): any {
    const { password } =
      req.body
    return {
      password
    }
  }

  private userUpdateRoleParams(req: Request): any {
    const { role } =
      req.body
    return {
      role
    }
  }
}