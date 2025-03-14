import { InputType, PickType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';

@InputType()
export class CreateMemberInput extends PickType(
  Member,
  ['email', 'password'],
  InputType,
) {}
