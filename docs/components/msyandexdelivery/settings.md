---
title: Системные настройки
description: Ключи namespace msyandexdelivery для API, доставки, виджета ПВЗ и опроса статусов
---

# Системные настройки

Namespace: **`msyandexdelivery`**. Ключ в БД: `msyandexdelivery_<name>`.

Путь в менеджере: **Системные настройки** → пространство имён `msyandexdelivery` (или пункт меню **msYandexDelivery → Системные настройки**).

## API и доставка

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msyandexdelivery_enabled` | combo-boolean | `0` | Включает расчёт и заявки. При `0` MiniShop3 работает без вызовов Яндекса |
| `msyandexdelivery_base_url` | textfield | _(пусто)_ | **Обязательно.** Host Platform API без path. Компонент не подставляет test/prod URL сам |
| `msyandexdelivery_environment` | textfield | `prod` | Метка `test` / `prod` для подсказок в UI. Host не выбирает |
| `msyandexdelivery_oauth_token` | text-password | _(пусто)_ | OAuth Bearer из кабинета Яндекса. На frontend не отдаётся |
| `msyandexdelivery_timeout` | numberfield | `15` | Таймаут HTTP к API, секунды |
| `msyandexdelivery_log_enabled` | combo-boolean | `0` | Журнал в `core/cache/msyandexdelivery_requests.log` без секретов |
| `msyandexdelivery_delivery_id` | textfield | _(пусто)_ | ID способов доставки MS3 через запятую. Пусто — поиск по class `YandexDelivery` |
| `msyandexdelivery_platform_station_id` | textfield | _(пусто)_ | `platform_station_id` склада отправителя (точка A) |
| `msyandexdelivery_default_tariff` | textfield | `time_interval` | `time_interval` (до двери) или `self_pickup` (ПВЗ) |
| `msyandexdelivery_payment_method` | textfield | `already_paid` | Способ оплаты в заявке: `already_paid`, `card_on_receipt` или `postpay` |
| `msyandexdelivery_cache_ttl` | numberfield | `3600` | TTL кэша расчётов (зарезервировано) |
| `msyandexdelivery_default_weight` | numberfield | `1000` | Вес по умолчанию, граммы |
| `msyandexdelivery_default_length` | numberfield | `30` | Длина места, см (`dx`) |
| `msyandexdelivery_default_width` | numberfield | `20` | Ширина места, см (`dy`) |
| `msyandexdelivery_default_height` | numberfield | `10` | Высота места, см (`dz`) |
| `msyandexdelivery_weight_coefficient` | textfield | `1` | Множитель веса при расчёте |

## Виджет ПВЗ

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msyandexdelivery_widget_geo_id` | numberfield | _(пусто)_ | `geo_id` города Яндекса для центра карты (`213` Москва, `2` СПб). Не id ПВЗ. Пусто: город из адреса заказа |
| `msyandexdelivery_widget_city` | textfield | `Москва` | Запасное русское имя города, если нет `geo_id` и города в адресе |
| `msyandexdelivery_widget_height` | numberfield | `450` | Высота виджета, px (минимум 200) |
| `msyandexdelivery_widget_show_select_button` | combo-boolean | `1` | Выбор точки только по кнопке «Продолжить» в виджете |
| `msyandexdelivery_widget_script_url` | textfield | _(пусто)_ | Override URL скрипта. Пусто — `https://widget-pvz.dostavka.yandex.net/widget.js?v=2` |

## Опрос статусов

Other-day API не шлёт webhook. Статусы обновляет poll: кнопка на вкладке заказа, Scheduler или cron.

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msyandexdelivery_sync_poll_enabled` | combo-boolean | `1` | Разрешить пакетный опрос. При `0` задача отвечает `poll_disabled` |
| `msyandexdelivery_sync_poll_limit` | numberfield | `50` | Сколько активных заявок опросить за один прогон (1–200) |
| `msyandexdelivery_sync_secret` | textfield | _(пусто)_ | Секрет для `connector.php?action=sync_statuses` без входа в менеджер |

Подробнее: [Заявки и менеджер](integration#опрос-статусов).

## Примеры Base URL

| Окружение | Пример |
| --- | --- |
| Test | `https://b2b.taxi.tst.yandex.net` |
| Production | `https://b2b-authproxy.taxi.yandex.net` |

Сверяйте значения с [доступом к API](https://yandex.com/support/delivery-profile/ru/api/other-day/access).
