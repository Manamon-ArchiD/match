import { MikroORM } from "@mikro-orm/postgresql";
import mikroOrmConfig from './mikro-orm.config';
import { db } from "../models";
import { SeedManager } from "@mikro-orm/seeder";
import { defineConfig } from "@mikro-orm/sqlite";

export const initializeDatabaseConnection = async (
    environment: NodeJS.ProcessEnv,
    useMemoryDB : boolean = false
) => {
    try {
        if (useMemoryDB) {
            console.log("🐘 Initializing Memory Database...");

            return MikroORM.init(
                defineConfig({
                    dbName: ':memory:',
                    entities: [db.match],
                    extensions: [SeedManager],
                })
            );
        } else {
            console.log("🐘 Initializing PostgreSQL Database...");

            return await MikroORM.init({
                ...mikroOrmConfig,
            });
        }
    } catch (error) {
        console.log(error);
        throw new Error("Database connection error.");
    }
};