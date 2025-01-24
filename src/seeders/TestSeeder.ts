import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Match } from '../models/match.entity';
import { MatchStatus } from '../presentation/enums';

export class TestSeeder extends Seeder {

    async run(em: EntityManager): Promise<void> {
        em.create(Match, {
            id: 1,
            userIds: [1],
            isPublic: false,
            pendingInvitations: [],
            status: MatchStatus.CREATED,
            createdAt: new Date()
        });

        em.create(Match, {
            id: 2,
            userIds: [1],
            isPublic: false,
            pendingInvitations: [],
            status: MatchStatus.CREATED,
            createdAt: new Date()
        });

        em.create(Match, {
            id: 3,
            userIds: [2],
            isPublic: false,
            pendingInvitations: [],
            status: MatchStatus.PENDING,
            createdAt: new Date()
        });
    }
}
