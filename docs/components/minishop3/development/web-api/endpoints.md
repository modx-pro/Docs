---
title: Карта эндпоинтов
description: "Полная таблица Web API MiniShop3 = config/routes/web.php"
---

# Карта эндпоинтов

Полная таблица путей. Источник: `core/components/minishop3/config/routes/web.php`. Префикс путей: `/api/v1`. Вызов: `api.php?route=/api/v1/...`.

Колонка «Токен»:

| Значение | Смысл |
| --- | --- |
| нет | `TokenMiddleware` на роуте нет |
| auto-mint | Middleware есть: без валидного токена сервер создаёт гостевой |
| optional | Middleware есть, путь в `publicRoutes`: без токена не mint и не 401 |

Тела запросов и ответы: [auth](auth), [catalog](catalog), [cart](cart), [checkout](checkout), [customer](customer).

## Cart

| Метод | Путь | Токен | Назначение |
| --- | --- | --- | --- |
| `POST` | `/cart/add` | auto-mint | Добавить товар |
| `POST` | `/cart/remove` | auto-mint | Удалить позицию |
| `POST` | `/cart/change` | auto-mint | Изменить количество |
| `POST` | `/cart/change-option` | auto-mint | Изменить опции позиции |
| `GET` | `/cart/get` | auto-mint | Содержимое корзины |
| `POST` | `/cart/clean` | auto-mint | Очистить |

## Order

| Метод | Путь | Токен | Назначение |
| --- | --- | --- | --- |
| `GET` | `/order/get` | auto-mint | Черновик заказа |
| `POST` | `/order/add` | auto-mint | Одно поле черновика |
| `POST` | `/order/set` | auto-mint | Несколько полей |
| `POST` | `/order/remove` | auto-mint | Удалить поле |
| `POST` | `/order/submit` | auto-mint | Оформить |
| `POST` | `/order/clean` | auto-mint | Очистить черновик |
| `GET` | `/order/cost` | auto-mint | Полная стоимость |
| `GET` | `/order/cost/cart` | auto-mint | Стоимость корзины |
| `GET` | `/order/cost/delivery` | auto-mint | Стоимость доставки |
| `GET` | `/order/cost/payment` | auto-mint | Комиссия оплаты |
| `POST` | `/order/address/set` | auto-mint | Адрес из сохранённых |
| `POST` | `/order/address/clean` | auto-mint | Сбросить адрес черновика |
| `GET` | `/order/delivery/validation-rules` | auto-mint | Правила полей доставки |
| `GET` | `/order/delivery/required-fields` | auto-mint | Обязательные поля |

## Customer

| Метод | Путь | Токен | Назначение |
| --- | --- | --- | --- |
| `POST` | `/customer/login` | нет | Вход |
| `POST` | `/customer/register` | нет | Регистрация |
| `GET` | `/customer/me` | auto-mint | Сессия / профиль токена |
| `POST` | `/customer/logout` | optional | Выход |
| `POST` | `/customer/forgot-password` | нет | Запрос сброса |
| `POST` | `/customer/reset-password` | нет | Сброс по токену письма |
| `POST` | `/customer/add` | auto-mint | Быстрое поле профиля |
| `GET` | `/customer/token/get` | нет | Гостевой / текущий API-токен |
| `POST` | `/customer/token/refresh` | auto-mint | Ротация токена |
| `GET` | `/customer/addresses` | auto-mint | Список адресов |
| `GET` | `/customer/addresses/{id}` | auto-mint | Один адрес |
| `POST` | `/customer/addresses` | auto-mint | Создать |
| `PUT` | `/customer/addresses/{id}` | auto-mint | Обновить |
| `DELETE` | `/customer/addresses/{id}` | auto-mint | Удалить |
| `PUT` | `/customer/addresses/{id}/set-default` | auto-mint | Адрес по умолчанию |
| `PUT` | `/customer/profile` | auto-mint | Профиль |
| `POST` | `/customer/changeAddress` | auto-mint | Адрес в черновик заказа |
| `POST` | `/customer/email/resend-verification` | auto-mint | Повтор письма |
| `GET` | `/customer/email/verify` | нет | Подтверждение email |
| `GET` | `/customer/orders` | auto-mint | Заказы ЛК |
| `GET` | `/customer/orders/{id}` | auto-mint | Карточка заказа |
| `POST` | `/customer/orders/{id}/cancel` | auto-mint | Отмена |

ЛК-эндпоинты с auto-mint требуют покупателя в токене: иначе контроллер вернёт unauthorized / business error. См. [Клиент](customer).

## Product (публичный)

| Метод | Путь | Токен | Назначение |
| --- | --- | --- | --- |
| `GET` | `/product/get` | нет | Resolve по `alias` / `uri` |
| `GET` | `/product/get/{id}` | нет | Товар по ID |
| `GET` | `/product/list` | нет | Список / PLP |
| `GET` | `/product/filters` | нет | Фасеты |
| `GET` | `/product/{id}/images` | нет | Галерея |

## Category (публичный)

| Метод | Путь | Токен | Назначение |
| --- | --- | --- | --- |
| `GET` | `/category/get` | нет | Resolve по `alias` / `uri` |
| `GET` | `/category/get/{id}` | нет | Категория по ID |
| `GET` | `/category/list` | нет | Список |
| `GET` | `/category/tree` | нет | Дерево |

## Delivery / Payment (публичный)

| Метод | Путь | Токен | Назначение |
| --- | --- | --- | --- |
| `GET` | `/delivery/get/{id}` | нет | Способ доставки |
| `GET` | `/delivery/list` | нет | Активные доставки |
| `POST` | `/delivery/webhook/{delivery_id}` | нет | Webhook провайдера (подпись, не customer token) |
| `GET` | `/payment/get/{id}` | нет | Способ оплаты |
| `GET` | `/payment/list` | нет | Активные оплаты |

## Health

| Метод | Путь | Токен | Назначение |
| --- | --- | --- | --- |
| `GET` | `/health` | нет | Статус API |

Программное создание заказа из PHP (cron/extra) это не Web HTTP: [ProgrammaticOrderService](/components/minishop3/development/backend-api/order#программное-создание-заказа-programmaticorderservice).
