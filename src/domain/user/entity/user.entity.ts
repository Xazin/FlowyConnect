import { IUser } from '../interface';

export class User implements IUser {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly salt: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(entityLike: IUser) {
        this.id = entityLike.id;
        this.name = entityLike.name;
        this.email = entityLike.email;
        this.password = entityLike.password;
        this.salt = entityLike.salt;

        this.createdAt = entityLike.createdAt;
        this.updatedAt = entityLike.updatedAt;
    }

    static create(entityLike: IUser): User {
        return new User(entityLike);
    }
}
