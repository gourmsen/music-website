export class CustomError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = this.constructor.name;

        this.status = status;
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
    constructor(email: string) {
        super(404, `User with email '${email}' not found`);
    }
}

export class UserAlreadyExistsError extends CustomError {
    constructor(email: string) {
        super(409, `User with email '${email}' already exists`);
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
