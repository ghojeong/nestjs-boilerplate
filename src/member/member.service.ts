import { Injectable } from '@nestjs/common';
import { Member } from './entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberInput } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MutationOutput } from 'src/common/dto/output.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  getAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  async createMember(
    createMemberInput: CreateMemberInput,
  ): Promise<MutationOutput> {
    try {
      if (
        await this.memberRepository.exists({
          where: { email: createMemberInput.email, isDeleted: false },
        })
      ) {
        return MutationOutput.error('이미 존재하는 계정입니다.');
      }
      await this.memberRepository.save(
        this.memberRepository.create(createMemberInput),
      );
      return MutationOutput.ok();
    } catch (e) {
      console.error(e);
      return MutationOutput.error('계정 생성에 실패했습니다.');
    }
  }

  updateMember({ id, data }: UpdateMemberDto) {
    return this.memberRepository.update(id, data);
  }
}
