import { InputType, OmitType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';

@InputType()
export class CreateMemberDto extends OmitType(Member, ['id'], InputType) {}
