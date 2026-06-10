import {ModelCtor, Sequelize} from "sequelize-typescript";

const initSequelize = (models: ModelCtor[]) => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels(models);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
};

export default initSequelize;