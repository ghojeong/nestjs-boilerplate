import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Member } from './entity/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberService } from './member.service';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => [Member])
  members(): Promise<Member[]> {
    return this.memberService.getAll();
  }

  @Mutation(() => Boolean)
  createMember(@Args() dto: CreateMemberDto): boolean {
    return true;
  }
}
