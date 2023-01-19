import { Request, Response } from "express";

import { HttpResponse } from "../../shared/response/http.response";
import { OutputMapper } from "../mappers/cryptocurrency/OutputMapper";
import { CryptocurrencyService } from "../services/cryptocurrency.service";
import { CryptocurrencyDTO } from "../dto/cryptocurrency/cryptocurrencyInput.dto";
import { Cryptocurrency } from "../entities/cryptocurrency.entity";
import { DeleteResult } from "typeorm";

export class CryptocurrencyController {
  constructor(
    private readonly cryptocurrencyService: CryptocurrencyService = new CryptocurrencyService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) { }

  async createCryptocurrency(req: Request, res: Response) {
    try {
      const data: CryptocurrencyDTO = req.body.data
      console.log(data)
      const existSymbol = await this.cryptocurrencyService.findCryptoByName(data.coinName!);
      const existsName = await this.cryptocurrencyService.findCryptoBySymbol(data.symbol!);
      if (existSymbol || existsName) {
        return this.httpResponse.UnprocessableEntity(res, "Existing cryptocurrency")
      }
      const result = await this.cryptocurrencyService.createCrypto(data);
      if (!result) {
        return this.httpResponse.Error(res, "Error creating Crypto")
      }
      const response = OutputMapper.parseToCryptocurrencyDTO(result)
      return res.send(response)
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e)
    }
  }

  async getCryptocurrencies(req: Request, res: Response) {
    try {
      const cryptocurrencys = await this.cryptocurrencyService.findAllCryptos();

      if (cryptocurrencys.length === 0) {
        return this.httpResponse.NotFound(res, "cryptocurrencies not found.");
      }
      const response = OutputMapper.parseToArrayCommissionDTO(cryptocurrencys)

      return this.httpResponse.Ok(res, response);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getCryptocurrencyById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.cryptocurrencyService.findCryptoById(parseInt(id));

      if (!data) {
        return this.httpResponse.NotFound(res, "cryptocurrency not found");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }


  async updateCryptocurrency(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cryptocurrencyInputDTO = req.body.data
      const cryptocurrency = await this.cryptocurrencyService.findCryptoById(parseInt(id));
      if (!cryptocurrency) {
        return this.httpResponse.NotFound(res, "cryptocurrency not found");
      }
      const data = await this.cryptocurrencyService.updateCrypto(
        cryptocurrency,
        cryptocurrencyInputDTO
      );
      if (!data) {
        return this.httpResponse.NotFound(res, "Error while updating cryptocurrency");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteCryptocurrency(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.cryptocurrencyService.deleteCrypto(parseInt(id));
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error while deleting cryptocurrency");
      }
      return this.httpResponse.Ok(res, { message: "Deleted successfully" });
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

}
