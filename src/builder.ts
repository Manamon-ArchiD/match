import express, { Express } from 'express';
import { ServerApplication } from './server';
import bodyParser from 'body-parser';
import { initializeDatabaseConnection } from './configuration/database';

export default class Builder {

    constructor(private app: Express = express()) {}

    configureExpress = () => {
        this.app.use(bodyParser.json());
        return this;
    }

    configureDatabase = async () => {
        const orm = await initializeDatabaseConnection(process.env)
        const generator = orm.getSchemaGenerator();
        await generator.updateSchema();
        return this;
    }

    configureRoutes = () => {
        return this;
    }

    build = async (port: number) => {
        await this.configureDatabase();
        this.configureExpress();
        this.configureRoutes();
        return new ServerApplication(this.app, port);
    }
}