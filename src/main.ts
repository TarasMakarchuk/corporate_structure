import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a',
});

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const HOST = process.env.POSTGRES_HOST || 'localhost';

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('tiny', { stream: logStream }));

  const config = new DocumentBuilder()
    .setTitle('Corporate structure API')
    .setDescription('Boss-subordinate structure')
    .setVersion('1.0.0')
    .addTag('Nest.js, TypeORM')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);
  Logger.log( `http://${HOST}:${PORT}`, `Server start on host` );
  Logger.log( `http://${HOST}:${PORT}/api/docs`, `Swagger documentation` );
  //
}

bootstrap();
