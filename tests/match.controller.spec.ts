import { MikroORM } from '@mikro-orm/sqlite';
import supertest from 'supertest';
import { Builder } from '../src/builder';
import TestAgent from 'supertest/lib/agent';

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
    console.log("===== Database Test =====");
  });

  afterAll(async () => {
    await orm.close(true);
  });

  it('should retrieve all matches', async () => {
    const response = await request.get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});