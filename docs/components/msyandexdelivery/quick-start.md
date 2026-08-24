---
title: Быстрый старт
description: Установка msYandexDelivery, Base URL, токен, склад и проверка на чекауте
---

# Быстрый старт

## Шаг 1. Установка

1. Установите [MiniShop3](/components/minishop3/) и **VueTools**.
2. Установите пакет **msYandexDelivery**.
3. Очистите кэш MODX.

Resolver создаст таблицу `msyandex_requests`, настройки namespace `msyandexdelivery` и два способа доставки («до двери» / «ПВЗ»).

## Шаг 2. Base URL и доступ к API

Host API **не зашит** в код. Укажите `msyandexdelivery_base_url` сами (без `/` в конце и без path). Актуальные значения: [доступ к API](https://yandex.com/support/delivery-profile/ru/api/other-day/access).

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

В тестовой поставке токен и склад A могут совпадать с публичными значениями из доки Яндекса. Перед prod замените их на боевые.

## Шаг 3. Проверка в CMP

Откройте пункт меню **msYandexDelivery** (нужен VueTools).

1. **Test connection** — ping API с текущими настройками.
2. **Test calculate** — расчёт до двери (адрес в Москве для test) или ПВЗ с известным `platform_station_id`.

При `msyandexdelivery_log_enabled` журнал пишется в `core/cache/msyandexdelivery_requests.log` без секретов.

## Шаг 4. Чекаут

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

1. Тариф «до двери» → адрес → расчёт → выбор.
2. Тариф «ПВЗ» → карта → выбор точки → цена в заказе.
3. В менеджере на вкладке заказа: **Create** → **Confirm** → **Refresh status**.

Подробности UI: [Чекаут](checkout). Жизненный цикл заявки: [Заявки и менеджер](integration).
