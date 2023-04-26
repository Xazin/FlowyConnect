import { ICommand } from '@common/cqrs';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user';
import { EmailAlreadyInUseError } from '@modules/auth/errors';

export interface ICreateUserArgs {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class CreateUserCommand implements ICommand<ICreateUserArgs> {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute({ name, email, password }: ICreateUserArgs): Promise<any> {
        const [user] = await this.userRepository.findAll({ email });

        if (user) {
            throw new EmailAlreadyInUseError();
        }

        return;
    }
}
