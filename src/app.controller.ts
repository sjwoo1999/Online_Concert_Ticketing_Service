import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 생성자에서 인자로 AppService 객체를 넘기면,
  // this.AppService()라는 멤버 변수에 AppService 객체가 주입되는 것을 볼 수 있다.
  // AppService의 인스턴스는 Nest.js의 DI 컨테이너에 의해 생성되고 관리됩니다.
  constructor(private readonly appService: AppService) {}

  // HTTP GET으로 요청이 들어올 시 아래의 함수(코드에서는 getHello 함수)를 실행하라는 얘기입니다!
  // @Post, @Put, @Patch, @Delete 데코레이터도 준비되어 있다.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
