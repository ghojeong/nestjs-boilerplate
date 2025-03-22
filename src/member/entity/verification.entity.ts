import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Member } from './member.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @IsString()
  @Field(() => String)
  @Column()
  code: string;

  @OneToOne(() => Member)
  @JoinColumn()
  member: Member;

  @BeforeInsert()
  createCode(): void {
    this.code = Math.random().toString(36).substring(2);
  }
}
