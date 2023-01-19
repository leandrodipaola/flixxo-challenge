import { BaseRouter } from "../../config/router/router";
import { UserController } from "./controllers/user.controller";
import { UserMiddleware } from "./middlewares/user.middleware";
export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware);
  }

  async routes(): Promise<void> {

    this.router.post(
      "/users/register",
      async (req, res, next) => [await this.middleware.userCreateValidator(req, res, next)],
      (req, res) => this.controller.createUser(req, res)
    );

    this.router.get("/users",
      (req, res) =>
        this.controller.getUsers(req, res)
    );

    this.router.get(
      "/users/user/:id",
      this.middleware.passAuth("jwt"), async (req, res, next) => [
        await this.middleware.checkTokenExpiration(req, res, next)
      ],
      (req, res) => this.controller.getUserById(req, res)
    );

    this.router.put(
      "/users/user/:id/update",
      this.middleware.passAuth("jwt"),
      async (req, res, next) => await this.middleware.checkTokenExpiration(req, res, next),
      (req, res, next) => this.middleware.compareIdUser(req, res, next),
      async (req, res, next) => await this.middleware.userUpdateValidator(req, res, next),
      (req, res) => this.controller.updateUser(req, res)
    );

    this.router.put(
      "/users/user/:id/update-role",
      this.middleware.passAuth("jwt"),
      async (req, res, next) => await this.middleware.checkTokenExpiration(req, res, next),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      async (req, res, next) => await this.middleware.userUpdateRoleValidator(req, res, next)
      ,
      (req, res) => this.controller.updateUser(req, res)
    );

    this.router.put(
      "/users/user/:id/change-password",
      async (req, res, next) => await this.middleware.checkTokenExpiration(req, res, next),
      (req, res, next) => this.middleware.compareIdUser(req, res, next),
      async (req, res, next) => await this.middleware.userUpdatePasswordValidator(req, res, next),
      (req, res) => this.controller.updatePassword(req, res)
    );

    this.router.delete(
      "/users/user/:id/delete",
      this.middleware.passAuth("jwt"),
      async (req, res, next) => await this.middleware.checkTokenExpiration(req, res, next),
      (req, res, next) => this.middleware.compareIdUser(req, res, next),
      (req, res) => this.controller.deleteUser(req, res)
    );


  }
}
