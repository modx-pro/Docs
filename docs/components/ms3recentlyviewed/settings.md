---
title: Системные настройки
---
# Системные настройки

Все настройки имеют префикс `ms3recentlyviewed.` и находятся в пространстве имён **ms3recentlyviewed**.

**Где изменить:** **Управление → Системные настройки** (в MODX 3: **Настройки → Системные настройки**) — фильтр по пространству имён `ms3recentlyviewed`.

## Таблица настроек

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3recentlyviewed.max_items` | Максимум товаров в блоке «Недавно просмотренные» (`localStorage`/cookie и вывод) | `20` | 20–50 для большинства сайтов. Макс. 100. JS без конфига режет до 20, с конфигом — до 100. `ms3rvLexiconScript` кладёт значение в `ms3rvConfig.maxItems`. |
| `ms3recentlyviewed.storage_type` | Тип хранилища списка просмотренных | `localStorage` | `localStorage` — данные в браузере до очистки. `cookie` — только текущий хост, `path=/`, 30 дней, `SameSite=Lax`. Атрибута `Domain` нет: cookie не действует на другие поддомены. |
| `ms3recentlyviewed.sync_enabled` | Синхронизация для авторизованных пользователей | `true` | Включить, если нужна история с разных устройств. При входе данные из `localStorage` переносятся в БД. |
| `ms3recentlyviewed.ttl_days` | Срок хранения записей в БД (дней) | `90` | 30–365 дней. Учитывается при автоочистке и архивировании. |
| `ms3recentlyviewed.auto_cleanup_enabled` | Автоматическая очистка старых записей | `true` | Удаляет просмотры старше TTL. Запускается раз в день при посещении сайта (плагин `OnWebPageInit`). |
| `ms3recentlyviewed.archive_enabled` | Месячное архивирование | `true` | Агрегирует прошлый месяц в `ms3recentlyviewed_monthly` и удаляет строки из `ms3recentlyviewed_items`. Дашборд, топ и история читают только `items`. Архивные месяцы в UI пропадают. |
| `ms3recentlyviewed.block_bots` | Исключать поисковых ботов | `true` | Не сохранять просмотры от краулеров в БД. |
| `ms3recentlyviewed.block_bots_detector` | Метод определения ботов | `crawler_detect` | `crawler_detect` — библиотека **jaybizzle/crawler-detect** (поставляется с пакетом, точнее). `regex` — встроенный regex, если vendor недоступен. |
| `ms3recentlyviewed.track_anonymous` | Учёт просмотров анонимных пользователей | `true` | Сохранять просмотры гостей в БД. Идентификация по сессии. Требует включённой синхронизации. |

## Области настроек

- **default** — `max_items`, `storage_type` (лимит на сайте и тип хранилища в браузере)
- **sync** — `sync_enabled`, `ttl_days`, `auto_cleanup_enabled`, `archive_enabled`, `block_bots`, `block_bots_detector`, `track_anonymous` (БД, боты, анонимы)
