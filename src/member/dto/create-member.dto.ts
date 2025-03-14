import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';

@InputType()
export class CreateMemberInput extends PickType(
  Member,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class CreateMemberOutput {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;
}
