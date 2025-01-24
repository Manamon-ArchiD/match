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
      userIds: JSON.stringify(["1","2"]),
      isPublic: false,
      pendingInvitations: JSON.stringify([]),
      status: MatchStatus.CREATED,
      createdAt: new Date()
    })
    em.create(Match, {
      userIds: JSON.stringify(["1","3"]),
      isPublic: false,
      pendingInvitations: JSON.stringify([]),
      status: MatchStatus.CREATED,
      createdAt: new Date()
    })
    em.create(Match, {
      userIds: JSON.stringify(["3","1"]),
      isPublic: false,
      pendingInvitations: JSON.stringify([]),
      status: MatchStatus.PENDING,
      createdAt: new Date()
    })
    em.create(Match, {
      userIds: JSON.stringify(["4","5"]),
      isPublic: false,
      pendingInvitations: JSON.stringify([]),
      status: MatchStatus.PENDING,
      createdAt: new Date()
    })
    em.create(Match, {
      userIds: JSON.stringify(["5","6"]),
      isPublic: true,
      pendingInvitations: JSON.stringify([]),
      status: MatchStatus.ENDED,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
      finishedAt: new Date(),
      winnerId: "5"
    })
    console.log("Data seeded successfully");

  }

}
