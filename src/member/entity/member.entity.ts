import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity } from 'typeorm';

enum MemberRole {
  FREE,
  PREMIUM,
}
registerEnumType(MemberRole, { name: 'MemberRole' });

@ObjectType()
@Entity()
export class Member extends CoreEntity {
  @IsString()
  @Length(3, 100)
  @Field(() => String)
  @Column()
  email: string;

  @IsString()
  @Field(() => String)
  @Column()
  password: string;

  @IsString()
  @Field(() => MemberRole, { defaultValue: MemberRole.FREE })
  @Column({ type: 'enum', enum: MemberRole, default: MemberRole.FREE })
  role: MemberRole;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @Column({ default: false })
  isPrivate: boolean;
}
