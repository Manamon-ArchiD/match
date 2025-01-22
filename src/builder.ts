import swaggerJSDoc from 'swagger-jsdoc';
import express, { Express } from 'express';
import { ServerApplication } from './server';
import bodyParser from 'body-parser';
import { initializeDatabaseConnection } from './configuration/database';
import { options } from './swagger';
import swaggerUI from 'swagger-ui-express';
import { Router } from './presentation';
import { repositories } from './presentation/repositories';
import { MikroORM as pgMikroORM } from '@mikro-orm/postgresql';
import { MatchService } from './presentation/services';
import { MatchController } from './presentation/controllers';
import { MikroORM as sqliteMikroORM } from '@mikro-orm/sqlite';
import { TestSeeder } from './seeders/TestSeeder';

export class Builder {
    private orm! : pgMikroORM | sqliteMikroORM;

    constructor(private app: Express = express()) {}

    configureExpress = () => {
        this.app.use(bodyParser.json());
        return this;
    }

    configureSwagger = () => {
        const swaggerSpec = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    }

    configureDatabase = async (useMemoryDB = false) => {
        this.orm = await initializeDatabaseConnection(process.env, useMemoryDB)
        const generator = this.orm.getSchemaGenerator();
        await generator.updateSchema()
        if (useMemoryDB) {
            await this.orm.seeder.seed(TestSeeder);
        }
        this.configureDependencies(this.orm);
        return this;
    }

    configureDependencies = (orm : pgMikroORM | sqliteMikroORM) => {
        const matchRepository = new repositories.MatchRepository(orm.em.fork());
        const matchService = new MatchService(matchRepository);
        MatchController.service = matchService; 
        return this;
    }

    configureRoutes = () => {
        this.app.use('/api', Router);
        return this;
    }

    build = async (port: number, useMemoryDB = false) => {
        await this.configureDatabase(useMemoryDB);
        this.configureExpress();
        this.configureRoutes();
        this.configureSwagger();
        return new ServerApplication(this.app, port);
    }

    
    public get App() : Express {
        return this.app
    }

    public get Orm() : pgMikroORM | sqliteMikroORM {
        return this.orm
    }

}