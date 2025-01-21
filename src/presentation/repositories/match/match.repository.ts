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

}