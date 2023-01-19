import { CryptocurrencyDTO, CryptocurrencyUpdateDTO } from "../../dto/cryptocurrency/cryptocurrencyInput.dto";

export class InputMapper {

    public static parseToCryptocurrencyDTO(cryptocurrency: any, userId: number): CryptocurrencyDTO {
        const newCryptocurrency = new CryptocurrencyDTO({
            ...cryptocurrency,
            userId: userId
        });

        return newCryptocurrency;
    }

    public static parseToCryptocurrencyUpdateDTO(cryptocurrency: any): CryptocurrencyUpdateDTO {
        const newCryptocurrency = new CryptocurrencyUpdateDTO({
            ...cryptocurrency
        });

        return newCryptocurrency;
    }
}