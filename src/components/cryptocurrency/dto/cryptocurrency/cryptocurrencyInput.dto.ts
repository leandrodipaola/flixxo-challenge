import { MaxLength, MinLength,IsString, IsDefined, IsNumber, IsOptional } from "class-validator";
import { BaseDTO } from "../../../../config/base.dto";
import { IsNotBlank } from "../../../shared/validators/IsNotBlankValidator";
import { IsUniqLower } from "../../../shared/validators/UniqueLowerValidator";
import { CryptocurrencySettings } from "../../utils/Constants";

export class CryptocurrencyDTO extends BaseDTO {

    @IsNotBlank()
    @IsDefined()
    @IsString()
    @MinLength(CryptocurrencySettings.MIN_COINNAME_LENGTH)
    @MaxLength(CryptocurrencySettings.MAX_COINNAME_LENGTH)
    coinName!: string;

    @IsNotBlank()
    @IsDefined()
    @IsString()
    @MinLength(CryptocurrencySettings.MIN_SYMBOL_LENGTH)
    @MaxLength(CryptocurrencySettings.MAX_SYMBOL_LENGTH)
    symbol!: string;

    @IsNumber()
    @IsDefined()
    price!: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDefined()
    @IsNumber()
    userId?: number;


  
    constructor(cryptocurrencyDTO: Partial<CryptocurrencyDTO>) {
      super();
      Object.assign(this, cryptocurrencyDTO);
    }
  
  }

export class CryptocurrencyUpdateDTO extends BaseDTO {


    @IsOptional()
    @IsString()
    @MinLength(CryptocurrencySettings.MIN_COINNAME_LENGTH)
    @MaxLength(CryptocurrencySettings.MAX_COINNAME_LENGTH)
    coinName?: string;

    @IsOptional()
    @IsString()
    @MinLength(CryptocurrencySettings.MIN_SYMBOL_LENGTH)
    @MaxLength(CryptocurrencySettings.MAX_SYMBOL_LENGTH)
    symbol?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    description?: string;
  
    constructor(cryptocurrencyDTO: Partial<CryptocurrencyUpdateDTO>) {
      super();
      Object.assign(this, cryptocurrencyDTO);
    }
  
  }


