# Как с этим работать? Познавательная инструкция

## 1. Клонируем репозиторий и переходим в папку проекта:

```bash
git clone https://github.com/YanKarpov/Backend-Coffee.git
cd Backend-Coffee
```
## 2. Запускаем контейнеры через Docker Compose:

```bash
docker-compose up --build
```
> **Примечание:**  
> - Контейнеры автоматически подхватывают изменения в коде благодаря volume (`.:/app`).  
> - Пересобирать контейнер (`--build`) нужно только, если изменился `Dockerfile`, `package.json`/`package-lock.json` или базовый образ.



## Работа с API

**Базовый URL:** `http://localhost:3000/`

> На корневой URL (`/`) ничего не возвращается — это просто точка входа приложения.

### Меню

- **GET** `http://localhost:3000/menu` — получить список элементов меню.  
- **POST** `http://localhost:3000/menu` — добавить новый элемент в меню (тело запроса JSON).

Пример тела POST-запроса:

```json
{
  "title": "Тортик",
  "price": 45
}
```

### Заказы

- **GET** `http://localhost:3000/orders` — получить список всех заказов.  
- **POST** `http://localhost:3000/orders` — создать новый заказ (тело запроса JSON).

Пример тела POST-запроса:

```json
{
  "name": "Иван",
  "phone": "+79001234567",
  "addressId": 1,
  "items": [
    { "id": 1, "quantity": 2 },
    { "id": 3, "quantity": 1 }
  ],
  "total": 130
}
```
> При создании заказа сервер проверяет наличие адреса по addressId. Если адрес не найден — вернётся ошибка 400 Bad Request.

### Адреса доставки

- **GET** `/delivery-addresses` — получить список доступных адресов доставки.

Пример ответа:

```json
[
  { "id": 1, "street": "Ленина", "houseNumber": "10" },
  { "id": 2, "street": "Пушкина", "houseNumber": "5" }
]
```
### Telegram уведомления 
После успешного создания заказа бот отправляет сообщение в Telegram в указанный чат/тему супергруппы. 
Необходимые переменные окружения в .env: 
```
TG_BOT_TOKEN=ваш_токен_бота 
TG_CHAT_ID=ид_супергруппы 
TG_THREAD_ID=ид_темы_в_супергруппе
``` 
Текущий Формат сообщения: 
```
📦 Новый заказ: 
Имя: Ян 
Телефон: +79001234567 
Адрес: Ленина, 10 
Сумма: 130 
Товары: 
• id: 1, qty: 2 
• id: 3, qty: 1
```

## Полезные команды для отладки

### Остановить контейнеры
```bash
docker-compose down
```
Подключиться к контейнеру PostgreSQL
```bash
docker exec -it just_coffee_db psql -U admin -d just_coffee
```
После подключения можно выполнять SQL-запросы, например:
```sql
SELECT * FROM menu;
```

## На этом пока всё!
![Кофе с котиком](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b2I4M2UzN3lnM3J1MXd0N2V0NW1zcHV2M29sYWx0Y2hiZzZwdWhjMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VekcnHOwOI5So/giphy.gif)

