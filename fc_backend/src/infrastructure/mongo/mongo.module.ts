import { IChapterRepository } from '@domain/chapter';
import { ICommentLikeRepository, ICommentRepository } from '@domain/comment';
import { INovelRepository } from '@domain/novel';
import { IRatingRepository } from '@domain/rating';
import { IUserRepository } from '@domain/user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ChapterPersistence,
    ChapterSchema,
    CommentLikePersistence,
    CommentLikeSchema,
    CommentPersistence,
    CommentSchema,
    NovelPersistence,
    NovelSchema,
    RatingPersistence,
    RatingSchema,
    UserPersistence,
    UserSchema,
} from './persistence';
import { ChapterRepository, CommentLikeRepository, CommentRepository, NovelRepository, RatingRepository } from './repository';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: NovelPersistence.name, schema: NovelSchema },
            { name: ChapterPersistence.name, schema: ChapterSchema },
            { name: CommentPersistence.name, schema: CommentSchema },
            { name: RatingPersistence.name, schema: RatingSchema },
            { name: CommentLikePersistence.name, schema: CommentLikeSchema },
            { name: UserPersistence.name, schema: UserSchema },
        ]),
    ],
    providers: [
        {
            provide: INovelRepository,
            useClass: NovelRepository,
        },
        {
            provide: IChapterRepository,
            useClass: ChapterRepository,
        },
        {
            provide: ICommentRepository,
            useClass: CommentRepository,
        },
        {
            provide: IRatingRepository,
            useClass: RatingRepository,
        },
        {
            provide: ICommentLikeRepository,
            useClass: CommentLikeRepository,
        },
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
    ],
    exports: [INovelRepository, IChapterRepository, ICommentRepository, IRatingRepository, ICommentLikeRepository, IUserRepository],
})
export class MongoModule {}
