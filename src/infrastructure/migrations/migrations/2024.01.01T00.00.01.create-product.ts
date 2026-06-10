import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

/**
 * Tabela `product` unificada.
 *
 * Os módulos `product-adm` (purchasePrice/stock) e `store-catalog` (salePrice)
 * possuem models distintos apontando para esta MESMA tabela. Por isso o schema
 * precisa conter o superconjunto de colunas dos dois models; as colunas
 * específicas de cada contexto ficam como `allowNull: true` para que a
 * inserção parcial de cada model funcione sem erro de coluna faltante.
 */
export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("product", {
        id: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false },
        name: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.STRING(255), allowNull: false },
        purchasePrice: { type: DataTypes.NUMBER, allowNull: true },
        stock: { type: DataTypes.NUMBER, allowNull: true },
        salePrice: { type: DataTypes.NUMBER, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: true },
        updatedAt: { type: DataTypes.DATE, allowNull: true },
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("product");
};
