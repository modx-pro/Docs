---
title: Системные настройки
---
# Системные настройки

Все настройки имеют префикс `ms3recentlyviewed.` и находятся в пространстве имён **ms3recentlyviewed**.

**Где изменить:** **Управление → Системные настройки** → в фильтре выберите пространство имён **ms3recentlyviewed**.

## Таблица настроек

| Настройка | Описание | По умолчанию |
|-----------|----------|--------------|
| `ms3recentlyviewed.max_items` | Максимум товаров в блоке «Недавно просмотренные» (localStorage/cookie и вывод) | 20 (макс. 100) |
| `ms3recentlyviewed.storage_type` | Тип хранилища: `localStorage` или `cookie` | localStorage |
| `ms3recentlyviewed.sync_enabled` | Синхронизация в БД для авторизованных; при входе данные из localStorage переносятся в БД | Да |
| `ms3recentlyviewed.ttl_days` | Срок хранения записей в БД (дней) | 90 |
| `ms3recentlyviewed.auto_cleanup_enabled` | Автоудаление записей старше TTL (раз в день при посещении сайта) | Да |
| `ms3recentlyviewed.archive_enabled` | Месячное архивирование: агрегация в сводную таблицу, удаление деталей | Нет |
| `ms3recentlyviewed.track_anonymous` | Учитывать просмотры неавторизованных в БД (если нужна аналитика) | Да |
| `ms3recentlyviewed.test_ids` | ID товаров через запятую для тестовой страницы в админке | 1,2,3 |

## Области

- **default** — max_items, storage_type, test_ids (фронт, блок).
- **sync** — sync_enabled, ttl_days, auto_cleanup_enabled, archive_enabled, track_anonymous (БД, плагины).

## Рекомендации

- **max_items:** 20–50 для большинства сайтов; учитывается в JS при наличии ms3rvLexiconScript.
- **storage_type:** `cookie` — если нужен общий список для поддоменов (срок cookie 30 дней).
- **archive_enabled:** включать при большом объёме просмотров для уменьшения размера таблицы.
