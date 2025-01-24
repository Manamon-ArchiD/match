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

export class UserNotInvitedError extends Error {
    constructor() {
        super("User has not been invited to this match");
    }
}

export class MatchNotPublicError extends Error {
    constructor() {
        super("Match is not public");
    }
}

export class MatchNotFoundError extends Error {
    constructor(){
        super("No match found for this ID");
    }
}