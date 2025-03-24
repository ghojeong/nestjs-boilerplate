import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Restaurant } from './entity/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Restaurant])],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
