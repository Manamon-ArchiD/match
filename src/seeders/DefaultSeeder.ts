import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Match } from '../models/match.entity';

export class DefaultSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {

    const existingMatch = await em.findOne(Match, {id:1});
    if (existingMatch) {
      console.log('Data already exists. Skipping seeding.');
      return;
    }
    
    em.create(Match, {
      id: 1
    })
    em.create(Match, {
      id: 2
    })
    em.create(Match, {
      id: 3
    })
    em.create(Match, {
      id: 4
    })
    em.create(Match, {
      id: 5
    })
    console.log("Data seeded successfully");

  }

}
