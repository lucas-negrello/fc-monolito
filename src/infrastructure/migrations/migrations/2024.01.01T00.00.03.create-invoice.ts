import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("invoices", {
        id: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false },
        name: { type: DataTypes.STRING(255), allowNull: false },
        document: { type: DataTypes.STRING(255), allowNull: false },
        address_street: { type: DataTypes.STRING(255), allowNull: false },
        address_number: { type: DataTypes.STRING(255), allowNull: false },
        address_complement: { type: DataTypes.STRING(255), allowNull: false },
        address_city: { type: DataTypes.STRING(255), allowNull: false },
        address_state: { type: DataTypes.STRING(255), allowNull: false },
        address_zip_code: { type: DataTypes.STRING(255), allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false },
        updated_at: { type: DataTypes.DATE, allowNull: false },
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("invoices");
};
