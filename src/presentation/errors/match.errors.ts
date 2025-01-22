export class MatchLimitExceededError extends Error {
    constructor() {
        super("Maximum number of 3 matches for user reached");
    }
}