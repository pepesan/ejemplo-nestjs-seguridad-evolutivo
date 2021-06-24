import { Controller, Get, Session, Response, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sessions')
  getVisits(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    // console.log(session.visits);
    return session.visits;
  }
  @Get('setcookies')
  setCookie(@Response({ passthrough: true }) response) {
    response.cookie('key1', 'value', {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
    });
    /*cookie segura sólo con https*/
    response.cookie('key2', 'value2', {
      maxAge: 1000 * 60 * 10,
      signed: true,
    });
  }
  @Get('getcookies')
  getCookies(@Request() req) {
    // para conseguir todas
    console.log(req.cookies);
    // para conseguir  una en concreto
    console.log(req.cookies['key1']);
    // para conseguir  las firmadas
    console.log(req.signedCookies);
    return req.cookies;
  }
}
