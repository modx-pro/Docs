---
title: Быстрый старт
description: Установка msYandexDelivery, Base URL, токен, склад и проверка на чекауте
---

# Быстрый старт

## Шаг 1. Установка

1. Установите [MiniShop3](/components/minishop3/) и **VueTools**.
2. Установите пакет **msYandexDelivery**.
3. Очистите кэш MODX.

Resolver создаст таблицу `msyandex_requests`, настройки namespace `msyandexdelivery` и два способа доставки («до двери» / «ПВЗ»). Меню компонента открывает только системные настройки. Отдельного CMP нет.

## Шаг 2. Base URL и доступ к API

Ориентиры:

| Окружение | Пример `msyandexdelivery_base_url` |
| --- | --- |
| Test | `https://b2b.taxi.tst.yandex.net` |
| Production | `https://b2b-authproxy.taxi.yandex.net` |

Метка `msyandexdelivery_environment` (`test` / `prod`) влияет только на подсказки в UI. На выбор host она **не** влияет.

Заполните:

| Ключ | Назначение |
| --- | --- |
| `msyandexdelivery_base_url` | Host Platform API (обязателен) |
| `msyandexdelivery_oauth_token` | Bearer-токен |
| `msyandexdelivery_platform_station_id` | ID склада отправителя (точка A) |
| `msyandexdelivery_enabled` | `Да` |

Для карты ПВЗ задайте `msyandexdelivery_widget_geo_id` (например `213` для Москвы) или оставьте пустым: город возьмётся из адреса заказа.

## Шаг 3. Чекаут

В чанк оформления заказа добавьте:

::: code-group

```modx
[[!msydLexiconScript]]
[[!msYandexDelivery]]
<div data-msyd-widget></div>
```

```fenom
{'!msydLexiconScript' | snippet}
{'!msYandexDelivery' | snippet}
<div data-msyd-widget></div>
```

:::

Включите способы **Яндекс Доставка — до двери** и **Яндекс Доставка — ПВЗ** в MiniShop3.

Проверьте:

1. Тариф «до двери» → адрес в форме MS3 → «Рассчитать» → цена в виджете.
2. Тариф «ПВЗ» → карта → выбор точки → цена в виджете.
3. Новый заказ: `delivery_cost` близок к `properties.msyandexdelivery.price`.
4. В менеджере на вкладке заказа: **Create** → **Confirm** → **Refresh status**. При необходимости **Отменить**.

![Вкладка Yandex Delivery на карточке заказа](/components/msyandexdelivery/screenshots/mgr-order-tab.png)

При `msyandexdelivery_log_enabled` журнал пишется в `core/cache/msyandexdelivery_requests.log` без секретов.

Подробности UI: [Чекаут](checkout). Жизненный цикл заявки: [Заявки и менеджер](integration).
