import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { UserService } from 'src/auth/user/user.service';
import { Repository } from 'typeorm';
import { Dish } from './dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, dish: CreateDishDto) {
    const user = await this.userService.getOneById(userId);
    const slug = await this.generateSlug(dish.name);
    return this.dishRepository.save({
      ...dish,
      user,
      slug,
    });
  }

  read(): Promise<Dish[]> {
    return this.dishRepository.find();
  }

  async getOneById(id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne(id, {
      relations: ['products'],
    });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return dish;
  }

  async update(dish: UpdateDishDto) {
    await this.getOneById(dish.id);
    return this.dishRepository.update(dish.id, dish);
  }

  async delete(dishId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(dishId);
    return this.dishRepository.remove(dishToRemove);
  }

  async generateSlug(name: string) {
    let slug = slugify(name, {
      replacement: '-',
      lower: true,
    });
    const exists = await this.findSlugs(slug);

    if (!exists || exists.length === 0) {
      return slug;
    }

    slug = `${slug}-${exists.length}`;
    return slug;
  }

  private async findSlugs(slug: string) {
    return this.dishRepository
      .createQueryBuilder('dish')
      .where('slug LIKE :slug', { slug: `${slug}%` })
      .getMany();
  }
}
