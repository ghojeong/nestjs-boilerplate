import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dto/core-output.dto';
import { Verification } from '../entity/verification.entity';

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) {}

@ObjectType()
export class VerifyEmailOutput extends MutationOutput {
  static ok = MutationOutput.defaultOk;
  static error = MutationOutput.defaultError;
}
