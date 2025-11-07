/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

interface OrderItem {
  id: number;
  quantity: number;
}

interface OrderWithAddress {
  name: string;
  phone: string;
  total: number;
  items: OrderItem[];
  address: {
    street: string;
    houseNumber: string;
  };
}

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private chatId: string;
  private threadId: number;

  constructor() {
    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;
    const threadId = process.env.TG_THREAD_ID;

    if (!token || !chatId || !threadId) {
      throw new InternalServerErrorException(
        'Не указан TG_BOT_TOKEN, TG_CHAT_ID или TG_THREAD_ID в .env',
      );
    }

    this.bot = new TelegramBot(token, { polling: false });
    this.chatId = chatId;
    this.threadId = Number(threadId);
  }

  async sendOrderMessage(order: OrderWithAddress): Promise<void> {
    const items = order.items
      .map((i) => `• id: ${i.id}, qty: ${i.quantity}`)
      .join('\n');

    const message = `
📦 Новый заказ:
Имя: ${order.name}
Телефон: ${order.phone}
Адрес: ${order.address.street}, ${order.address.houseNumber}
Сумма: ${order.total}
Товары:
${items}
`;

    try {
      await this.bot.sendMessage(this.chatId, message, {
        message_thread_id: this.threadId,
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Ошибка при отправке в Telegram: ' + (err as Error).message,
      );
    }
  }
}
