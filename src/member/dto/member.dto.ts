import { ObjectType, OmitType } from '@nestjs/graphql';
import { Member } from '../entity/member.entity';

@ObjectType()
export class MemberOutput extends OmitType(
  Member,
  ['password', 'isDeleted', 'createdAt', 'updatedAt'],
  ObjectType,
) {}
