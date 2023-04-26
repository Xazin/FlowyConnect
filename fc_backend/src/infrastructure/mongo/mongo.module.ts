import { IUserRepository } from '@domain/user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPersistence, UserSchema } from './persistence';
import { UserRepository } from './repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserPersistence.name, schema: UserSchema }])],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
    ],
    exports: [IUserRepository],
})
export class MongoModule {}
