import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyExceptionFilter } from './exception.filter';
import { MyMiddleware } from './error.middleware';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en-US',
      loaderOptions: {
        path: join(__dirname, './i18n/'),
        watch: true,
      },
      loader: I18nJsonLoader,
    }),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes('*');
  }
}
