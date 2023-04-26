import { ICQRSHandler } from '@common/cqrs';
import { User } from '@domain/user';
import { UserRegistrationDto } from '@infrastructure/auth/dto/user-registration.dto';
import { CreateUserCommand, FindUserByIdQuery, LocalAuthGuard } from '@modules/auth';
import { AuthGuard, CurrentUser } from '@modules/auth';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly cqrsHandler: ICQRSHandler) {}

    @UseGuards(LocalAuthGuard)
    @Post('v1/auth/login')
    @ApiParam({ name: 'password', required: true })
    @ApiParam({ name: 'email', required: true })
    async login(@Request() req) {
        return req.user;
    }

    @Post('v1/auth/register')
    @ApiBody({ type: UserRegistrationDto, description: 'Registers a new user' })
    async register(@Body() registrationDto: UserRegistrationDto): Promise<any> {
        return await this.cqrsHandler.execute(CreateUserCommand, registrationDto);
    }

    /// TODO: Move to profile controller
    @Get('v1/auth/profile')
    @AuthGuard()
    getProfile(@CurrentUser() user: User): Promise<any> {
        return this.cqrsHandler.fetch(FindUserByIdQuery, user.id);
    }
}
