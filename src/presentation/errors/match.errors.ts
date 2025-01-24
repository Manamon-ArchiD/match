export class MatchLimitExceededError extends Error {
    constructor() {
        super("Maximum number of 3 matches for user reached");
    }
}

export class MatchNotFoundError extends Error {
    constructor(){
        super("No match found for this ID");
    }
}