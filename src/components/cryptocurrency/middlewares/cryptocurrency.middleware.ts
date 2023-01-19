import { validate } from "class-validator";
import {decode} from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { CryptocurrencyService } from "../services/cryptocurrency.service";
import { InputMapper } from "../mappers/cryptocurrency/InputMapper";
import { CryptocurrencyDTO, CryptocurrencyUpdateDTO } from "../dto/cryptocurrency/cryptocurrencyInput.dto";

export class CryptocurrencyMiddleware extends SharedMiddleware {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService = new CryptocurrencyService()) {
    super();
  }

  async cryptoCreateValidator(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.body.userId);
    const cryptoInputDTO: CryptocurrencyDTO = InputMapper.parseToCryptocurrencyDTO(
      this.cryptocurrencyCreateUpdateParams(req), userId
    );
    const errors = await validate(cryptoInputDTO);

    if (errors.length > 0) {
      return this.httpResponse.UnprocessableEntity(res, errors);
    }
    req.body.data = cryptoInputDTO;
    next()
  };

  async cryptoUpdateValidator(req: Request, res: Response, next: NextFunction) {
    const cryptoInputDTO: CryptocurrencyUpdateDTO = InputMapper.parseToCryptocurrencyUpdateDTO(
      this.cryptocurrencyCreateUpdateParams(req)
    );
    const errors = await validate(cryptoInputDTO);

    if (errors.length > 0) {
      return this.httpResponse.UnprocessableEntity(res, errors);
    }
    req.body.data = cryptoInputDTO;
    next()
  };


  async checkCryptocurrencyOwnership(req: Request, res: Response, next: NextFunction) {
    const cryptocurrency = await this.cryptocurrencyService.findCryptoById(parseInt(req.params.id))
    if (!cryptocurrency) { return this.httpResponse.NotFound(res, "Cryptocurrency not found"); }
    if (req.body.userId === cryptocurrency.id.toString() || req.body.role === "ADMIN") {
      next();
    } else {
      return this.httpResponse.Unauthorized(res, "Invalid user credentials");
    }
  }

  private cryptocurrencyCreateUpdateParams(req: Request): any {
    const { coinName,
      symbol,
      price,
      description, } =
      req.body
    return {
      coinName,
      symbol,
      price,
      description,
    }
  }
}