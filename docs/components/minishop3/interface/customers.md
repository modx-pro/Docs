---
title: Клиенты
description: Справочник покупателей msCustomer в менеджере MiniShop3
---
# Клиенты

Откройте **Extras → MiniShop3 → Клиенты**. Здесь грид `CustomersGrid` и диалоги правки профиля и адресов.

![Клиенты](/components/minishop3/screenshots/mgr-customers.png)

## Список

В строках видны email, имя, телефон, даты и флаги верификации (если колонки включены в конфигурации грида). Поиск и пагинация идут через `/api/mgr/customers`. Массовое удаление: `DELETE /api/mgr/customers/bulk` (право `msorder_remove`).

Права клиентов (не путать с заказами): список — `msorder_list`, **карточка клиента** — `msorder_view`, правка — `msorder_save`, удаление — `msorder_remove`. Карточка **заказа** читается с `msorder_list`, пишется с `msorder_save`.

## Профиль

Кликните строку или действие «Изменить». В диалоге правятся поля `msCustomer`: имя, email, телефон и editable-расширения Object Extension. Сохранение уходит в Manager REST.

## Адреса

Отдельный диалог работает с адресами покупателя:

| Метод | Путь |
| --- | --- |
| `GET` | `/api/mgr/customers/{id}/addresses` |
| `POST` | `/api/mgr/customers/{id}/addresses` |
| `PUT` | `/api/mgr/customers/{id}/addresses/{addressId}` |
| `DELETE` | `/api/mgr/customers/{id}/addresses/{addressId}` |

Те же адреса покупатель видит на витрине: [Адреса доставки](/components/minishop3/frontend/customer-addresses).

## Связь с заказами

У заказа есть `customer_id`. В гриде заказов можно показать колонку покупателя и перейти к карточке. На витрине гостя можно превратить в покупателя при оформлении, если включён `ms3_customer_auto_register_on_order`.

## Sync с modUser

Ключ `ms3_customer_sync_enabled` связывает `msCustomer` с `modUser`. Тогда регистрация и правки профиля могут создавать или обновлять пользователя MODX. Для обычного магазина на токене MS3 sync не нужен.

## См. также

- [Вход и регистрация](/components/minishop3/frontend/customer-auth)
- [Заказы](/components/minishop3/interface/orders)
- [Backend API покупателя](/components/minishop3/development/backend-api/customer)
