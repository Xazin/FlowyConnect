import { LoggerService, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@common/index';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';

function awesomeStartMessage(logger: LoggerService, port: string, hostUrl: string, restPath: string): void {
    logger.log('=============================================================================');
    logger.log('=============================================================================');
    logger.log(' _____ _               _____                     _   ');
    logger.log('|   __| |___ _ _ _ _ _|     |___ ___ ___ ___ ___| |_ ');
    logger.log('|   __| | . | | | | | |   --| . |   |   | -_|  _|  _|');
    logger.log('|__|  |_|___|_____|_  |_____|___|_|_|_|_|___|___|_|  ');
    logger.log('                  |___|                              ');
    logger.log('=============================================================================');
    logger.log('=============================================================================');
    logger.log(`Host:     ${hostUrl}`);
    logger.log(`Port:     ${port}`);
    logger.log(`Rest API: ${hostUrl}${restPath}`);
    logger.log('=============================================================================');
    logger.log('=============================================================================');
}

function bootstrapLogger(): LoggerService {
    Logger.bootstrap();
    return Logger.create();
}

function bootstrapSwagger(app: any, restPath: string) {
    const config = new DocumentBuilder()
        .setTitle('FlowyConnect API')
        .setDescription('The FlowyConnect API')
        .setVersion('1.0')
        .addBearerAuth(
            {
                scheme: 'bearer',
                type: 'http',
            },
            'Authorization',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(restPath, app, document);
}

async function bootstrap() {
    const logger = bootstrapLogger();

    const app = await NestFactory.create(AppModule, { logger });
    const configService = app.get(ConfigService);

    const port = configService.get('PORT') ?? 3000;
    const restPath = configService.get<string>('REST_PATH') ?? '/';
    const hostUrl = configService.get<string>('HOST_URL') ?? `http://localhost`;

    app.enableShutdownHooks()
        .setGlobalPrefix(restPath)
        .use(bodyParser.urlencoded({ extended: true }))
        .use(bodyParser.json({ verify: rawBody }))
        .useGlobalPipes(new ValidationPipe({ transform: true }));

    bootstrapSwagger(app, restPath);

    await app.listen(port);

    awesomeStartMessage(logger, port, hostUrl, restPath);
}
bootstrap();

export interface Request extends express.Request {
    rawBody?: Buffer;
}

function rawBody(req: Request, _res: express.Response, buffer: Buffer): void {
    if (Buffer.isBuffer(buffer)) {
        req.rawBody = buffer;
    }
}
