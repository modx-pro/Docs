---
title: Системные настройки
description: 'Ключи namespace yandexmapslocator: карта, TV, REST'
---

# Системные настройки

Namespace: **yandexmapslocator**. В БД ключи с префиксом `yandexmapslocator_`.

**Система → Настройки системы** → фильтр `yandexmapslocator`.

Все ключи ставит **Free**. REST-ключи (`api_*`) оживают после **Pro**. Rate limit из той же группы режет и Free `search.php`.

## Карта и поиск (`yandexmapslocator_main`)

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `yandexmapslocator_api_key` | text | *(пусто)* | Ключ JS API и Геокодера |
| `yandexmapslocator_default_zoom` | number | `10` | Масштаб карты |
| `yandexmapslocator_default_latitude` | text | `55.751244` | Центр, широта |
| `yandexmapslocator_default_longitude` | text | `37.618423` | Центр, долгота |
| `yandexmapslocator_cluster` | boolean | Да | Кластеризация маркеров |
| `yandexmapslocator_default_radius` | number | `50` | Радиус поиска, км (если у сниппета `radius=0`) |
| `yandexmapslocator_distance_unit` | list | `km` | Единица расстояния: `km` или `m` |
| `yandexmapslocator_default_balloon_image` | text | *(пусто)* | Fallback-картинка балуна |
| `yandexmapslocator_marker_icon_size` | text | `32,32` | Размер кастомной иконки маркера, px |
| `yandexmapslocator_default_context` | text | `web` | Fallback-контекст. Также контекст CSV-экспорта Pro |
| `yandexmapslocator_timezone` | text | `Europe/Moscow` | IANA-таймзона сети для Pro `working_now` / `is_open_now` |
| `yandexmapslocator_allowed_contexts` | text | *(пусто)* | Белый список context key через запятую. Пусто: любой существующий |

## Имена TV (`yandexmapslocator_tvs`)

| Ключ | По умолчанию |
|------|--------------|
| `yandexmapslocator_tv_address` | `yandexmaps_address` |
| `yandexmapslocator_tv_latitude` | `yandexmaps_latitude` |
| `yandexmapslocator_tv_longitude` | `yandexmaps_longitude` |
| `yandexmapslocator_tv_phone` | `yandexmaps_phone` |
| `yandexmapslocator_tv_email` | `yandexmaps_email` |
| `yandexmapslocator_tv_working_hours` | `yandexmaps_working_hours` |
| `yandexmapslocator_tv_category` | `yandexmaps_category` |
| `yandexmapslocator_tv_balloon_image` | `yandexmaps_balloon_image` |
| `yandexmapslocator_tv_marker_icon` | `yandexmaps_marker_icon` |

Сменить значение настройки, если TV на сайте уже названы иначе. Список TV: [Точки и TV](integration).

## REST и лимиты (`yandexmapslocator_api`)

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `yandexmapslocator_api_enabled` | boolean | Да | Kill switch REST Pro. Нет → 503. Локатор на странице уходит на `search.php` |
| `yandexmapslocator_api_max_limit` | number | `100` | Макс. `limit` в REST |
| `yandexmapslocator_api_max_offset` | number | `10000` | Макс. `offset` |
| `yandexmapslocator_api_max_parents` | number | `20` | Макс. число parents в запросе |
| `yandexmapslocator_api_geocode_rate_limit` | number | `30` | Запросов geocode в минуту на IP |
| `yandexmapslocator_api_list_rate_limit` | number | `120` | Запросов list в минуту на IP (и лимит для `search.php`) |
| `yandexmapslocator_api_cors_origins` | text | *(пусто)* | Origins через запятую. На production не `*` |
| `yandexmapslocator_api_token` | text | *(пусто)* | Bearer-токен. Пусто: публичный REST (только для стенда) |
| `yandexmapslocator_api_resource_tvs` | text | *(пусто)* | Разрешённые TV в `include=tv` |
| `yandexmapslocator_api_allowed_parents` | text | *(пусто)* | Белый список parent ID. Пусто: любой |
| `yandexmapslocator_api_trust_proxy` | boolean | Нет | Доверять `X-Forwarded-For` для rate limit |

Подробнее: [Безопасность API](pro/api-security).

## Pro

У Pro **нет** своих runtime-настроек. Берите ключи Free выше плюс TV `ms3_product_id` (её создаёт resolver Pro).
