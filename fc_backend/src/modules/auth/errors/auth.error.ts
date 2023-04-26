export class EmailAlreadyInUseError extends Error {
    constructor() {
        super('The email already in use - please login or use another email');
    }
}

export class NameAlreadyTakenError extends Error {
    constructor() {
        super('The name is already taken - please use another name');
    }
}

export class PasswordNotStroungEnoughError extends Error {
    constructor() {
        super(
            'The password does not fulfill requirements, must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number',
        );
    }
}
