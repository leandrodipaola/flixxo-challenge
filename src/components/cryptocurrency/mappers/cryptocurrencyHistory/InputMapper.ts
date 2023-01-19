import { CryptocurrencyDTO, CryptocurrencyUpdateDTO } from "../../dto/cryptocurrency/cryptocurrencyInput.dto";
import { CryptocurrencyHistoryDTO } from "../../dto/cryptocurrencyHistory/cryptocurrencyHistoryInput.dto";

export class InputMapper {

    public static parseToCryptocurrencyHistoryDTO(cryptocurrency: any): CryptocurrencyHistoryDTO {
        const newCryptocurrency = new CryptocurrencyHistoryDTO({
            price: cryptocurrency.price,
            cryptocurrencyId: parseInt(cryptocurrency.id)
        });

        return newCryptocurrency;
    }

    public static parseToCryptocurrencyHistoryUpdateDTO(cryptocurrency: any): CryptocurrencyUpdateDTO {
        const newCryptocurrency = new CryptocurrencyUpdateDTO({
            ...cryptocurrency
        });

        return newCryptocurrency;
    }
}