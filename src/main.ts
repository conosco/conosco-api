import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionInterceptor } from './common/filters/exception.pipe';
import { ValidationPipe } from './common/pipes/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Conosco')
    .setDescription('Basic request management')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .addBearerAuth('Authorization', 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(3000);
}

bootstrap();
