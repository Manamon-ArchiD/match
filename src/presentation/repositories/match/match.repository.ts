import { MikroORM } from "@mikro-orm/postgresql";
import { Match } from "../../../models/match.entity";

export default class MatchRepository {
    constructor(
        private readonly em: MikroORM['em'],
    ) {
        console.log("MatchRepository created");
    }

    getAll = async (): Promise<Match[]> => {
        const matches = await this.em.findAll(Match);
        return matches;
    }

    async getOne(id: number) : Promise<Match | null> {
        const match = await this.em.findOne(Match, {id: id});
        return match;
    }

    getUserMatches = async (userId: number): Promise<Match[]> => {
        const matches = await this.em.find(Match, { userId: userId });
        return matches;
    }

    deleteMatch = async (id: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, id);
        await this.em.removeAndFlush(match);
    }
}