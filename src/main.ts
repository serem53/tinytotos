import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as RedocExpress from 'redoc-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Add Swagger to application
  const config = new DocumentBuilder()
    .setTitle('Mtoto Auth SAAS')
    .setDescription('This is the Auth API for Mtoto SAAS')
    .setVersion('1.0')
    .addTag('Mtoto SAAS 2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Setup ReDoc
  const redocOptions = {
    routePrefix: '/redoc',
    specUrl: '/swagger-json', // URL to your Swagger spec
    title: 'Mtoto SAAS 2.0', // Add your API documentation title here
  };
  const redocHandler = RedocExpress.default(redocOptions);
  app.use(redocOptions.routePrefix, redocHandler);

  // Enable CORS
  app.enableCors();

  // Prefix all routes with '/api/v2/'
  app.setGlobalPrefix('api/v2');

  await app.listen(9000);
}
bootstrap();
