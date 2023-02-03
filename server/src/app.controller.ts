import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('employee-list/:page')
  getEmployeeList(@Param('page') page: number,) {
    return this.appService.getEmployees(page);
  }

  @Get('employee/:email')
  async findEmployeebyEmail(@Param('email') email: string,) {
    const employees = await this.appService.findEmployee(email)
    return await this.appService.findEmployee(email);
  }
}
