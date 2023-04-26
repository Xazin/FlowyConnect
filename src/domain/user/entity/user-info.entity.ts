import { IUserInfo } from '../interface';

export class UserInfo implements IUserInfo {
    readonly userId: string;
    readonly name: string;
    readonly avatar: string;

    constructor(entityLike: IUserInfo) {
        this.userId = entityLike.userId;
        this.name = entityLike.name;
        this.avatar = entityLike.avatar;
    }

    static create(entityLike: IUserInfo): UserInfo {
        return new UserInfo(entityLike);
    }
}
