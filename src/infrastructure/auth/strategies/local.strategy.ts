import { ICQRSHandler } from '@common/cqrs';
import { ValidateUserByEmailPasswordCommand } from '@modules/auth/cqrs';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly cqrsHandler: ICQRSHandler) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {
        return await this.cqrsHandler.execute(ValidateUserByEmailPasswordCommand, { email, password });
    }
}
