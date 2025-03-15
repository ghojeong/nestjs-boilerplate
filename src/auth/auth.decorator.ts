import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from 'src/member/entity/member.entity';
import { AUTH_MEMBER } from './auth.constant';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthMember = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    return gqlContext.req[AUTH_MEMBER] as Member;
  },
);
