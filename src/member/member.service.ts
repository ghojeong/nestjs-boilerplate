import { Injectable } from '@nestjs/common';
import { Member } from './entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  getAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberRepository.save(
      this.memberRepository.create(createMemberDto),
    );
  }

  updateMember({ id, data }: UpdateMemberDto) {
    return this.memberRepository.update(id, data);
  }
}
