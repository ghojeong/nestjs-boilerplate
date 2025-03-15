import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';
import { CoreOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class CreateMemberInput extends PickType(
  Member,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class CreateMemberOutput extends CoreOutput {
  static ok = CoreOutput.defaultOk;
  static error = CoreOutput.defaultError;
}
