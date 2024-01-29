import { INestApplication } from '@nestjs/common';

export function config(app: INestApplication) {
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.getHttpAdapter().getInstance().disable('X-Powered-By');
  app.setGlobalPrefix('api');
}
