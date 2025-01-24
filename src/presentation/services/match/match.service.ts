import { MatchLimitExceededError, UserAlreadyInvitedError } from "../../../presentation/errors";
import { Match } from "../../../models/match.entity";
import { repositories } from "../../repositories";
import { NewMatchDto } from "../../dto/new-match.dto";
import { MatchStatus } from "../../enums";
import { MatchDTO } from "../../dto/match.dto";
import { UpdateMatchDto } from "../../dto/update-match.dto";

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

    async getOne(id: number) : Promise<MatchDTO> {
        const match = await this.repository.getOne(id);
        return new MatchDTO(match);
    }

    async deleteMatch(id : number) : Promise<void> {
        await this.repository.deleteMatch(id);
    }

    async createOne(data: NewMatchDto) : Promise<Match> {
        const match: Pick<Match, 'pendingInvitations' | 'isPublic' | 'userIds'> = {
            userIds: JSON.stringify([data.userId]),
            pendingInvitations:  JSON.stringify(data.invitations),
            isPublic: data.public
        }

        console.log(match);
        return this.repository.createOne(match);
    }

    async updateOne(id: number, data: UpdateMatchDto) {
        const updateData: Pick<Match, 'status' | 'finishedAt'> = (
            data.status === MatchStatus.ENDED 
            ? {status: data.status, finishedAt: new Date()}
            : {status: data.status}
        );
            
        const match = this.repository.updateOne(id, updateData);
        return match;
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