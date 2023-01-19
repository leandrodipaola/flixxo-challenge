import { DeleteResult, getConnection, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base.service";


import { Cryptocurrency } from "../entities/cryptocurrency.entity";
import { CryptocurrencyDTO } from "../dto/cryptocurrency/cryptocurrencyInput.dto";
import { InputMapper as InputMapperCryptocurrencyHistory } from "../mappers/cryptocurrencyHistory/InputMapper";
import { AppDataSource } from "../../../config/data.source";
import { CryptocurrencyHistoryService } from "./cryptocurrencyHistory.service";
import { CryptocurrencyHistory } from "../entities/cryptocurrencyHistory.entity";
export class CryptocurrencyService extends BaseService<Cryptocurrency> {
  constructor(private readonly cryptocurrencyHistoryService: CryptocurrencyHistoryService = new CryptocurrencyHistoryService()) {
    super(Cryptocurrency);
  }

  async findAllCryptos(): Promise<Cryptocurrency[]> {
    return (await this.execRepository).find();
  }
  async findCryptoById(id: number): Promise<Cryptocurrency | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findCryptoBySymbol(symbol: string): Promise<Cryptocurrency | null> {
    return (await this.execRepository).findOneBy({ symbol });
  }

  async findCryptoByName(coinName: string): Promise<Cryptocurrency | null> {
    return (await this.execRepository).findOneBy({ coinName });
  }


  async createCrypto(crypto: CryptocurrencyDTO): Promise<Cryptocurrency | undefined> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const entityManager = queryRunner.manager
      const newCrypto = entityManager.getRepository(Cryptocurrency).create(crypto);
      const cryptocurrency = await entityManager.getRepository(Cryptocurrency).save(newCrypto);
      const cryptocurrencyHistoryDTO = InputMapperCryptocurrencyHistory.parseToCryptocurrencyHistoryDTO(cryptocurrency)
      const resultHistory = await this.cryptocurrencyHistoryService.addToHistory(cryptocurrencyHistoryDTO, entityManager)
      await queryRunner.commitTransaction();
      return cryptocurrency
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateCrypto(cryptocurrency: Cryptocurrency,cryptocurrencyInputDTO: CryptocurrencyDTO): Promise<Cryptocurrency | undefined> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const entityManager = queryRunner.manager
      const { coinName, description, price, symbol, ...autoMapperProperties } =
        cryptocurrencyInputDTO;
      Object.assign(cryptocurrency, autoMapperProperties);
      cryptocurrency.coinName = coinName;
      cryptocurrency.description = description;
      cryptocurrency.price = price;
      cryptocurrency.symbol = symbol;
      const cryptocurrencyResult = await entityManager.getRepository(Cryptocurrency).save(cryptocurrency);
      const cryptocurrencyHistoryDTO = InputMapperCryptocurrencyHistory.parseToCryptocurrencyHistoryDTO(cryptocurrencyResult)
      const resultHistory = this.cryptocurrencyHistoryService.addToHistory(cryptocurrencyHistoryDTO, entityManager)
      await queryRunner.commitTransaction()
      return cryptocurrency
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      return undefined
    } finally {
      await queryRunner.release();
    }
  }

  async deleteCrypto(id: number): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

}

