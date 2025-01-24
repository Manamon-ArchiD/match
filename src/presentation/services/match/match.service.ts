import { MatchLimitExceededError } from "../../../presentation/errors";
import { Match } from "../../../models/match.entity";
import { repositories } from "../../repositories";
import { NewMatchDto } from "../../dto/new-match.dto";

export default class MatchService {

    constructor(private repository : repositories.MatchRepository) {}
    

    async getAll() : Promise<Match[]> {
        return await this.repository.getAll();
    }

    async getOne(id: number) : Promise<Match | null> {
        return this.repository.getOne(id);
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

    async createOne(data: NewMatchDto) : Promise<Match> {
        const match: Pick<Match, 'pendingInvitations' | 'isPublic' | 'userIds'> = {
            userIds: [ data.userId ],
            pendingInvitations: data.invitations,
            isPublic: data.public
        }
        return this.repository.createOne(match);
    }
};