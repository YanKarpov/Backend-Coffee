import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async createOrder(orderData: CreateOrderDto) {
    const newOrder = this.orderRepo.create({
      name: orderData.name,
      phone: orderData.phone,
      addressId: orderData.addressId,
      items: orderData.items,
      total: orderData.total,
    });

    await this.orderRepo.save(newOrder);

    return { success: true, orderId: newOrder.id };
  }

  async getAllOrders() {
    return this.orderRepo.find();
  }
}
