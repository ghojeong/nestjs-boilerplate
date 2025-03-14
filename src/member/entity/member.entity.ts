import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field(() => String)
  name: string;

  @Field(() => Boolean, { nullable: true })
  isPrivate?: boolean;

  @Field(() => String)
  address: string;

  @Field(() => String)
  fistName: string;

  @Field(() => String)
  lastName: string;
}
