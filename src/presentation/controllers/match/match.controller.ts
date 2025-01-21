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
}