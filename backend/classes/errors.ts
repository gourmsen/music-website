import { DatabaseError as PgDatabaseError } from "pg";

export class CustomError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = this.constructor.name;

        this.status = status;
    }
}

export class UnknownError extends CustomError {
    constructor() {
        super(500, "Unknown error");
    }
}

export class DatabaseError extends CustomError {
    constructor() {
        super(500, "Database error");
    }
}

export class MissingFieldsError extends CustomError {
    constructor(fields: string[]) {
        super(400, `Missing fields: ${fields.join(", ")}`);
    }
}

export class UserNotFoundError extends CustomError {
    constructor() {
        super(404, `User not found`);
    }
}

export class UserAlreadyExistsError extends CustomError {
    constructor() {
        super(409, `User already exists`);
    }
}

export class UserNotVerifiedError extends CustomError {
    constructor() {
        super(403, "User not verified");
    }
}

export class InvalidCredentialsError extends CustomError {
    constructor() {
        super(401, "Invalid credentials");
    }
}

export class MissingJWTError extends CustomError {
    constructor() {
        super(401, "Missing JWT token");
    }
}

export class InvalidJWTError extends CustomError {
    constructor() {
        super(401, "Invalid JWT token");
    }
}

export class ExpiredJWTError extends CustomError {
    constructor() {
        super(401, "Expired JWT token");
    }
}

export class SongNotFoundError extends CustomError {
    constructor() {
        super(404, `Song not found`);
    }
}

export function handleError(error: any): CustomError {
    switch (true) {
        case error instanceof UnknownError:
        case error instanceof DatabaseError:
        case error instanceof MissingFieldsError:
        case error instanceof UserNotFoundError:
        case error instanceof UserAlreadyExistsError:
        case error instanceof UserNotVerifiedError:
        case error instanceof InvalidCredentialsError:
        case error instanceof MissingJWTError:
        case error instanceof InvalidJWTError:
        case error instanceof ExpiredJWTError:
        case error instanceof SongNotFoundError:
            throw error;
        case error instanceof PgDatabaseError:
            throw new DatabaseError();
        default:
            throw new UnknownError();
    }
}
