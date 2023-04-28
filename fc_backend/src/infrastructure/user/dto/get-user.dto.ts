import { User } from '@domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto implements Partial<User> {
    @ApiProperty({ name: 'id', description: 'Unique user id', required: true })
    readonly id: string;

    @ApiProperty({ name: 'name', description: 'Name of the user', required: true })
    readonly name: string;

    @ApiProperty({ name: 'createdAt', description: 'Date of user creation', required: true, type: Date })
    readonly createdAt: Date;
}
