---
title: Клиент Web API
description: "Профиль, адреса, заказы ЛК, email verify, me и refresh"
---

# Клиент

ЛК и профиль покупателя. Auth-потоки: [Авторизация](auth).

## Сессия

| Метод | Путь | Заметки |
| --- | --- | --- |
| `GET` | `/customer/me` | `authenticated`, `customer`, token meta |
| `POST` | `/customer/token/refresh` | Ротация |
| `POST` | `/customer/logout` | optional token |
| `POST` | `/customer/login` | без middleware |
| `POST` | `/customer/register` | без middleware |
| `POST` | `/customer/forgot-password` | |
| `POST` | `/customer/reset-password` | |

## Профиль

| Метод | Путь | Заметки |
| --- | --- | --- |
| `PUT` | `/customer/profile` | |
| `POST` | `/customer/add` | Быстрое одно поле |
| `POST` | `/customer/changeAddress` | Адрес в черновик заказа |

Поля профиля режутся allowlist / validation на сервере. Невалидный или гостевой токен без покупателя → ошибка авторизации.

## Адреса

| Метод | Путь |
| --- | --- |
| `GET` | `/customer/addresses` |
| `GET` | `/customer/addresses/{id}` |
| `POST` | `/customer/addresses` |
| `PUT` | `/customer/addresses/{id}` |
| `DELETE` | `/customer/addresses/{id}` |
| `PUT` | `/customer/addresses/{id}/set-default` |

## Заказы ЛК

| Метод | Путь |
| --- | --- |
| `GET` | `/customer/orders` |
| `GET` | `/customer/orders/{id}` |
| `POST` | `/customer/orders/{id}/cancel` |

Оформленные заказы покупателя, не черновик `/order/get`.

## Email

| Метод | Путь | Заметки |
| --- | --- | --- |
| `GET` | `/customer/email/verify` | Публичный; query token; `html=1` для страницы |
| `POST` | `/customer/email/resend-verification` | Нужен авторизованный токен |

Кастомный URL письма: `ms3_email_verification_url`. Иначе ссылка ведёт на `api.php?route=…/email/verify`.

## Связанные страницы

- [Frontend: авторизация](/components/minishop3/frontend/customer-auth)
- [Карта](endpoints)
- [Примеры](examples)
