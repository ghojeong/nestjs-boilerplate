import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

enum MemberRole {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}
registerEnumType(MemberRole, { name: 'MemberRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Member extends CoreEntity {
  @IsEmail()
  @Field(() => String)
  @Column()
  email: string;

  @IsString()
  @Length(3, 100)
  @Field(() => String)
  @Column({ select: false })
  password: string;

  @IsEnum(MemberRole)
  @Field(() => MemberRole, { defaultValue: MemberRole.FREE })
  @Column({ type: 'enum', enum: MemberRole, default: MemberRole.FREE })
  role: MemberRole;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  verified: boolean;

  setEmail(email: string) {
    this.email = email;
    this.verified = false;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) {
      return;
    }
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async checkPassword(loginPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(loginPassword, this.password);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
