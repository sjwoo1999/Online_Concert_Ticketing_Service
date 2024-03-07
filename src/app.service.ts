import { Injectable } from '@nestjs/common';

// 난 Inject(주입)될 수 있어! 라고 선언하는 것이에요.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
