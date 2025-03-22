import { Module } from '@nestjs/common';
import { MemberResolver } from './member.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entity/member.entity';
import { MemberService } from './member.service';
import { Verification } from './entity/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Verification])],
  providers: [MemberResolver, MemberService],
  exports: [MemberService],
})
export class MemberModule {}
