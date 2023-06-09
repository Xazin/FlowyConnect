import { IQuery } from '@common/cqrs';
import { IUserRepository } from '@domain/user';
import { GetUserDto } from '@infrastructure/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByIdQuery implements IQuery<string> {
    constructor(private readonly userRepository: IUserRepository) {}

    async handle(id: string): Promise<GetUserDto> {
        const [user] = await this.userRepository.findAll({ id });

        if (!user) {
            /// TODO: Error
            throw new Error('User not found');
        }

        return user.toDto();
    }
}
