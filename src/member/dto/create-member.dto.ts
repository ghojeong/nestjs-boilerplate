import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateMemberDto {
  @Field(() => String)
  userId: string;

  @Field(() => Boolean)
  isPrivate: boolean;

  @Field(() => String)
  address: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
