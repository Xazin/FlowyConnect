import { FindCriteria, IRepository } from '@core/index';
import { IIdentifiable } from '@domain/core/interface';
import { User } from '../entity/user.entity';
import { IUser } from './user.interface';

export type CreateUser = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
export type PatchUser = Partial<IUser>;
export type QueryUser = Partial<Pick<IUser, 'id' | 'email' | 'name'> & { or: FindCriteria<QueryUser>[] }>;

export abstract class IUserRepository implements IRepository<User, CreateUser, PatchUser, QueryUser> {
    abstract create(entityLike: CreateUser): Promise<IIdentifiable>;
    abstract patch(id: string, entityLike: PatchUser): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findOne(query: FindCriteria<QueryUser>): Promise<User>;
    abstract findAll(query: FindCriteria<QueryUser>): Promise<User[]>;
    abstract count(query: FindCriteria<QueryUser>): Promise<number>;
}
