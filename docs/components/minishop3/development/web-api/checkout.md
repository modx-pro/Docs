---
title: Checkout Web API
description: "Доставка, оплата, черновик заказа, cost и submit"
---

# Checkout

Цепочка headless: каталог → корзина → выбор delivery/payment → поля заказа → cost → submit.

## Публичные списки

Без customer token:

| Метод | Путь |
| --- | --- |
| `GET` | `/delivery/list` |
| `GET` | `/delivery/get/{id}` |
| `GET` | `/payment/list` |
| `GET` | `/payment/get/{id}` |

Список только активных способов. Связка delivery↔payment проверяется при оформлении: без пары submit упадёт.

`POST /delivery/webhook/{delivery_id}`: callback провайдера (подпись), не токен покупателя.

## Черновик заказа

Все `/order/*` с auto-mint токена.

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/order/get` | Черновик |
| `POST` | `/order/add` | Одно поле |
| `POST` | `/order/set` | Несколько полей |
| `POST` | `/order/remove` | Удалить поле |
| `POST` | `/order/clean` | Очистить черновик |
| `POST` | `/order/address/set` | Подставить сохранённый адрес |
| `POST` | `/order/address/clean` | Сбросить адрес |
| `GET` | `/order/delivery/validation-rules` | Правила полей по доставке |
| `GET` | `/order/delivery/required-fields` | Обязательные поля |
| `GET` | `/order/cost` | Полный расчёт |
| `GET` | `/order/cost/cart` | Только корзина |
| `GET` | `/order/cost/delivery` | Доставка |
| `GET` | `/order/cost/payment` | Комиссия оплаты |
| `POST` | `/order/submit` | Оформить |

В черновике типичны `delivery_id`, `payment_id`, `address_*` и контактные поля. Точный набор зависит от правил доставки.

## Submit

После успешного `submit` ответ может содержать redirect (страница «Спасибо» / оплата). Читайте `data` и заголовки/поля redirect в `Response` контроллера.

Онлайн-оплату даёт платёжный extra. Базовый способ без class только фиксирует выбор.

## Типичный порядок

1. `GET /delivery/list`, `GET /payment/list`
2. `POST /order/set` с `delivery_id` / `payment_id` и адресом
3. `GET /order/delivery/required-fields` при необходимости
4. `GET /order/cost`
5. `POST /order/submit`

Fenom-витрина может собирать форму через `msOrder`. Headless использует списки выше. См. [Примеры](examples).
