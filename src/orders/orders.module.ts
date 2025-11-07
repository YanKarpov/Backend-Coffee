import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { DeliveryAddress } from '../delivery/address.entity';
import { TelegramService } from '../telegram/telegram.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, DeliveryAddress])],
  providers: [OrdersService, TelegramService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
