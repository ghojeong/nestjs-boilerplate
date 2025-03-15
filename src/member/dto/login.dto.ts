import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';
import { CoreOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class LoginInput extends PickType(
  Member,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;

  static ok = (token: string): LoginOutput => ({ ok: true, token });
  static error = CoreOutput.defaultError;
}
