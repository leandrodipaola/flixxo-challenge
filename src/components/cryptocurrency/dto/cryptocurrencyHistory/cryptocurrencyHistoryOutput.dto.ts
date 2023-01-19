import { BaseDTO } from "../../../../config/base.dto";

export class CryptocurrencyHistoryDTO extends BaseDTO {

    price?: number;
    cryptocurrencyId?: number;
    date?: Date;
  
    constructor(cryptocurrencyHistoryDTO: Partial<CryptocurrencyHistoryDTO>) {
      super();
      Object.assign(this, cryptocurrencyHistoryDTO);
    }
  
  }