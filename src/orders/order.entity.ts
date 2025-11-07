import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DeliveryAddress } from '../delivery/address.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @ManyToOne(() => DeliveryAddress, { eager: true })
  @JoinColumn({ name: 'addressId' })
  address: DeliveryAddress;

  @Column('json')
  items: { id: number; quantity: number }[];

  @Column()
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
