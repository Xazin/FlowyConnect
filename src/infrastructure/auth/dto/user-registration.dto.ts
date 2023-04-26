import { ApiProperty } from '@nestjs/swagger';

export class UserRegistrationDto {
    @ApiProperty({ name: 'email', required: true })
    readonly email: string;

    @ApiProperty({ name: 'name', required: true })
    readonly name: string;

    @ApiProperty({ name: 'password', required: true })
    readonly password: string;
}
