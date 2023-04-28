import { ApiProperty } from '@nestjs/swagger';
import { IIdentifiable } from '../interface';

export class Identifiable implements IIdentifiable {
    @ApiProperty({ name: 'id', required: true })
    readonly id: string;
}
