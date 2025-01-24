import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Match } from '../models/match.entity';
import { MatchStatus } from '../presentation/enums';

export class DefaultSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {

    const existingMatches = await em.find(Match, {});
    if (existingMatches.length > 0) {
      console.log('Data already exists. Skipping seeding.');
      return;
    }
    
    em.create(Match, {
      id: 1,
      userIds: [1,2],
      isPublic: false,
      pendingInvitations: [],
      status: MatchStatus.CREATED,
      createdAt: new Date()
    })
    em.create(Match, {
      id: 2,
      userIds: [1,3],
      isPublic: false,
      pendingInvitations: [],
      status: MatchStatus.CREATED,
      createdAt: new Date()
    })
    em.create(Match, {
      id: 3,
      userIds: [3,1],
      isPublic: false,
      pendingInvitations: [],
      status: MatchStatus.PENDING,
      createdAt: new Date()
    })
    em.create(Match, {
      id: 4,
      userIds: [4,5],
      isPublic: false,
      pendingInvitations: [],
      status: MatchStatus.PENDING,
      createdAt: new Date()
    })
    em.create(Match, {
      id: 5,
      userIds: [5,6],
      isPublic: false,
      pendingInvitations: [],
      status: MatchStatus.ENDED,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
      finishedAt: new Date(),
      winnerId: 5
    })
    console.log("Data seeded successfully");

  }

}
