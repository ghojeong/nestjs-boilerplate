import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';
import { MutationOutput } from 'src/common/dto/output.dto';

@InputType()
export class LoginInput extends PickType(Member, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field(() => String, { nullable: true })
  token?: string;

  static ok = (token: string): LoginOutput => ({ ok: true, token });
  static error = MutationOutput.defaultError;
}
