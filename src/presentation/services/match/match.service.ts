import { Match } from "../../../models/match.entity";
import { repositories } from "../../repositories";

export default class MatchService {

    constructor(private repository : repositories.MatchRepository) {
        console.log("MatchService created");
    }
    

    async getAll() : Promise<Match[]> {
        return await this.repository.getAll();
    }
};