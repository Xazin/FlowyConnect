import { ApiModule } from '@api/api.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { AuthModule } from '@modules/auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ApiModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), InfrastructureModule],
})
export class AppModule {}
