---
title: Системные настройки
---
# Системные настройки

Префикс ключей — `ms3recentlyviewed.`, пространство имён — **ms3recentlyviewed**.

**Где изменить:** **Управление → Системные настройки** (в MODX 3: **Настройки → Системные настройки**). Фильтр по пространству имён `ms3recentlyviewed`.

## Таблица настроек

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3recentlyviewed.max_items` | Максимум товаров в «Недавно просмотренные» (`localStorage`/cookie и вывод) | `20` | 20–50 на большинстве сайтов, макс. 100. JS: до 20 без конфига, до 100 с конфигом. `ms3rvLexiconScript` кладёт значение в `ms3rvConfig.maxItems`. |
| `ms3recentlyviewed.storage_type` | Тип хранилища списка просмотренных | `localStorage` | `localStorage` до очистки браузера. `cookie`: `ms3_recently_viewed`, текущий хост, `path=/`, 30 дней, `SameSite=Lax`, без `Domain`. Cookie читает JS только при `storageType: cookie` в `ms3rvConfig` от `ms3rvLexiconScript`. Без сниппета остаётся `localStorage`. |
| `ms3recentlyviewed.sync_enabled` | Запись истории в БД | `true` | После входа `viewed.js` один раз на вкладку шлёт список браузера (`getAll()`). После успешной отправки во вкладке пишется `sessionStorage` ключ `ms3rv_synced_user`. Пока он совпадает с `userId`, повтор не уходит. Запись в БД только при `true`. |
| `ms3recentlyviewed.ttl_days` | Срок хранения записей в БД (дней) | `90` | 30–365. Только автоочистка `ms3rv_cleanup_old_views`, не архив. |
| `ms3recentlyviewed.auto_cleanup_enabled` | Автоматическая очистка старых записей | `true` | Просмотры старше TTL. Плагин **ms3recentlyviewedSync** (`OnWebPageInit`) не чаще раза в сутки. |
| `ms3recentlyviewed.archive_enabled` | Месячное архивирование | `true` | Сводка прошлого месяца в `ms3recentlyviewed_monthly`. `ms3recentlyviewed_items` не трогает. Дашборд, топ и история читают `items`. |
| `ms3recentlyviewed.block_bots` | Исключать поисковых ботов | `true` | Не сохранять просмотры от краулеров в БД. |
| `ms3recentlyviewed.block_bots_detector` | Метод определения ботов | `crawler_detect` | `crawler_detect` — библиотека **jaybizzle/crawler-detect** (поставляется с пакетом). `regex` — встроенный regex, если каталог `vendor` недоступен. |
| `ms3recentlyviewed.track_anonymous` | Учёт просмотров анонимных пользователей | `true` | Просмотры гостей в БД, по сессии. Нужна включённая синхронизация. |

## Области настроек

- **default** — `max_items`, `storage_type` (лимит и хранилище в браузере)
- **sync** — `sync_enabled`, `ttl_days`, `auto_cleanup_enabled`, `archive_enabled`, `block_bots`, `block_bots_detector`, `track_anonymous` (БД, боты, анонимы)

## Скрытые ключи (не в System Settings)

Пакет читает их через `getOption`. В transport их нет.

| Ключ | Где | Назначение |
| --- | --- | --- |
| `ms3recentlyviewed.context` | connector `action=similar` | Контекст для `switchContext`, по умолчанию `web` |
| `ms3recentlyviewed.msproduct_class_key` | helpers | class_key товара. Запасной список: `MiniShop3\Model\msProduct`, затем `msProduct` |
| `ms3recentlyviewed.core_path` | процессоры и модель | Путь к `core/components/ms3recentlyviewed/` |
| `ms3recentlyviewed.assets_path` | контроллер менеджера | Путь к `assets/components/ms3recentlyviewed/` |
