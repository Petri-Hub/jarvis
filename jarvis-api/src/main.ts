import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestErrorFactoryService } from './app/modules/shared/infrastructure/services/nest-error-factory.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await setupShutdownHooks(app);
  await setupVersioning(app);
  await setupGlobalPipes(app);
  await setupGlobalPrefix(app);
  await setupSwagger(app);

  await app.listen(process.env.API_PORT || 3000);
}

async function setupShutdownHooks(app: INestApplication) {
  app.enableShutdownHooks();
}

async function setupVersioning(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
}

async function setupGlobalPipes(app: INestApplication) {
  const errorFactory = new NestErrorFactoryService();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => errorFactory.createValidationException(errors),
    }),
  );
}

async function setupGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX || 'api');
}

async function setupSwagger(app: INestApplication) {
  const configuration = new DocumentBuilder()
    .setTitle(process.env.API_OPENAPI_TITLE || 'Truck API')
    .setDescription(process.env.API_OPENAPI_DESCRIPTION || 'Truck API description')
    .setVersion(process.env.API_OPENAPI_VERSION || '1.0.0')
    .build();

  SwaggerModule.setup('swagger', app, SwaggerModule.createDocument(app, configuration));
}
bootstrap();
