import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';
import { MutationOutput } from 'src/common/dto/output.dto';

@InputType()
export class CreateMemberInput extends PickType(
  Member,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class CreateMemberOutput extends MutationOutput {}
