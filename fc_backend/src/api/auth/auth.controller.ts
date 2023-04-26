import { ICQRSHandler } from '@common/cqrs';
import { Identifiable } from '@domain/core/entity';
import { User } from '@domain/user';
import { TokenResponse, UserLoginDto, UserRegistrationDto } from '@infrastructure/auth';
import { CreateUserCommand, FindUserByIdQuery, LocalAuthGuard } from '@modules/auth';
import { AuthGuard, CurrentUser } from '@modules/auth';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly cqrsHandler: ICQRSHandler) {}

    @UseGuards(LocalAuthGuard)
    @Post('v1/auth/login')
    @ApiBody({ type: UserLoginDto, description: 'Login with email and password' })
    @ApiResponse({ type: TokenResponse })
    async login(@Request() req) {
        return req.user;
    }

    @Post('v1/auth/register')
    @ApiBody({ type: UserRegistrationDto, description: 'Registers a new user' })
    @ApiResponse({ type: Identifiable })
    async register(@Body() registrationDto: UserRegistrationDto): Promise<Identifiable> {
        return await this.cqrsHandler.execute(CreateUserCommand, registrationDto);
    }

    /// TODO: Move to profile controller
    @Get('v1/auth/profile')
    @AuthGuard()
    async getProfile(@CurrentUser() user: User): Promise<any> {
        return this.cqrsHandler.fetch(FindUserByIdQuery, user.id);
    }
}
