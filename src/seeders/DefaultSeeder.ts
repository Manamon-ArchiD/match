import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Match } from '../models/match.entity';

export class DefaultSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {

    const existingMatches = await em.find(Match, {});
    if (existingMatches.length > 0) {
      console.log('Data already exists. Skipping seeding.');
      return;
    }
    
    em.create(Match, {
      id: 1,
      userId: 1
    })
    em.create(Match, {
      id: 2,
      userId: 1
    })
    em.create(Match, {
      id: 3,
      userId: 3
    })
    em.create(Match, {
      id: 4,
      userId: 4
    })
    em.create(Match, {
      id: 5,
      userId:2
    })
    console.log("Data seeded successfully");

  }

}
