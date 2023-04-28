import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
    @ApiProperty({ description: 'The JWT access token', example: '639ce62b220c086bbf0e92a4' })
    readonly accessToken: string;

    @ApiProperty({ description: 'The expiry date in seconds since epoch', example: 1685218466, type: Number })
    readonly expires: number;

    @ApiProperty({ description: 'The date since the JWT became active', example: 1673905527, type: Number })
    readonly activeSince: number;
}
