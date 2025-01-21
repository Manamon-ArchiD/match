import swaggerJSDoc from 'swagger-jsdoc';
import express, { Express } from 'express';
import { ServerApplication } from './server';
import bodyParser from 'body-parser';
import { initializeDatabaseConnection } from './configuration/database';
import { options } from './swagger';
import swaggerUI from 'swagger-ui-express';
import { Router } from './presentation';
import { repositories } from './presentation/repositories';
import { MikroORM } from '@mikro-orm/postgresql';
import { MatchService } from './presentation/services';
import { MatchController } from './presentation/controllers';

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
        this.configureDependencies(orm);
        return this;
    }

    configureDependencies = (orm : MikroORM) => {
        const matchRepository = new repositories.MatchRepository(orm.em.fork());
        const matchService = new MatchService(matchRepository);
        MatchController.service = matchService; 
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