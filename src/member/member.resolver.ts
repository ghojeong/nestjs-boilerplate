import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Member } from './entity/member.entity';
import { CreateMemberInput, CreateMemberOutput } from './dto/create-member.dto';
import { MemberService } from './member.service';
import {
  ChangePasswordInput,
  ChangePasswordOutput,
  EditProfileInput,
  EditProfileOutput,
} from './dto/update-member.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMember } from 'src/auth/auth.decorator';
import {
  MemberProfileInput,
  MemberProfileOutput,
} from './dto/member-profile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dto/verify-email.dto';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => Member)
  @UseGuards(AuthGuard)
  me(@AuthMember() me: Member): Member {
    return me;
  }

  @Query(() => MemberProfileOutput)
  @UseGuards(AuthGuard)
  async memberProfile(
    @Args() { memberId }: MemberProfileInput,
  ): Promise<MemberProfileOutput> {
    return await this.memberService.findProfileById(memberId);
  }

  @Mutation(() => CreateMemberOutput)
  async createMember(
    @Args('input') input: CreateMemberInput,
  ): Promise<CreateMemberOutput> {
    return await this.memberService.createMember(input);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    return await this.memberService.login(input);
  }

  @Mutation(() => EditProfileOutput)
  @UseGuards(AuthGuard)
  async editProfile(
    @AuthMember() me: Member,
    @Args('input') input: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return await this.memberService.editProfile(me, input);
  }

  @Mutation(() => ChangePasswordOutput)
  @UseGuards(AuthGuard)
  async changePassword(
    @AuthMember() me: Member,
    @Args('input') input: ChangePasswordInput,
  ): Promise<ChangePasswordOutput> {
    return await this.memberService.changePassword(me, input);
  }

  @Mutation(() => VerifyEmailOutput)
  async verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return await this.memberService.verifyEmail(code);
  }
}
