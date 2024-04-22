import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  console.log("Attempting to start Application!");
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Product Service Running at ${port}`);
}
bootstrap();
