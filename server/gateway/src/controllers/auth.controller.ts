import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class CardController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}
}
