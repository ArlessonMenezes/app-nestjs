import {ExecutionContext, createParamDecorator } from "@nestjs/common";
import { AuthorizationToLoginPayload } from "../base-64.converter";

export const idUser = createParamDecorator(
  (_, ctx: ExecutionContext) => {

    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const loginPayload = AuthorizationToLoginPayload(authorization);

    return loginPayload?.idUser;
  }
)