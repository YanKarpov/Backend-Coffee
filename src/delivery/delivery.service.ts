import { Injectable } from '@nestjs/common';
import { DeliveryAddressDto } from './dto/delivery-address.dto';

@Injectable()
export class DeliveryService {
  getAddresses(): DeliveryAddressDto[] {
    return [
      { id: 1, houseNumber: '12' },
      { id: 2, houseNumber: '14' },
      { id: 3, houseNumber: '18' },
    ];
  }
}
