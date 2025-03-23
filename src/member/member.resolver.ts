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
  memberProfile(
    @Args() { memberId }: MemberProfileInput,
  ): Promise<MemberProfileOutput> {
    return this.memberService.findProfileById(memberId);
  }

  @Mutation(() => CreateMemberOutput)
  createMember(
    @Args('input') input: CreateMemberInput,
  ): Promise<CreateMemberOutput> {
    return this.memberService.createMember(input);
  }

  @Mutation(() => LoginOutput)
  login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    return this.memberService.login(input);
  }

  @Mutation(() => EditProfileOutput)
  @UseGuards(AuthGuard)
  editProfile(
    @AuthMember() me: Member,
    @Args('input') input: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.memberService.editProfile(me, input);
  }

  @Mutation(() => ChangePasswordOutput)
  @UseGuards(AuthGuard)
  changePassword(
    @AuthMember() me: Member,
    @Args('input') input: ChangePasswordInput,
  ): Promise<ChangePasswordOutput> {
    return this.memberService.changePassword(me, input);
  }

  @Mutation(() => VerifyEmailOutput)
  verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return this.memberService.verifyEmail(code);
  }
}
