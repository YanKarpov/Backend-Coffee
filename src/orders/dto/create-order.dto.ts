export class CreateOrderDto {
  name: string;
  phone: string;
  addressId: number;
  items: { id: number; quantity: number }[];
  total: number;
}
