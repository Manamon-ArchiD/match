import { Request, Response } from "express";
import { MatchService } from "../../services";
import { MatchLimitExceededError, MatchNotPublicError, UserAlreadyInMatch, UserAlreadyInvitedError, UserNotInvitedError } from "../../errors";
import { ResponseHelper } from "../../helpers";
import { StatusCodes } from "../../enums";
import messages from "../../docs/messages.json";

export default class MatchController {

    public static service : MatchService;

    static getAll = async (req: Request, res: Response) : Promise<void> => {
        try {
            const matches = await this.service.getAll();
            ResponseHelper.send(res, StatusCodes.OK, messages.match.getAll, matches);
        } catch (error) {
            ResponseHelper.send(res, StatusCodes.CREATED, messages.defaults.serverError, error);
        }
    }

    static getUserMatches = async (req: Request, res: Response) : Promise<void> => {
        try {
            const userId = parseInt(req.query.userId as string);
            if (userId) {
                const matches = await this.service.getUserMatches(userId);
                ResponseHelper.send(res, StatusCodes.OK, messages.match.userMatches, matches);
            }   
        } catch (error) {
            if (error instanceof MatchLimitExceededError) {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.match.matchLimitExceeded);
            }
            else {
                ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.defaults.serverError, error);
            }
        }
    }

    static deleteMatch = async (req: Request, res: Response) : Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            if (id) {
                await this.service.deleteMatch(id);
                ResponseHelper.send(res, StatusCodes.OK, messages.match.matchDeleted);
            }   
        } catch (error) {
            ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.defaults.serverError);
        }
    }

    static invite = async (req: Request, res: Response) : Promise<void> => {
        try {
            const userId = req.query.userId as string;
            const matchId = parseInt(req.params.matchId);
            if (userId && matchId) {
                await this.service.invite(userId, matchId);
                ResponseHelper.send(res, StatusCodes.NO_CONTENT, messages.match.inviteSent);
            } else {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.defaults.invalidParams);
            }
        } catch (error) {
            if (error instanceof UserAlreadyInvitedError) {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.match.userAlreadyInvited);
            } else if (error instanceof UserAlreadyInMatch) {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.match.userAlreadyInMatch);
            } 
            else {
                ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.defaults.serverError);
            }
        }
    }

    static acceptInvite = async (req: Request, res: Response) : Promise<void> => {
        try {
            // TODO : Call auth service to get user id

            const userId = String(req.body.userId);
            const matchId = parseInt(req.params.matchId);
            if (userId && matchId) {
                await this.service.acceptInvite(userId, matchId);
                ResponseHelper.send(res, StatusCodes.NO_CONTENT, messages.match.inviteAccepted);
            } else {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.defaults.invalidParams);
            }

        } catch(error) {
            if (error instanceof UserNotInvitedError) {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.match.userNotInvited);
            } else {
                ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.defaults.serverError, error);
            }
        }
    }

    static declineInvite = async (req: Request, res: Response) : Promise<void> => {
        try {
            // TODO : Call auth service to get user id

            const userId = req.body.userId as string;
            const matchId = parseInt(req.params.matchId);
            if (userId && matchId) {
                await this.service.declineInvite(userId, matchId);
                ResponseHelper.send(res, StatusCodes.NO_CONTENT, messages.match.inviteDeclined);
            } else {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.defaults.invalidParams);
            }
        } catch(error) {
            if (error instanceof UserNotInvitedError) {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.match.userNotInvited);
            } else {
                ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.defaults.serverError, error);
            }
        }
    }

    static joinPublicMatch = async (req: Request, res: Response) : Promise<void> => {
        try {
            // TODO : Call auth service to get user id

            const userId = req.body.userId as string;
            const matchId = parseInt(req.params.matchId);
            if (userId && matchId) {
                await this.service.joinPublicMatch(userId, matchId);
                ResponseHelper.send(res, StatusCodes.NO_CONTENT, messages.match.joinPublicMatch);
            } else {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.defaults.invalidParams);
            }
        } catch(error) {
            if (error instanceof MatchNotPublicError) {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.match.matchNotPublic);
            } else if (error instanceof UserAlreadyInMatch) {
                ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.match.userAlreadyInMatch);
            } else {
                ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.defaults.serverError, error);
            }
        }
    }
}