import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dto/core-output.dto';
import { Restaurant } from '../entity/restaurant.entity';
import { IsString } from 'class-validator';

@InputType()
export class CreateRestaurantInput extends OmitType(
  Restaurant,
  ['category', 'owner', 'id', 'isDeleted', 'createdAt', 'updatedAt'],
  InputType,
) {
  @Field(() => String)
  @IsString()
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends MutationOutput {
  static ok = MutationOutput.defaultOk;
  static error = MutationOutput.defaultError;
}
