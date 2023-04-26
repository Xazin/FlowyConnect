import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FindCriteria, IPagination } from '@core/repository.interface';
import { IIdentifiable } from '@domain/core/interface';
import { toMongoQuery } from '../utils';
import { CreateUser, IUserRepository, PatchUser, QueryUser, User } from '@domain/user';
import { UserDocument, UserPersistence } from '../persistence';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectModel(UserPersistence.name) private readonly documentModel: Model<UserDocument>) {}
    async create(entityLike: CreateUser): Promise<IIdentifiable> {
        const document = new this.documentModel(entityLike);
        await document.save();

        return { id: document.id };
    }

    async patch(id: string, entityLike: PatchUser): Promise<void> {
        await this.findOne({ id });
        await this.documentModel.updateOne({ _id: id }, entityLike, { upsert: true });
    }

    async delete(id: string): Promise<void> {
        await this.findOne({ id });
        await this.documentModel.deleteOne({ _id: id });
    }

    async findOne(query: FindCriteria<QueryUser>): Promise<User> {
        const [entity] = await this.findAll(query, { offset: 0, limit: 1 });
        return entity;
    }

    async findAll(query: FindCriteria<QueryUser>, options?: IPagination): Promise<User[]> {
        const mongoQuery = toMongoQuery<FilterQuery<UserDocument>>(query);
        const documents = await this.documentModel.find(mongoQuery, null, { skip: options?.offset, limit: options?.limit });

        return documents.map((doc) => User.create(doc.toObject({ getters: true })));
    }

    async count(query: FindCriteria<QueryUser>): Promise<number> {
        const mongoQuery = toMongoQuery<FilterQuery<UserDocument>>(query);
        return this.documentModel.count(mongoQuery);
    }
}
