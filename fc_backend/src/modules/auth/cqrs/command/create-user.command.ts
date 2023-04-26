import * as bcrypt from 'bcrypt';

import { ICommand } from '@common/cqrs';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user';
import { EmailAlreadyInUseError } from '@modules/auth/errors';
import { Identifiable } from '@domain/core/entity';

export interface ICreateUserArgs {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class CreateUserCommand implements ICommand<ICreateUserArgs> {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute({ name, email, password }: ICreateUserArgs): Promise<Identifiable> {
        const [user] = await this.userRepository.findAll({ email });

        if (user) {
            throw new EmailAlreadyInUseError();
        }

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        const newPassword = hash.substring(salt.length);

        return await this.userRepository.create({ name, email, password: newPassword, salt });
    }
}
