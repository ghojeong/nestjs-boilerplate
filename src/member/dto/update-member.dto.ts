import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CreateMemberInput } from './create-member.dto';
import { MutationOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(CreateMemberInput, ['email']),
) {}

@ObjectType()
export class EditProfileOutput extends MutationOutput {
  static ok = MutationOutput.defaultOk;
  static error = MutationOutput.defaultError;
}

@InputType()
export class ChangePasswordInput extends PartialType(
  PickType(CreateMemberInput, ['password']),
) {}

@ObjectType()
export class ChangePasswordOutput extends MutationOutput {
  static ok = MutationOutput.defaultOk;
  static error = MutationOutput.defaultError;
}
