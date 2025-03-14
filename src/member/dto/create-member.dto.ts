import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class CreateMemberDto {
  @Field(() => String)
  @IsString()
  userId: string;

  @Field(() => Boolean)
  @IsBoolean()
  isPrivate: boolean;

  @Field(() => String)
  @IsString()
  address: string;

  @Field(() => String)
  @IsString()
  @Length(5, 10)
  firstName: string;

  @Field(() => String)
  @IsString()
  @Length(2, 8)
  lastName: string;
}
