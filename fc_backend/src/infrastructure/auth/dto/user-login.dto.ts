import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
    @ApiProperty({ name: 'email', required: true })
    readonly email: string;

    @ApiProperty({ name: 'password', required: true })
    readonly password: string;
}
