import { IsDefined, IsNumber } from "class-validator";
import { BaseDTO } from "../../../../config/base.dto";

export class CryptocurrencyHistoryDTO extends BaseDTO {

    @IsNumber()
    @IsDefined()
    price!: number;

    @IsNumber()
    @IsDefined()
    cryptocurrencyId!: number;
  
    constructor(cryptocurrencyHistoryDTO: Partial<CryptocurrencyHistoryDTO>) {
      super();
      Object.assign(this, cryptocurrencyHistoryDTO);
    }
  
  }