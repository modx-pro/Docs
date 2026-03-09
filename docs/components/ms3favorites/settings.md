---
title: Системные настройки
---
# Системные настройки

Все настройки имеют префикс `ms3favorites.` и находятся в пространстве имён **ms3favorites**.

**Где изменить:** **Настройки → Системные настройки** — фильтр по пространству имён `ms3favorites`.

## Таблица настроек

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3favorites.max_items` | Максимум товаров в блоке «Избранное» (localStorage/cookie и вывод) | `20` | 20–50 для большинства сайтов; макс. 100. Учитывается в JS при наличии ms3fLexiconScript. |
| `ms3favorites.storage_type` | Тип хранилища списка избранного | `localStorage` | `localStorage` — данные в браузере до очистки; `cookie` — общий домен для поддоменов, срок 30 дней. |
| `ms3favorites.guest_db_enabled` | Сохранять список гостя в БД | `true` | Включить для серверного счётчика и страницы /wishlist/ (usePdoPage) для гостей. Идентификация по session_id. |
| `ms3favorites.guest_ttl_days` | Срок хранения записей гостей (дней) | `30` | 0 — не удалять. Учитывается при автоочистке (cron). |
| `ms3favorites.share_ttl_days` | Срок действия ссылки шаринга (дней) | `90` | 0 — без срока. |
| `ms3favorites.max_lists` | Максимум списков на пользователя | `10` | Лимит именованных списков (default, gifts, plans и др.). Максимум — 20. |
| `ms3favorites.comments_enabled` | Включить заметки к элементам | `true` | Показывать textarea для заметок в карточках. При отключении update_comment отклоняется. |
| `ms3favorites.check_resource_availability` | Проверять доступность ресурса перед добавлением | `false` | При включении добавляются только опубликованные и неудалённые ресурсы (sync, copy_share). |
| `ms3favorites.list_page` | URL страницы списка (для ms3FavoritesLists) | `wishlist/` | Относительный путь для формирования ссылок в списках. |

## Области настроек

- **default** — `max_items`, `storage_type` (фронт, блок вывода).
- **sync** — `guest_db_enabled`, `guest_ttl_days` (хранение в БД, плагины).
- **share** — `share_ttl_days` (публичные ссылки).
- **features** — `comments_enabled`, `check_resource_availability`, `max_lists`.

## Рекомендации

- **max_items:** 20–50 для большинства сайтов; учитывается в JS при наличии `ms3fLexiconScript`.
- **storage_type:** `cookie` — если нужен общий список для поддоменов (срок cookie 30 дней).
- **guest_db_enabled:** включить для серверного счётчика и страницы `/wishlist/` с `usePdoPage` для гостей.
- **guest_ttl_days:** для регулярной очистки добавьте в cron вызов `cli/cleanup_guests.php`.
- **share_ttl_days:** `0` — ссылка без срока действия; иначе — автоматическое истечение.

## Очистка гостевых записей (cron)

```bash
0 3 * * * php /path/to/site/core/components/ms3favorites/cli/cleanup_guests.php
```

При `guest_ttl_days = 0` очистка не выполняется.
