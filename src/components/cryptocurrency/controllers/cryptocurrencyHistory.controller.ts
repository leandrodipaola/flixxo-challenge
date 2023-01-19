import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { OutputMapper } from "../mappers/cryptocurrencyHistory/OutputMapper";
import { CryptocurrencyHistoryService } from "../services/cryptocurrencyHistory.service";


export class CryptocurrencyHistoryController {
  constructor(
    private readonly cryptocurrencyHistoryService: CryptocurrencyHistoryService = new CryptocurrencyHistoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) { }

  async getCryptocurrencyHistoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.cryptocurrencyHistoryService.findAllHistoryById(parseInt(id));

      if (!data) {
        return this.httpResponse.NotFound(res, "Cryptocurrency History not found");
      }
      const result = OutputMapper.parseToArrayCryptocurrencyHistoryDTO(data)
      return this.httpResponse.Ok(res, result);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
