import { MikroORM } from "@mikro-orm/postgresql";
import { Match } from "../../../models/match.entity";
import { UserNotInvitedError, MatchNotFoundError, MatchNotPublicError, UserAlreadyInMatch, UserAlreadyInvitedError } from "../../errors";
import { MatchDTO } from "../../dto/match.dto";

export default class MatchRepository {
    constructor(
        private readonly em: MikroORM['em'],
    ) {}

    getAll = async (): Promise<MatchDTO[]> => {
        const matches = await this.em.findAll(Match);
        return matches.map((match) => new MatchDTO(match));
    }

    getUserMatches = async (userId: number): Promise<MatchDTO[]> => {
        const matches = await this.em.find(Match, { userIds: { $like: `%${userId}%` } });
        return matches.map((match) => new MatchDTO(match));
    }


    async getOne(id: number) : Promise<Match> {
        const match = await this.em.findOne(Match, id);
        if (!match){
            throw new MatchNotFoundError();
        }
        return match;
    }   

    deleteMatch = async (id: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, id);
        await this.em.removeAndFlush(match);
    }

    async createOne(data: Partial<Match>): Promise<Match> {
        const match = this.em.create(Match, data, {partial: true});
        await this.em.persistAndFlush(match);
        return match;
    }

    async updateOne(id: number, updateData: Partial<Match>) {
        let match: Match = await this.getOne(id);
        this.em.assign(match, updateData);
        await this.em.persistAndFlush(match);
        return match;
    }

    invite = async (userId: string, matchId: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, matchId);

        let pendingInvitations = match.getPendingInvitations();

        let userIds = match.getUserIds();

        if (pendingInvitations.includes(userId)) {
            console.log("User has already been invited to this match");
            throw new UserAlreadyInvitedError();
        }

        if (userIds.includes(userId)) {
            console.log("User is already in this match");
            throw new UserAlreadyInMatch();
        }

        pendingInvitations.push(userId);
        match.setPendingInvitations(pendingInvitations);

        await this.em.persistAndFlush(match);
    }

    acceptInvite = async (userId: string, matchId: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, matchId);
        
        let pendingInvitations = match.getPendingInvitations();

        if (!pendingInvitations.some((id) => id === userId)) {
            throw new UserNotInvitedError();
        }

        pendingInvitations = pendingInvitations.filter((id) => id !== userId);
        match.setPendingInvitations(pendingInvitations);

        let userIds = match.getUserIds();
        userIds.push(userId);
        match.setUserIds(userIds);

        await this.em.persistAndFlush(match);
    }

    declineInvite = async (userId: string, matchId: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, matchId);
        let pendingInvitations = match.getPendingInvitations();

        if (!pendingInvitations.includes(userId)) {
            throw new UserNotInvitedError();
        }

        pendingInvitations = pendingInvitations.filter((id) => id !== userId);
        match.setPendingInvitations(pendingInvitations);

        await this.em.persistAndFlush(match);
    }

    joinPublicMatch = async (userId: string, matchId: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match,matchId);

        if (!match.isPublic) {
            throw new MatchNotPublicError();
        }

        let userIds = match.getUserIds();

        if (userIds.includes(userId)) {
            throw new UserAlreadyInMatch();
        }

        let pendingInvitations = match.getPendingInvitations();

        if (pendingInvitations.includes(userId)) {
            pendingInvitations = pendingInvitations.filter((id) => id !== userId);
            match.setPendingInvitations(pendingInvitations);
        }

        userIds.push(userId);
        match.setUserIds(userIds);

        await this.em.persistAndFlush(match);
    }
}