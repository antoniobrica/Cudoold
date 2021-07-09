/**          
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Constants } from '@cudo/ms-core'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/ms-task';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(Constants.LISTENING_AT + port + '/' + globalPrefix);
  });
}

bootstrap();
