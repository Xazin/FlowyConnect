export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    salt: string;

    createdAt: Date;
    updatedAt: Date;
}
