import { CQRSModule } from '@common/cqrs';
import { Module } from '@nestjs/common';
import { AuthController } from './auth';

@Module({
    imports: [CQRSModule],
    controllers: [AuthController],
    providers: [],
})
export class ApiModule {}
