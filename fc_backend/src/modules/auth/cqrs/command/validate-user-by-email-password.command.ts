import { ICommand, ICQRSHandler } from '@common/cqrs';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { FindUserByEmailQuery } from '../query';
import { User } from '@domain/user';
import { JwtService } from '@nestjs/jwt';

export interface IValidateUserByEmailPasswordArgs {
    email: string;
    password: string;
}

@Injectable()
export class ValidateUserByEmailPasswordCommand implements ICommand<IValidateUserByEmailPasswordArgs> {
    constructor(private readonly cqrsHandler: ICQRSHandler, private readonly jwtService: JwtService) {}

    async execute({ email, password }: IValidateUserByEmailPasswordArgs): Promise<any> {
        const user: User = await this.cqrsHandler.fetch(FindUserByEmailQuery, email);

        const isMatch = await bcrypt.compare(password, `${user.salt}${user.password}`);
        if (!isMatch) {
            throw new Error('User not found');
        }

        return this.login(user);
    }

    async login(user: User) {
        const payload = { name: user.name, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
