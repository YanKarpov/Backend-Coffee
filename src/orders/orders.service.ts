import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  createOrder(orderData: CreateOrderDto) {
    console.log('New order received:', orderData);

    return { success: true, message: 'Order received' };
  }
}
