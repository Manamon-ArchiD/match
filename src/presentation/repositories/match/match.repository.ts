import { MikroORM } from "@mikro-orm/postgresql";
import { Match } from "../../../models/match.entity";

export default class MatchRepository {
    constructor(
        private readonly em: MikroORM['em'],
    ) {}

    getAll = async (): Promise<Match[]> => {
        const matches = await this.em.findAll(Match);
        return matches;
    }

    getUserMatches = async (userId: number): Promise<Match[]> => {
        const matches = await this.em.find(Match, { userIds: { $contains: [userId] } });
        return matches;
    }

    deleteMatch = async (id: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, id);
        await this.em.removeAndFlush(match);
    }
}