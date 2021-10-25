import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const API_VERSION_PREFIX = '/api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_VERSION_PREFIX);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  if (!port) {
    throw new Error('Cannot find PORT in config');
  }

  // Document
  const config = new DocumentBuilder()
    .setTitle('Boarding Reservation')
    .setDescription('Apis document for client')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authentication',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app
    .listen(port)
    .then(() => console.log(`🚀  Server is ready at ${port}`));
}
bootstrap();
