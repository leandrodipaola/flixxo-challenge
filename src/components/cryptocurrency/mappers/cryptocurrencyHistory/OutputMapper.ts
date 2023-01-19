import { CryptocurrencyDTO } from "../../dto/cryptocurrency/cryptocurrencyOutput.dto";
import { CryptocurrencyHistoryDTO } from "../../dto/cryptocurrencyHistory/cryptocurrencyHistoryOutput.dto";
import { Cryptocurrency } from "../../entities/cryptocurrency.entity";
import { CryptocurrencyHistory } from "../../entities/cryptocurrencyHistory.entity";

export class OutputMapper {
  public static parseToCryptocurrencyDTO(cryptocurrency: CryptocurrencyHistory): CryptocurrencyHistoryDTO {
    return new CryptocurrencyHistoryDTO({
      id: cryptocurrency.id,
      price: cryptocurrency.price,
      cryptocurrencyId: cryptocurrency.cryptocurrencyId,
      date: new Date(cryptocurrency.createdAt)
    });
  }

  public static parseToArrayCryptocurrencyHistoryDTO(cryptocurrenciesHistory: CryptocurrencyHistory[]): CryptocurrencyDTO[] {
    return cryptocurrenciesHistory.map((ch) => {
      return this.parseToCryptocurrencyDTO(ch);
    });
  }

}