import { Request, Response } from "express";
import { MatchService } from "../../services";
import { MatchLimitExceededError, MatchNotPublicError, UserAlreadyInMatch, UserAlreadyInvitedError, UserNotInvitedError } from "../../errors";
import { ResponseHelper } from "../../helpers";
import { MatchStatus, StatusCodes } from "../../enums";
import messages from "../../docs/messages.json";
import { NewMatchDto } from "../../dto/new-match.dto";
import { MatchNotFoundError } from "../../errors/match.errors";
import { UpdateMatchDto } from "../../dto/update-match.dto";

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

    static getOne = async (req: Request, res: Response) : Promise<void> => {
        const id = parseInt(req.params.id as string);
        if (id) {
            try {
                const match = await this.service.getOne(id);
                ResponseHelper.send(res, StatusCodes.OK, messages.match.getOne, match);
            } catch (error) {
                if (error instanceof MatchNotFoundError) {
                    ResponseHelper.send(res, StatusCodes.NOT_FOUND, messages.match.matchNotFound);
                }

                ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.defaults.serverError);
            }
        }
    }


    static createOne = async (req: Request, res: Response) : Promise<void> => {
        const data = req.body as NewMatchDto;
        try {
            const match = await this.service.createOne(data);
            ResponseHelper.send(res, StatusCodes.CREATED, messages.match.matchCreated, match);
        } catch (error) {
            console.error(error);
            ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.defaults.serverError);
        }
    }

    static updateOne = async (req: Request, res: Response) : Promise<void> => {
        const id = parseInt(req.params.id);
        if (Number.isNaN(id)){
            ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.defaults.badRequest)
        }
        const data = req.body as UpdateMatchDto;
        if (!Object.values(MatchStatus).includes(data.status)){
            ResponseHelper.send(res, StatusCodes.BAD_REQUEST, messages.match.badStatusUpdate)
        }
        
        try {
            const match = await this.service.updateOne(id, data);
            ResponseHelper.send(res, StatusCodes.OK, messages.match.matchCreated, match);
        } catch (error) {
            if (error instanceof MatchNotFoundError) {
                ResponseHelper.send(res, StatusCodes.NOT_FOUND, messages.match.matchNotFound);
            }
            console.error(error);
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