import { MatchLimitExceededError, UserAlreadyInvitedError } from "../../../presentation/errors";
import { Match } from "../../../models/match.entity";
import { repositories } from "../../repositories";
import { MatchDTO } from "../../dto/match.dto";

export default class MatchService {

    constructor(private repository : repositories.MatchRepository) {}
    

    async getAll() : Promise<MatchDTO[]> {
        return await this.repository.getAll();
    }

    async getUserMatches(userId : number) : Promise<MatchDTO[]> {
        const matches = await this.repository.getUserMatches(userId);
        if (matches.length > 3) {
            throw new MatchLimitExceededError();
        }
        return matches;
    }

    async deleteMatch(id : number) : Promise<void> {
        await this.repository.deleteMatch(id);
    }

    async invite(userId : string, matchId : number) : Promise<void> {
        await this.repository.invite(userId, matchId);
    }

    async acceptInvite(userId : string, matchId : number) : Promise<void> {
        await this.repository.acceptInvite(userId, matchId);
    }

    async declineInvite(userId : string, matchId : number) : Promise<void> {
        await this.repository.declineInvite(userId, matchId);
    }

    async joinPublicMatch(userId : string, matchId: number) : Promise<void> {
        await this.repository.joinPublicMatch(userId, matchId);
    }
};