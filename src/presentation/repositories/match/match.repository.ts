import { MikroORM } from "@mikro-orm/postgresql";
import { Match } from "../../../models/match.entity";
import { UserAlreadyInvitedError, UserAlreadyInMatch, UserNotInvitedError } from "../../errors";

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

    invite = async (userId: number, matchId: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, matchId);


        if (match.pendingInvitations.includes(userId)) {
            console.log("User has already been invited to this match");
            throw new UserAlreadyInvitedError();
        }

        if (match.userIds.includes(userId)) {
            console.log("User is already in this match");
            throw new UserAlreadyInMatch();
        }

        match.pendingInvitations.push(userId);
        await this.em.persistAndFlush(match);
    }

    acceptInvite = async (userId: number, matchId: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, matchId);
        if (!match.pendingInvitations.includes(userId)) {
            throw new UserNotInvitedError();
        }

        match.pendingInvitations = match.pendingInvitations.filter((id) => id !== userId);
        match.userIds.push(userId);
        await this.em.persistAndFlush(match);
    }

    declineInvite = async (userId: number, matchId: number): Promise<void> => {
        const match = await this.em.findOneOrFail(Match, matchId);
        if (!match.pendingInvitations.includes(userId)) {
            throw new UserNotInvitedError();
        }

        match.pendingInvitations = match.pendingInvitations.filter((id) => id !== userId);
        await this.em.persistAndFlush(match);
    }
}