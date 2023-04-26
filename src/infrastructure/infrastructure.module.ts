import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CQRSModule } from '@common/cqrs';
import { MongoModule } from './mongo';

@Global()
@Module({
    imports: [
        CQRSModule,
        MongoModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGO_URL'),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [CQRSModule, MongoModule],
})
export class InfrastructureModule {}
