import { Controller, Get, HttpException } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
})
@ApiTags('Test')
export class TestController {
  @Get('foo')
  @ApiCreatedResponse()
  public async foo(): Promise<string> {
    throw new HttpException('foo', 401);
  }
}

