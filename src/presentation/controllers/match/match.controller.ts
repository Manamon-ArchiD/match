import { Request, Response } from "express";
import { MatchService } from "../../services";

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
            res.status(500).json(error);
        }
    }
}