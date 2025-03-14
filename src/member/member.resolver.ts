import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Member } from './entity/member.entity';
import { CreateMemberInput, CreateMemberOutput } from './dto/create-member.dto';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/update-member.dto';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => [Member])
  members(): Promise<Member[]> {
    return this.memberService.getAll();
  }

  @Mutation(() => CreateMemberOutput)
  async createMember(
    @Args('input') createMemberInput: CreateMemberInput,
  ): Promise<boolean> {
    try {
      await this.memberService.createMember(createMemberInput);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateMember(
    @Args() updateMemberDto: UpdateMemberDto,
  ): Promise<boolean> {
    try {
      await this.memberService.updateMember(updateMemberDto);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
