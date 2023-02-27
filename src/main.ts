import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as fs from "fs";
import * as morgan from "morgan";
import { AppModule } from './app.module';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a',
});

async function bootstrap() {
  const PORT = process.env.PORT || 8000;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(morgan('tiny', { stream: logStream }));
  await app.listen(PORT);
  Logger.log(`Server start on host http://localhost:${PORT}`);
}

bootstrap();
