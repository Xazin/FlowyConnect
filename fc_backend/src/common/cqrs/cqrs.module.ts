import { Module } from '@nestjs/common';
import { CQRSHandler, ICQRSHandler } from '.';

@Module({
    providers: [{ provide: ICQRSHandler, useClass: CQRSHandler }],
    exports: [ICQRSHandler],
})
export class CQRSModule {}
