import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { MemberOutput } from './member.dto';

@ArgsType()
export class MemberProfileInput {
  @Field(() => Number)
  memberId: number;
}

@ObjectType()
export class MemberProfileOutput extends PickType(MemberOutput, [
  'id',
  'email',
  'role',
  'isPrivate',
]) {}
