import { CryptocurrencyDTO } from "../../dto/cryptocurrency/cryptocurrencyOutput.dto";
import { Cryptocurrency } from "../../entities/cryptocurrency.entity";

export class OutputMapper {
    public static parseToCryptocurrencyDTO(cryptocurrency: Cryptocurrency): CryptocurrencyDTO {
        return new CryptocurrencyDTO({
            id: cryptocurrency.id,
            coinName: cryptocurrency.coinName,
            symbol: cryptocurrency.symbol,
            price: cryptocurrency.price,
            description: cryptocurrency.description,
            updatedAt: cryptocurrency.updatedAt,
            createdAt: cryptocurrency.createdAt
        });
    }

    public static parseToArrayCommissionDTO(cryptocurrencies: Cryptocurrency[]): CryptocurrencyDTO[] {
        return cryptocurrencies.map((c) => {
          return this.parseToCryptocurrencyDTO(c);
        });
      }

}