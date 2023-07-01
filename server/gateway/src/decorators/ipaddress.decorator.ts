import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import * as requestIp from 'request-ip';

export const IpAddress = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request: requestIp.Request & { clientIp: string } = context
      .switchToHttp()
      .getRequest();

    if (request.clientIp) return request.clientIp;
    return requestIp.getClientIp(request);
  },
);
