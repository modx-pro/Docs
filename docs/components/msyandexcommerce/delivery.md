---
title: Доставка
description: Тарифы YCP, delivery_options и копейки в price
---

# Доставка

Яндекс запрашивает тарифы отдельно: `POST /api/v1/checkout/delivery/options`. `basket/check` считает только товары.

Кабинет Яндекса тариф не считает. Ответ собирает пакет, затем плагин на сайте может его заменить.

## Слоты по умолчанию

Настройки `delivery_courier_id` / `delivery_pickup_id` — id активных `msDelivery`.

| Настройка | type в ответе |
|-----------|----------------|
| `msyandexcommerce_delivery_courier_id` > 0 | `courier` |
| `msyandexcommerce_delivery_pickup_id` > 0 | `pickup` |

Один и тот же `msDelivery` id в обеих настройках даёт два option с разными `type` и одинаковым `id`.

Если оба id = 0, в ответ попадают все активные `msDelivery` с `type=courier`.

Неактивный или отсутствующий `msDelivery` пакет пропускает. Если после фильтра список пуст, ответ `422 NO_DELIVERY`.

## Стоимость по умолчанию

Пакет вызывает `Ms2Gateway::calculateDeliveryCost($deliveryId, $cartCost, $weight)`:

1. Берёт активный `msDelivery`.
2. Если `free_delivery_amount` > 0 и сумма корзины ≥ порога, цена 0.
3. Иначе `price` (число или процент от корзины) плюс `weight_price * weight`.

Живой корзины `$ms2->order` нет. Класс доставки и его `getCost()` пакет не вызывает.

`price` в JSON уходит в копейках: `ProductMapper::toMinor()` (`350.00` ₽ → `35000`).

Адрес для расчёта и заказа: `InboundNormalizer::addressForMs2()`.

## Сроки

В miniShop2 дат нет. Пакет не добавляет `getDates()`.

Календарные дни (не рабочие):

| Ключ | По умолчанию | Смысл |
|------|--------------|--------|
| `msyandexcommerce_delivery_offset_days` | `0` | Сдвиг старта от сегодня |
| `msyandexcommerce_delivery_days_min` | `1` | Дней после старта до `date_from` |
| `msyandexcommerce_delivery_days_max` | `3` | Дней после старта до `date_to` |

Формула: `start = сегодня + offset`, затем `date_from = start + min`, `date_to = start + max`. Если max < min, пакет поднимает max до min.

Пример при «сегодня» = 2026-09-23, offset `0`, min `1`, max `3`: `date_from` = `2026-09-24`, `date_to` = `2026-09-26`.

Имена полей живут в `DeliveryDateMapper`. После первого живого ответа кабинета на `delivery/options` их правят в одном месте.

## Форма option

```json
{
  "id": "5",
  "title": "Доставка по Москве",
  "type": "courier",
  "price": 35000,
  "currency": "RUB",
  "date_from": "2026-09-24",
  "date_to": "2026-09-26"
}
```

| Поле | Кто ставит | Замечание |
|------|------------|-----------|
| `id` | пакет / плагин | строка. Нужен, иначе строка отбрасывается |
| `title` | имя `msDelivery` или плагин | |
| `type` | `courier` или `pickup` | |
| `price` | копейки | не рубли |
| `currency` | `RUB` | |
| `date_from`, `date_to` | `Y-m-d` | плагин может переписать |

Плагин может добавить свои поля. Пакет их не вычищает. Кабинет лишнее проигнорирует или сломается. Сверяйте с логом первого живого запроса.

## Событие `ms2ycpOnDeliveryOptions`

После слотов по умолчанию (уже с датами) пакет вызывает событие. Resolver регистрирует его на install/upgrade (`_build/elements/events.php`).

В менеджере: **Элементы** → **Плагины** → новый плагин → вкладка **Системные события** → `ms2ycpOnDeliveryOptions`.

Параметры (`$modx->event->params` / `$scriptProperties`):

| Ключ | Тип | Содержание |
|------|-----|------------|
| `body` | array | сырое JSON-тело Yandex |
| `address` | array | поля как у `msOrderAddress`: `receiver`, `phone`, `email`, `country`, `index`, `region`, `city`, `street`, `building`, `room`, `entrance`, `floor`, `comment`, `text_address` |
| `items` | list | `offer_id` (int), `count` (int ≥ 1) |
| `cart_cost` | float | сумма в рублях |
| `weight` | float | суммарный вес из `msProductData.weight` |
| `options` | list | текущий ответ пакета |

Как вернуть список:

```php
$modx->event->returnedValues['options'] = $options;
```

Пакет также примет `returnedValues` как сам список, если нулевой элемент содержит `id`.

Строки без `id` отбрасываются. Пустой или битый возврат пакет игнорирует и оставляет слоты по умолчанию.

Пакет сессию заказа MS2 не поднимает и `ms_CDEK2` не знает. Если классу доставки нужен `getCost()`, плагин сам собирает заглушку заказа. На create для этого есть `Ms2OrderBagStub` (`get()` по ключу).

Примеры: [plugins](plugins).
