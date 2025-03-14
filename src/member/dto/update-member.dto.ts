import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateMemberDto } from './create-member.dto';

@InputType()
class UpdateMemberInputType extends PartialType(CreateMemberDto) {}

@ArgsType()
export class UpdateMemberDto {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateMemberInputType)
  data: UpdateMemberInputType;
}
