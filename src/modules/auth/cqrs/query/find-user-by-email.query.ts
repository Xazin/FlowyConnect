import { IQuery } from '@common/cqrs';
import { IUserRepository, User } from '@domain/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByEmailQuery implements IQuery<string> {
    constructor(private readonly userRepository: IUserRepository) {}

    async handle(email: string): Promise<User> {
        const [user] = await this.userRepository.findAll({ email });

        if (!user) {
            /// TODO: Exceptions
            throw new Error('User not found');
        }

        return user;
    }
}
