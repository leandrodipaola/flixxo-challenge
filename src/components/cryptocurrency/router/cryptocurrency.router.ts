import { BaseRouter } from "../../../config/router/router";
import { CryptocurrencyController } from "../controllers/cryptocurrency.controller";
import { CryptocurrencyMiddleware } from "../middlewares/cryptocurrency.middleware";


export class CryptocurrencyRouter extends BaseRouter<CryptocurrencyController, CryptocurrencyMiddleware> {
    constructor() {
        super(CryptocurrencyController, CryptocurrencyMiddleware);
    }

    async routes(): Promise<void> {

        this.router.post(
            "/cryptocurrencies/crypto/create",
            this.middleware.passAuth("jwt"),
            async (req, res, next) => await this.middleware.checkAuthenticate(req, res, next),
            async (req, res, next) => await this.middleware.cryptoCreateValidator(req, res, next),
            (req, res) => this.controller.createCryptocurrency(req, res)
        );

        this.router.get("/cryptocurrencies",
            (req, res) =>
                this.controller.getCryptocurrencies(req, res)
        );

        this.router.get(
            "/cryptocurrencies/crypto/:id",
            (req, res) => this.controller.getCryptocurrencyById(req, res)
        );


        this.router.put(
            "/cryptocurrencies/crypto/:id/update",
            this.middleware.passAuth("jwt"),
            async (req, res, next) => await this.middleware.checkAuthenticate(req, res, next),
            async (req, res, next) => await this.middleware.cryptoUpdateValidator(req, res, next),
            async (req, res, next) => await this.middleware.checkCryptocurrencyOwnership(req, res, next),

            (req, res) => this.controller.updateCryptocurrency(req, res)
        );

        this.router.delete(
            "/cryptocurrencies/crypto/:id/delete",
            this.middleware.passAuth("jwt"),
            async (req, res, next) => await this.middleware.checkAuthenticate(req, res, next),
            async (req, res, next) => await this.middleware.checkCryptocurrencyOwnership(req, res, next),
            (req, res) => this.controller.deleteCryptocurrency(req, res)
        );


    }
}
