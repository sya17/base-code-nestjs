import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as swaggerUi from 'swagger-ui-express';
import { BaseResponseInterceptor } from './common/interceptors/base-response.interceptor';
require('dotenv').config();
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors({
    origin: ['localhost:3000', 'localhost:3001', 'localhost:3002'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  // use cors
  app.use(
    cors({
      origin: ['localhost:3000', 'localhost:3001', 'localhost:3002'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
  );

  // configuration swagger document
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESC)
    .setVersion(process.env.SWAGGER_VERSION)
    .setContact('ether - IT Dev', 'https://www.ether.co.id', 'info@ether.co.id')
    .setTermsOfService('http://swagger.io/terms/')
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addTag('User', 'Api For Master Data User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //End Configuration

  // use swagger docs
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(document));

  // use global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // use global Interceptors
  app.useGlobalInterceptors(new BaseResponseInterceptor());

  await app.listen(process.env.PORT);
}
bootstrap();
