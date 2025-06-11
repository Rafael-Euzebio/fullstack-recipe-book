import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getMany(
    @Query('s') s?: string,
    @Query('i') i?: string,
    @Query('a') a?: string,
    @Query('c') c?: string,
  ) {
    return this.appService.getMany({ s, i, a, c });
  }

  @Get('/info')
  getOne(@Query('id') id: string) {
    return this.appService.getOne(id)
  }
}
