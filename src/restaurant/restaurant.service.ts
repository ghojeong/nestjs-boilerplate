import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dto/create-restaurant.dto';
import { Member } from 'src/member/entity/member.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async createRestaurant(
    owner: Member,
    input: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurantRepository.create(input);
      newRestaurant.owner = owner;
      await this.restaurantRepository.save(newRestaurant);
      return CreateRestaurantOutput.ok();
    } catch (e) {
      console.error(e);
      return CreateRestaurantOutput.error();
    }
  }
}
