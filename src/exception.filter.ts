import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n';

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const i18n = getI18nContextFromArgumentsHost(host);

    // @ts-ignore
    const msg = await i18n.t(exception.getResponse().msg);

    console.log(msg);

    response.status(HttpStatus.OK).json({});
  }
}
