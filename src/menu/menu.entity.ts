import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('menu_item')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
