import { SequelizeStorage, Umzug } from "umzug";
import { Sequelize } from "sequelize";
import { join } from "path";

/**
 * Cria a instância do Umzug responsável por aplicar/reverter as migrations.
 *
 * As migrations são a estratégia adotada para resolver o conflito de tabela
 * entre os módulos `product-adm` e `store-catalog`: ambos os models apontam
 * para a mesma tabela `product`, então quem cria o schema é a migration
 * (com todas as colunas), e não o `sync()` de cada model isoladamente.
 */
export const migrator = (sequelize: Sequelize) => {
    return new Umzug({
        migrations: {
            glob: [
                "migrations/*.{js,ts}",
                {
                    cwd: join(__dirname, "../"),
                    ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"],
                },
            ],
        },
        context: sequelize,
        storage: new SequelizeStorage({ sequelize }),
        logger: undefined,
    });
};

export type Migrator = ReturnType<typeof migrator>;
