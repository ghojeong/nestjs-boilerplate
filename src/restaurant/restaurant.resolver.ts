import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dto/create-restaurant.dto';
import { AuthMember } from 'src/auth/auth.decorator';
import { Member } from 'src/member/entity/member.entity';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => CreateRestaurantOutput)
  @UseGuards(AuthGuard)
  createRestaurant(
    @AuthMember() me: Member,
    @Args('input') input: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(me, input);
  }
}
