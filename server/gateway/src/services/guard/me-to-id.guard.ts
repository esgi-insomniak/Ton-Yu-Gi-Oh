import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';

@Injectable()
export class MeToIdGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IAuthorizedRequest = context.switchToHttp().getRequest();

    const targetId = this.reflector.get<string>(
      'targetId',
      context.getHandler(),
    );

    if (
      targetId &&
      request.params[targetId] &&
      request.params[targetId] === 'me'
    ) {
      request.params[targetId] = request.user.id;
    }

    return true;
  }
}
