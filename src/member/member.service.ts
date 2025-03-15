import { Injectable } from '@nestjs/common';
import { Member } from './entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberInput, CreateMemberOutput } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly auth: AuthService,
  ) {}

  async getAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

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
      await this.memberRepository.save(
        this.memberRepository.create(createMemberInput),
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

  async updateMember({ id, data }: UpdateMemberDto) {
    return await this.memberRepository.update(id, data);
  }
}
