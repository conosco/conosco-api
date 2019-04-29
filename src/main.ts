import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpErrorFilter } from './common/exceptions/http-error-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Conosco')
    .setDescription('Basic request management')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .build();
  app.useGlobalFilters(new HttpErrorFilter());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap();
