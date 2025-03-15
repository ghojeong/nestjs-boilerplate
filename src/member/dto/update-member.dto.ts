import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CreateMemberInput } from './create-member.dto';
import { CoreOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(CreateMemberInput, ['email']),
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {
  static ok = CoreOutput.defaultOk;
  static error = CoreOutput.defaultError;
}

@InputType()
export class ChangePasswordInput extends PartialType(
  PickType(CreateMemberInput, ['password']),
) {}

@ObjectType()
export class ChangePasswordOutput extends CoreOutput {
  static ok = CoreOutput.defaultOk;
  static error = CoreOutput.defaultError;
}
