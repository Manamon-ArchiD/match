import { Match } from "../../models/match.entity";
import { MatchStatus } from "../enums";

export class MatchDTO {
    id: number;
    status: MatchStatus;
    userIds: string[];
    createdAt: string;
    finishedAt: string | null;
    pendingInvitations: string[];
    isPublic : boolean;
    winnerId: string | null;

    constructor(match: Match) {
        this.id = match.id;
        this.status = match.status;
        this.userIds = match.getUserIds();
        this.createdAt = match.createdAt.toISOString();
        this.finishedAt = match.finishedAt ? match.finishedAt.toISOString() : null;
        this.pendingInvitations = match.getPendingInvitations();
        this.isPublic = match.isPublic;
        this.winnerId = match.winnerId ? match.winnerId : null;
    }
}
