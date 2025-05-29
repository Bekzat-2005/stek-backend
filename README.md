# Stek Frontend

Это фронтенд-часть проекта **Stek**, подключённая к backend API, развернутому на Render. Проект предоставляет функциональность интернет-магазина с категориями, товарами и системой пользователей.

## 🌐 Демо

Фронтенд: [https://stek-frontend.vercel.app](https://stek-frontend.vercel.app)  
Бэкенд: `https://stek-backend.onrender.com/api`

---

## 📦 Backend API

Все запросы отправляются на:

**Base URL:** `https://stek-backend.onrender.com/api`

---

### 🛍️ Продукты

| Метод | Endpoint             | Описание                        |
|-------|----------------------|---------------------------------|
| GET   | `/products`          | Получить список всех товаров   |
| GET   | `/products/:id`      | Получить товар по ID           |
| POST  | `/products`          | Добавить новый товар           |
| PUT   | `/products/:id`      | Обновить товар по ID           |
| DELETE| `/products/:id`      | Удалить товар по ID            |

---

### 📂 Категории

| Метод | Endpoint             | Описание                             |
|-------|----------------------|--------------------------------------|
| GET   | `/categories`        | Получить список всех категорий       |
| GET   | `/categories/:id`    | Получить категорию по ID             |
| POST  | `/categories`        | Добавить новую категорию             |
| PUT   | `/categories/:id`    | Обновить категорию по ID             |
| DELETE| `/categories/:id`    | Удалить категорию по ID              |

---

### 👤 Пользователи

| Метод | Endpoint              | Описание                          |
|-------|-----------------------|-----------------------------------|
| POST  | `/auth/register`      | Регистрация нового пользователя  |
| POST  | `/auth/login`         | Вход пользователя                 |
| GET   | `/users`              | Получить всех пользователей (admin) |
| GET   | `/users/:id`          | Получить пользователя по ID       |
| DELETE| `/users/:id`          | Удалить пользователя (admin)      |

---

### 🔐 Авторизация

Для защищённых маршрутов необходимо передавать JWT токен:

```
Authorization: Bearer <your-token>
```

---

## 👥 Участники

- [@Nursultan](https://github.com/nurik-zh)
- [@bekzat]([https://github.com/Bekzat-2005)
- [@Nurbol](https://github.com/Nurbol05)
