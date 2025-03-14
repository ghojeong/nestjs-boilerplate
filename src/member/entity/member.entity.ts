import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Member {
  @IsNumber()
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Field(() => String, { nullable: true, defaultValue: 'anonymous' })
  @Column()
  name: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @Column({ default: false })
  isPrivate: boolean;

  @IsString()
  @Field(() => String)
  @Column()
  address: string;

  @IsString()
  @Length(5, 10)
  @Field(() => String)
  @Column()
  firstName: string;

  @IsString()
  @Length(2, 8)
  @Field(() => String)
  @Column()
  lastName: string;
}
