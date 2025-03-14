import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateMemberInput } from './create-member.dto';

@InputType()
class UpdateMemberInputType extends PartialType(CreateMemberInput) {}

@ArgsType()
export class UpdateMemberDto {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateMemberInputType)
  data: UpdateMemberInputType;
}
