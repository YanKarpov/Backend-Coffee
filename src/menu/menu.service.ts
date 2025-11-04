import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu.entity';

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuRepository: Repository<MenuItem>,
  ) {}

  async onModuleInit() {
    const count = await this.menuRepository.count();
    if (count === 0) {
      const items = [
        {
          title: 'Эспрессо',
          price: 120,
          description: 'Классический чёрный кофе с насыщенным вкусом',
        },
        {
          title: 'Капучино',
          price: 180,
          description: 'Эспрессо с горячим молоком и густой молочной пеной',
        },
        {
          title: 'Латте',
          price: 200,
          description: 'Мягкий кофейный напиток с большим количеством молока',
        },
      ];
      await this.menuRepository.save(items);
      console.log('Данные успешно добавлены');
    }
  }

  findAll() {
    return this.menuRepository.find();
  }

  async create(item: Partial<MenuItem>) {
    const newItem = this.menuRepository.create(item);
    return this.menuRepository.save(newItem);
  }
}
