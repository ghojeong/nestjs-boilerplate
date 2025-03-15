import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Member } from './entity/member.entity';
import { CreateMemberInput, CreateMemberOutput } from './dto/create-member.dto';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { FetchMemberOutput } from './dto/fetch-member.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMember } from 'src/auth/auth.decorator';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => [Member])
  members(): Promise<Member[]> {
    return this.memberService.getAll();
  }

  @Query(() => Member)
  @UseGuards(AuthGuard)
  me(@AuthMember() me: Member): FetchMemberOutput {
    return me;
  }

  @Mutation(() => CreateMemberOutput)
  async createMember(
    @Args('input') createMemberInput: CreateMemberInput,
  ): Promise<CreateMemberOutput> {
    return await this.memberService.createMember(createMemberInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return await this.memberService.login(loginInput);
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
