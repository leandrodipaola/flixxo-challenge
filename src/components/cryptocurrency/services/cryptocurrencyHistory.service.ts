import { EntityManager, QueryRunner } from "typeorm";
import { BaseService } from "../../../config/base.service";
import { AppDataSource } from "../../../config/data.source";
import { CryptocurrencyHistoryDTO } from "../dto/cryptocurrencyHistory/cryptocurrencyHistoryInput.dto";
import { CryptocurrencyHistory } from "../entities/cryptocurrencyHistory.entity";
export class CryptocurrencyHistoryService extends BaseService<CryptocurrencyHistory> {
    constructor() {
        super(CryptocurrencyHistory);
    }

    async findAllHistoryById(
        id: number,
    ): Promise<CryptocurrencyHistory[] | null> {
        const history = (await this.execRepository)
            .createQueryBuilder("cryptocurrency_history")
            .where({ cryptocurrencyId: id }).orderBy("created_at", "DESC").getMany()

        return history;
    }

    async addToHistory(body: CryptocurrencyHistoryDTO, manager: EntityManager): Promise<CryptocurrencyHistory | undefined> {
        const newCrypto = manager.getRepository(CryptocurrencyHistory).create(body);
        const result = await manager.getRepository(CryptocurrencyHistory).save(newCrypto);
        return result
    }
}

