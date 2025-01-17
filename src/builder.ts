import swaggerJSDoc from 'swagger-jsdoc';
import express, { Express } from 'express';
import { ServerApplication } from './server';
import bodyParser from 'body-parser';
import { initializeDatabaseConnection } from './configuration/database';
import { options } from './swagger';
import swaggerUI from 'swagger-ui-express';
import { Router } from './presentation';

export default class Builder {

    constructor(private app: Express = express()) {}

    configureExpress = () => {
        this.app.use(bodyParser.json());
        return this;
    }

    configureSwagger = () => {
        const swaggerSpec = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    }

    configureDatabase = async () => {
        const orm = await initializeDatabaseConnection(process.env)
        const generator = orm.getSchemaGenerator();
        await generator.updateSchema();
        return this;
    }

    configureRoutes = () => {
        this.app.use('/api', Router);
        return this;
    }

    build = async (port: number) => {
        await this.configureDatabase();
        this.configureExpress();
        this.configureRoutes();
        this.configureSwagger();
        return new ServerApplication(this.app, port);
    }
}