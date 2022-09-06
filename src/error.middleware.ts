import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class MyMiddleware implements NestMiddleware {
  constructor() {}

  use(req: any, res: any, next: (error?: any) => void) {
    throw new BadRequestException({ msg: 'hello' });

    next();
  }
}
