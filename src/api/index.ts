import { join } from "path";
import { Sequelize } from "sequelize-typescript";
import { app } from "./express";
import { models } from "./models";
import { migrator } from "../infrastructure/migrations/config/migrator";

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: join(__dirname, "../../database.sqlite"),
        logging: false,
    });

    sequelize.addModels(models);
    await migrator(sequelize).up();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

bootstrap().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
});
