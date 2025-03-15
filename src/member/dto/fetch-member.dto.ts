import { ObjectType, OmitType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';

@ObjectType()
export class FetchMemberOutput extends OmitType(Member, ['password']) {}
