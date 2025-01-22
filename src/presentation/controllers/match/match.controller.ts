import { Request, Response } from "express";
import { MatchService } from "../../services";
import { MatchLimitExceededError } from "../../errors";

export default class MatchController {

    public static service : MatchService;

    static getAll = async (req: Request, res: Response) : Promise<void> => {
        try {
            const matches = await this.service.getAll();
            res.status(200).json(matches);   
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getUserMatches = async (req: Request, res: Response) : Promise<void> => {
        try {
            const userId = parseInt(req.query.userId as string);
            if (userId) {
                const matches = await this.service.getUserMatches(userId);
                res.status(200).json(matches);
            }   
        } catch (error) {
            if (error instanceof MatchLimitExceededError) {
                res.status(400).json({ message: "Match limit exceeded" });
            }
            else {
                res.status(500).json(error);
            }
        }
    }

    static deleteMatch = async (req: Request, res: Response) : Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            if (id) {
                await this.service.deleteMatch(id);
                res.status(200).json({ message: "Match deleted" });
            }   
        } catch (error) {
            res.status(500).json(error);
        }
    }
}