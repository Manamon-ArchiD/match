import { MatchLimitExceededError } from "../../../presentation/errors";
import { Match } from "../../../models/match.entity";
import { repositories } from "../../repositories";

export default class MatchService {

    constructor(private repository : repositories.MatchRepository) {
        console.log("MatchService created");
    }
    

    async getAll() : Promise<Match[]> {
        return await this.repository.getAll();
    }

    async getUserMatches(userId : number) : Promise<Match[]> {
        const matches = await this.repository.getUserMatches(userId);
        if (matches.length > 3) {
            throw new MatchLimitExceededError();
        }
        return matches;
    }

    async deleteMatch(id : number) : Promise<void> {
        await this.repository.deleteMatch(id);
    }
};