---
title: msYandexDelivery
description: Доставка через Yandex Delivery Platform API (other-day) для MiniShop3 — расчёт, ПВЗ, заявки в менеджере
author: modx-pro
dependencies: [miniShop3, VueTools]
categories: minishop3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Чекаут и сниппеты', link: 'checkout' },
  { text: 'Заявки и менеджер', link: 'integration' },
  { text: 'FAQ', link: 'faq' },
]
---

# msYandexDelivery

**msYandexDelivery** подключает [Yandex Delivery Platform API](https://yandex.com/support/delivery-profile/ru/api/other-day/) («Доставка по России», other-day) к [MiniShop3](/components/minishop3/) на MODX 3. Покупатель считает стоимость и выбирает доставку до двери или ПВЗ на чекауте. Менеджер создаёт и подтверждает заявку в Яндексе и обновляет статус опросом API.

Пространство имён: **`msyandexdelivery`**. Класс доставки: `msyandexdelivery\Delivery\YandexDelivery`. Webhook статусов **нет**. Статус обновляется опросом через `request/info`.

С чего начать: [Быстрый старт](quick-start).

## Возможности

- Расчёт стоимости через `pricing-calculator` (тарифы `time_interval` и `self_pickup`).
- Официальный виджет ПВЗ v2 на чекауте (`widget-pvz.dostavka.yandex.net`).
- Сохранение выбора в `msOrder.properties.msyandexdelivery` и таблице `msyandex_requests`.
- Подстановка стоимости через `msOnGetDeliveryCost` и `YandexDelivery::getCost()`.
- CMP на VueTools: тест соединения, тест расчёта, журнал HTTP.
- Вкладка заказа MiniShop3: create → confirm → refresh status.

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | >= 3.0.3 |
| PHP | >= 8.2 |
| MiniShop3 | >= 1.0.0 |
| VueTools | для CMP и вкладки заказа |

## Способы доставки при установке

Resolver создаёт два способа с классом `msyandexdelivery\Delivery\YandexDelivery`:

| Тариф | Название в MS3 |
| --- | --- |
| `time_interval` | Яндекс Доставка — до двери |
| `self_pickup` | Яндекс Доставка — ПВЗ |

ID записываются в `msyandexdelivery_delivery_id` (через запятую). Активные способы оплаты связываются автоматически. Способы оплаты пакет **не** создаёт.

## Установка

1. Установите MiniShop3 и VueTools.
2. Установите пакет **msYandexDelivery**.
3. Очистите кэш MODX.
4. В **Системные настройки → `msyandexdelivery`** задайте обязательный [`base_url`](settings), токен и склад отправителя.
5. Включите `msyandexdelivery_enabled` и способы доставки в MiniShop3.
6. На странице чекаута вызовите сниппеты и контейнер виджета — см. [Чекаут](checkout).

Если transport зашифрован через EncryptedVehicle, в «Управление пакетами» нужен провайдер [modstore.pro](https://modstore.pro/extras/). Иначе установка падает с `Package provider not found`.

## Разделы

| Страница | Содержание |
| --- | --- |
| [Быстрый старт](quick-start) | Ключи API, тест, чекаут |
| [Системные настройки](settings) | Все ключи `msyandexdelivery_*` |
| [Чекаут и сниппеты](checkout) | `msYandexDelivery`, `msydLexiconScript`, виджет |
| [Заявки и менеджер](integration) | Create / Confirm / Refresh, connector |
| [FAQ](faq) | Частые ошибки и ограничения |
