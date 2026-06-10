import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("order_products", {
        id: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false },
        orderId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: { model: "orders", key: "id" },
        },
        productId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: { model: "product", key: "id" },
        },
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("order_products");
};
