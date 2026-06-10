import { Sequelize } from "sequelize-typescript";
import { migrator } from "../../infrastructure/migrations/config/migrator";
import { models } from "../models";

/**
 * Sobe um banco SQLite em memória para os testes E2E da API e cria o schema
 * via migrations (Umzug) — e não via `sync()`. Esse é o ponto que resolve o
 * conflito da tabela `product` compartilhada entre `product-adm` e
 * `store-catalog`: a tabela é criada uma única vez, com todas as colunas.
 */
export default function initApiDb() {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });
        sequelize.addModels(models);
        await migrator(sequelize).up();
    });

    afterEach(async () => {
        await sequelize.close();
    });
}
