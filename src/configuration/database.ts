import { MikroORM } from "@mikro-orm/postgresql";
import { db } from "../models";

export const initializeDatabaseConnection = async (environment: NodeJS.ProcessEnv) => {
    try {

        const orm = await MikroORM.init({
            host: environment.DB_HOST,
            port: parseInt(environment.DB_PORT),
            dbName: environment.DB_NAME,
            user: environment.DB_USER,
            password: environment.DB_PASSWORD,
            entities: [db.match]
        });

        console.log("🐘 Database successfully connected");
        return orm;
    } catch (error) {
        console.log(error);
        throw new Error("Database connection error.");
    }
};