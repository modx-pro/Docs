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

Webhooks провайдеров (подпись handler’а, не customer token). Префикс API: `/api/v1`.

| Метод | Путь | Условие |
| --- | --- | --- |
| `POST` | `/delivery/webhook/{delivery_id}` | Handler доставки + при `ms3_shipment_enabled=0` → 404 |
| `POST` | `/payment/webhook/{payment_method_id}` | Нужен `PaymentWebhookHandlerInterface`, иначе 400 |

Оплата: JSON body → `verifyWebhook` → `parseWebhook` → `PaymentLifecycleService::applyWebhook`. Ответ success: `attempt_id`, `status`, `order_id`. Классические `webhook.php` / `callback.php` у платёжных extras остаются валидны, если класс не реализует интерфейс Web API.

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

### Какие поля витрина менять не вправе

С 1.14.2-beta1 служебные колонки черновика закрыты для записи с витрины. До этого `/order/add` принимал любой ключ с одноимённой колонкой: посетитель с токеном своей корзины мог подставить чужой `customer_id` или обнулить `cost`.

| Объект | Закрытые колонки |
| --- | --- |
| Заказ | `id`, `user_id`, `customer_id`, `token`, `uuid`, `idempotency_key`, `createdon`, `updatedon`, `num`, `cost`, `cart_cost`, `delivery_cost`, `weight`, `status_id`, `context`, `properties` |
| Адрес | `id`, `order_id`, `createdon`, `updatedon`, `properties` |

Писать можно поля формы (`delivery_id`, `payment_id`, `order_comment`), остальные колонки адреса и свои колонки, добавленные через дополнительные поля. Ключи, которых нет ни у заказа, ни у адреса, по-прежнему уходят в `properties['_validated']`.

Реакция на закрытый ключ:

| Запрос | Ответ |
| --- | --- |
| `POST /order/add` | `400`, `error_code: business_rule`, лексикон `ms3_err_field_protected` |
| `POST /order/set` | `422`, `error_code: validation_failed`, ключ попадает в `errors` |
| `POST /order/remove` | `404`, лексикон `ms3_err_field_nf` |
| `POST /order/submit` | ключ в `data` отбрасывается молча, оформление продолжается |

::: tip Запись служебного поля из дополнения
Перечень закрытых колонок задан константами `OrderFieldManager`. Чтобы изменить его, подмените DI-ключ `ms3_order_field_manager` своим подклассом в [`core/config/ms3.services.d/*.php`](/components/minishop3/development/services) — этот каталог лежит вне компонента и переживает обновление. Из PHP служебные поля доступны и без подмены: `OrderDraftManager::updateField()`, `attachCustomer()`, `setDeliveryCost()`.
:::

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
