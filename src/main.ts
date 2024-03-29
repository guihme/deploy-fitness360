import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Scheduling')
    .setDescription('The Scheduling API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  });

  await app.listen(process.env.PORT);

  console.log(`Listening on https://localhost:${process.env.PORT}`);
}
bootstrap();
