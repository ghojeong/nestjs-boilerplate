import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Member } from './entity/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';

@Resolver(() => Member)
export class MemberResolver {
  @Query(() => [Member])
  members(@Args('userId') userId: string): Member[] {
    return [];
  }

  @Mutation(() => Boolean)
  createMember(@Args() dto: CreateMemberDto): boolean {
    return true;
  }
}
