import { join } from "path";
import { Sequelize } from "sequelize";
import { migrator } from "./migrator";

/**
 * Runner de linha de comando para aplicar as migrations contra um banco
 * SQLite em arquivo. Uso: `npm run migrate -- up` / `npm run migrate -- down`.
 */
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: join(__dirname, "../../../../database.sqlite"),
    logging: true,
});

migrator(sequelize).runAsCLI();
