import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import passport from "passport";
import { User} from "../../user/entities/user.entity";
import { RoleType } from "../../user/utils/Enums";
import { HttpResponse } from "../response/http.response";

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
  passAuth(type: string) {
    return passport.authenticate(type, { session: false });
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as User;
    if (user.role !== RoleType.ADMIN) {
      return this.httpResponse.Unauthorized(res, "Unauthorized");
    }
    return next();
  }

  async checkAuthenticate(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const info = decode(headerToken.split(" ")[1]);
      if (!info!.sub) {
        return this.httpResponse.Unauthorized(res, "Invalid token");
      } else {
        req.body.userId = info!["sub"] as string;
        req.body.role = info!["role"]
        next()
      }
    } else {
      return this.httpResponse.Unauthorized(res, "Not authenticated");
    }
  }
}
