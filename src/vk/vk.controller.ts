import { Controller, Get } from '@nestjs/common';
import { VkService } from './vk.service';

@Controller('vk')
export class VkController {
  constructor(private readonly vkService: VkService) {}

  @Get('photos')
  async getPhotos() {
    const photos = await this.vkService.getPhotos();
    return { photos };
  }
}
