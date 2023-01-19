import { BaseDTO } from "../../../../config/base.dto";

export class CryptocurrencyDTO extends BaseDTO {

    coinName?: string;
    symbol?: string;
    price?: number;
    description?: string;

    constructor(cryptocurrencyDTO: Partial<CryptocurrencyDTO>) {
    super();
      Object.assign(this, cryptocurrencyDTO);
    }
  }