import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { DeliveryAddress } from '../delivery/address.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(DeliveryAddress)
    private readonly addressRepo: Repository<DeliveryAddress>,
    private readonly telegramService: TelegramService, // <-- добавили
  ) {}

  async createOrder(orderData: CreateOrderDto) {
    const address = await this.addressRepo.findOneBy({
      id: orderData.addressId,
    });

    if (!address) {
      throw new BadRequestException(
        `Адрес с id=${orderData.addressId} не найден`,
      );
    }

    const newOrder = this.orderRepo.create({
      name: orderData.name,
      phone: orderData.phone,
      address,
      items: orderData.items,
      total: orderData.total,
    });

    await this.orderRepo.save(newOrder);

    // Отправка заказа в Telegram
    await this.telegramService.sendOrderMessage({
      name: newOrder.name,
      phone: newOrder.phone,
      items: newOrder.items,
      total: newOrder.total,
      address: {
        street: address.street,
        houseNumber: address.houseNumber,
      },
    });

    return { success: true, orderId: newOrder.id };
  }

  async getAllOrders() {
    return this.orderRepo.find({ relations: ['address'] });
  }
}
