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
      userIds: [1,2]
    })
    em.create(Match, {
      id: 2,
      userIds: [1,3]
    })
    em.create(Match, {
      id: 3,
      userIds: [3,1]
    })
    em.create(Match, {
      id: 4,
      userIds: [4,5]
    })
    em.create(Match, {
      id: 5,
      userIds: [5,6]
    })
    console.log("Data seeded successfully");

  }

}
