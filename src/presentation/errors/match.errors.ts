export class MatchLimitExceededError extends Error {
    constructor() {
        super("Maximum number of 3 matches for user reached");
    }
}

export class UserAlreadyInvitedError extends Error {
    constructor() {
        super("User has already been invited to this match");
    }
}

export class UserAlreadyInMatch extends Error {
    constructor() {
        super("User is already in this match");
    }
}