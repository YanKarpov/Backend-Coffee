import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryAddress } from './address.entity';

@Injectable()
export class DeliveryService implements OnModuleInit {
  constructor(
    @InjectRepository(DeliveryAddress)
    private readonly addressRepo: Repository<DeliveryAddress>,
  ) {}

  async onModuleInit() {
    const count = await this.addressRepo.count();
    if (count === 0) {
      await this.seedAddresses();
    }
  }

  async getAddresses() {
    return this.addressRepo.find();
  }

  private async seedAddresses() {
    const addresses = [
      { street: 'Лесной проспект', houseNumber: '63' },
      { street: 'Лесной проспект', houseNumber: '65' },
      { street: 'ул. Медиков', houseNumber: '3' },
      { street: 'ул. Медиков', houseNumber: '5' },
      { street: 'ул. Медиков', houseNumber: '7' },
      { street: 'наб. реки Карповки', houseNumber: '5' },
      { street: 'наб. реки Карповки', houseNumber: '7' },
      { street: 'ул. Новолитовская', houseNumber: '15' },
      { street: 'ул. Новолитовская', houseNumber: '16' },
      { street: 'Ленполиграфмаш', houseNumber: '5к1' },
      { street: 'Ленполиграфмаш', houseNumber: '5к2' },
      { street: 'Ленполиграфмаш', houseNumber: '5к3' },
      { street: 'Ленполиграфмаш', houseNumber: '5к4' },
      { street: 'Ленполиграфмаш', houseNumber: '5к5' },
      { street: 'Ленполиграфмаш', houseNumber: '5к6' },
      { street: 'Ленполиграфмаш', houseNumber: '5к7' },
      { street: 'Ленполиграфмаш', houseNumber: '9к2' },
    ];

    await this.addressRepo.save(addresses);
  }
}
