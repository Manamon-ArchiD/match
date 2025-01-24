import { MikroORM } from '@mikro-orm/sqlite';
import supertest from 'supertest';
import { Builder } from '../src/builder';
import TestAgent from 'supertest/lib/agent';
import { Match } from '../src/models/match.entity';
import { NewMatchDto } from '../src/presentation/dto/new-match.dto';
import { UpdateMatchDto } from '../src/presentation/dto/update-match.dto';
import { MatchStatus } from '../src/presentation/enums';

describe('Database Test', () => {
    let orm : MikroORM;
    const endpoint = "/api/match"
    let request : TestAgent;

    beforeAll(async () => {
        const builder = new Builder();
        await builder.configureDatabase(true);
        builder
        .configureExpress()
        .configureRoutes();
        request = supertest(builder.App);
        orm = builder.Orm as MikroORM;
    });

    afterAll(async () => {
        await orm.close(true);
    });

    it('should retrieve all matches', async () => {
        const response = await request.get(endpoint);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);
    });

    it('should retrieve user matches', async () => {
        const response = await request.get(`${endpoint}/user?userId=1`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    it('should add a match', async () => {
        const body: NewMatchDto = {
            invitations: [],
            public: true,
            userId: "1"
        };
        const response = await request.post(endpoint).send(body);
        expect(response.status).toBe(201);
    });

    it('should update a match', async () => {
        const body: UpdateMatchDto = {
            status: MatchStatus.ENDED
        }
        const response = await request.put(`${endpoint}/1`).send(body);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("finishedAt")
    });
    
    it('should get a match by id', async () => {
        const response = await request.get(`${endpoint}/1`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toBe(1);
    });

    it('should delete a match', async () => {
        const response = await request.delete(`${endpoint}/1`);
        expect(response.status).toBe(200);
    });
});