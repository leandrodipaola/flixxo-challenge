import { CryptocurrencyHistoryController } from "../controllers/cryptocurrencyHistory.controller";
import { BaseRouter } from "../../../config/router/router";
import { CryptocurrencyMiddleware } from "../middlewares/cryptocurrency.middleware";
export class CryptocurrencyHistoryRouter extends BaseRouter<CryptocurrencyHistoryController, CryptocurrencyMiddleware> {
    constructor() {
        super(CryptocurrencyHistoryController, CryptocurrencyMiddleware);
    }

    async routes(): Promise<void> {

        this.router.get(
            "/cryptocurrencies/history/crypto/:id",
            (req, res) => this.controller.getCryptocurrencyHistoryById(req, res)
        );


    }
}
