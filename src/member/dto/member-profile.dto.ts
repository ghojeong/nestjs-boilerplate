import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/core-output.dto';
import { Member } from '../entity/member.entity';
import { MemberOutput } from './member.dto';

@ArgsType()
export class MemberProfileInput {
  @Field(() => Number)
  memberId: number;
}

@ObjectType()
export class MemberProfileOutput extends CoreOutput {
  @Field(() => MemberOutput)
  member?: MemberOutput;

  static ok = (member: Member): MemberProfileOutput => ({ ok: true, member });
  static error = CoreOutput.defaultError;
}
