import { Controller, Get } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery-addresses')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  getAddresses() {
    return this.deliveryService.getAddresses();
  }
}
