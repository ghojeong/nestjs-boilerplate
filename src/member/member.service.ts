import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberInput, CreateMemberOutput } from './dto/create-member.dto';
import {
  ChangePasswordInput,
  ChangePasswordOutput,
  EditProfileInput,
  EditProfileOutput,
} from './dto/update-member.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { MemberProfileOutput } from './dto/member-profile.dto';
import { Verification } from './entity/verification.entity';
import { VerifyEmailOutput } from './dto/verify-email.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly auth: AuthService,
  ) {}

  async createMember(
    createMemberInput: CreateMemberInput,
  ): Promise<CreateMemberOutput> {
    try {
      if (
        await this.memberRepository.exists({
          where: { email: createMemberInput.email, isDeleted: false },
        })
      ) {
        return CreateMemberOutput.error('이미 존재하는 계정입니다.');
      }
      const member = await this.memberRepository.save(
        this.memberRepository.create(createMemberInput),
      );
      await this.verificationRepository.save(
        this.verificationRepository.create({ member }),
      );
      return CreateMemberOutput.ok();
    } catch (e) {
      console.error(e);
      return CreateMemberOutput.error('계정 생성에 실패했습니다.');
    }
  }

  async findById(id: number): Promise<Member | null> {
    return await this.memberRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async findProfileById(id: number): Promise<MemberProfileOutput> {
    const member = await this.findById(id);
    if (!member) {
      throw new NotFoundException();
    }
    return member;
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const member = await this.memberRepository.findOne({
        where: { email, isDeleted: false },
      });
      if (!member?.id) {
        return LoginOutput.error('회원가입되어 있지 않은 계정입니다.');
      }
      if (!(await member.checkPassword(password))) {
        return LoginOutput.error('잘못된 비밀번호입니다.');
      }
      return LoginOutput.ok(this.auth.sign(member.id));
    } catch (e) {
      console.error(e);
      return LoginOutput.error('로그인에 실패했습니다.');
    }
  }

  async editProfile(
    me: Member,
    { email }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    if (!email) {
      return EditProfileOutput.ok();
    }
    try {
      me.setEmail(email);
      await this.verificationRepository.save(
        this.verificationRepository.create({ member: me }),
      );
      this.memberRepository.save(me);
      return EditProfileOutput.ok();
    } catch (e) {
      console.error(e);
      return EditProfileOutput.error('프로필 변경에 실패했습니다.');
    }
  }

  async changePassword(
    me: Member,
    { password }: ChangePasswordInput,
  ): Promise<ChangePasswordOutput> {
    try {
      if (password) {
        me.password = password;
        await this.memberRepository.save(me);
        return ChangePasswordOutput.ok();
      }
      return ChangePasswordOutput.error('잘못된 비밀번호 입니다.');
    } catch (e) {
      console.error(e);
      return ChangePasswordOutput.error('프로필 변경에 실패했습니다.');
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verificationRepository.findOne({
        where: { code },
        relations: ['member'],
      });
      if (verification) {
        verification.member.verified = true;
        this.memberRepository.save(verification.member);
      }
    } catch (e) {
      console.error(e);
      return VerifyEmailOutput.error();
    }

    return VerifyEmailOutput.ok();
  }
}
