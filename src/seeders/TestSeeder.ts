import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Match } from '../models/match.entity';

export class TestSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    em.create(Match, {
      id: 1
    })
  }

}