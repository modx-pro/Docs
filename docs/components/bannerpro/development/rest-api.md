---
title: REST API
description: "Read-only REST API BannerPro: включение, Bearer-токен, баннеры, позиции и статистика"
---

# REST API

BannerPro предоставляет read-only HTTP API для внешних систем. API отдаёт баннеры, позиции и статистику, но не создаёт и не меняет записи.

Точка входа:

```text
assets/components/bannerpro/api.php
```

## Включение

1. Откройте **Система → Настройки системы** и отфильтруйте namespace **`bannerpro`**.
2. Установите **`bannerpro_api_enabled`** = **Да**.
3. Скопируйте значение **`bannerpro_api_key`** (см. [Ключ API](#ключ-api)).
4. Отправляйте только **GET**-запросы с заголовком **`Authorization: Bearer …`**.

## Ключ API

В примерах `curl` плейсхолдер **`YOUR_API_KEY`**: значение **`bannerpro_api_key`** из системных настроек.

### Где посмотреть

| Способ | Путь |
| --- | --- |
| Менеджер | **Система → Настройки системы** → namespace `bannerpro` → **REST API ключ** |
| База | Таблица `modx_system_settings` (префикс может отличаться), ключ `bannerpro_api_key` |

### Как появляется ключ

При установке или обновлении пакета resolver записывает случайную строку из **32 hex-символов**, если поле было пустым. Можно задать свой токен: сохраните новое значение в настройке и используйте его в заголовке.

После смены ключа очистите кэш MODX (`php clear_cache.php` или **Управление → Очистить кэш**), если старое значение ещё отдаётся из кэша настроек.

### Пример запроса

Подставьте ключ из настройки **без** префикса `Bearer` в переменную. Префикс `Bearer` указывают только в HTTP-заголовке:

```bash
API_KEY="вставьте_значение_bannerpro_api_key"

curl -s -H "Authorization: Bearer ${API_KEY}" \
  "https://example.com/assets/components/bannerpro/api.php?path=/ads&limit=10"
```

Ответ `401 unauthorized`: неверный или пустой ключ. `503 api disabled`: выключен `bannerpro_api_enabled`.

## Аутентификация

```http
Authorization: Bearer YOUR_API_KEY
```

| Код | Причина |
| --- | --- |
| `401` | Ключ отсутствует или неверен |
| `503` | API выключен через `bannerpro_api_enabled` |
| `404` | Маршрут не найден |

## Формат ответа

Успешный ответ:

```json
{
  "success": true,
  "data": [],
  "total": 0
}
```

Ошибка:

```json
{
  "success": false,
  "message": "not found"
}
```

## GET /ads

Возвращает список баннеров.

| Параметр | Тип | Описание |
| --- | --- | --- |
| `position` | int | ID позиции |
| `active` | `0` или `1` | Фильтр активности |
| `limit` | int | Лимит, по умолчанию 20, максимум 500 |
| `offset` | int | Смещение |

```bash
curl -s -H "Authorization: Bearer YOUR_API_KEY" \
  "https://example.com/assets/components/bannerpro/api.php?path=/ads&limit=10"
```

## GET /ads/{id}

Возвращает один баннер со счётчиками кликов, показов и заказов.

```bash
curl -s -H "Authorization: Bearer YOUR_API_KEY" \
  "https://example.com/assets/components/bannerpro/api.php?path=/ads/42"
```

## GET /positions

Возвращает список позиций.

```bash
curl -s -H "Authorization: Bearer YOUR_API_KEY" \
  "https://example.com/assets/components/bannerpro/api.php?path=/positions"
```

## GET /stats

Возвращает сводку, динамику по дням и топ баннеров.

| Параметр | Тип | Описание |
| --- | --- | --- |
| `period` | string | `all`, `today`, `this_month`, `last_month`, `this_year`. Алиасы: `overall`, `thismonth`, `lastmonth`, `thisyear` |
| `position` | int | ID позиции, `0` означает все |
| `limit` | int | Лимит для `top_ads`, по умолчанию 10 |

```bash
curl -s -H "Authorization: Bearer YOUR_API_KEY" \
  "https://example.com/assets/components/bannerpro/api.php?path=/stats&period=this_month&position=0"
```

В ответе `stats_by_day` и сводке есть поле `conversions` (заказы MS3 с атрибуцией клика). Для одного баннера `GET /ads/{id}` тоже возвращает счётчик `conversions`.

## PATH_INFO

API принимает путь через `?path=...`. Если веб-сервер корректно передаёт `PATH_INFO`, можно использовать путь после `api.php`.

```bash
curl -s -H "Authorization: Bearer YOUR_API_KEY" \
  "https://example.com/assets/components/bannerpro/api.php/ads"
```

## Безопасность

- Храните `bannerpro_api_key` в секретах backend-сервиса.
- Не отправляйте ключ в публичный frontend.
- Ограничьте доступ к `api.php` по IP на веб-сервере, если API нужен только внутренним сервисам.
- Используйте HTTPS.

## См. также

- [Системные настройки](../settings): `bannerpro_api_enabled`, `bannerpro_api_key`.
- [События MODX](events): серверные события и connector actions.
