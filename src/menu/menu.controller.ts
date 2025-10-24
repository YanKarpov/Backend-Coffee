import { Controller, Get, Post, Body } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from './menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll(): Promise<MenuItem[]> {
    return this.menuService.findAll();
  }

  @Post()
  create(@Body() item: Partial<MenuItem>) {
    return this.menuService.create(item);
  }
}
