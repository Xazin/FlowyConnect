import { User } from '@domain/user';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserPersistence & Document;
@Schema({ collection: 'users', autoCreate: true, versionKey: false, timestamps: true })
export class UserPersistence implements Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'toDto'> {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    salt: string;
}
export const UserSchema = SchemaFactory.createForClass(UserPersistence);
