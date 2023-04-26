import { LocalStrategy, JwtStrategy } from '@infrastructure/auth';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { CreateUserCommand, FindUserByEmailQuery, FindUserByIdQuery, MONTH_IN_SECONDS, ValidateUserByEmailPasswordCommand } from './cqrs';

@Module({
    imports: [
        InfrastructureModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: MONTH_IN_SECONDS },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [FindUserByEmailQuery, FindUserByIdQuery, ValidateUserByEmailPasswordCommand, CreateUserCommand, LocalStrategy, JwtStrategy],
    exports: [FindUserByEmailQuery, FindUserByIdQuery, ValidateUserByEmailPasswordCommand, CreateUserCommand],
})
export class AuthModule {}
