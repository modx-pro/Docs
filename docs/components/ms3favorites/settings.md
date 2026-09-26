---
title: Системные настройки
---
# Системные настройки

Префикс всех ключей — `ms3favorites.`, пространство имён — **ms3favorites**.

**Где изменить:** **Настройки → Системные настройки**, фильтр по пространству имён `ms3favorites`.

## Таблица настроек

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3favorites.max_items` | Максимум товаров в блоке «Избранное» (`localStorage`/`cookie` и вывод) | `20` | Обычно 20–50, максимум 100. Учитывается в JS, если задан `ms3fConfig` (плагин или `ms3fLexiconScript`). |
| `ms3favorites.storage_type` | Тип хранилища списка избранного | `localStorage` | `localStorage` — данные в браузере до очистки. `cookie` — общий домен для поддоменов, срок 30 дней. Учитывается в JS через `ms3fConfig`. |
| `ms3favorites.guest_db_enabled` | Сохранять список гостя в БД | `true` | Включить для серверного счётчика, корректных **счётчиков табов** на `/wishlist/` и синхронизации гостя. Идентификация по `session_id`. |
| `ms3favorites.guest_ttl_days` | Срок хранения записей гостей (дней) | `30` | 0 — не удалять. Учитывается при автоочистке (cron). |
| `ms3favorites.share_ttl_days` | Срок действия ссылки шаринга (дней) | `90` | 0 — без срока. |
| `ms3favorites.max_lists` | Максимум списков на пользователя | `10` | Лимит именованных списков (`default`, `gifts`, `plans` и др.). Сервер и `favorites.js` допускают до 20. |
| `ms3favorites.comments_enabled` | Включить заметки к элементам | `true` | Показывать textarea для заметок в карточках. Если выключено, `update_comment` отклоняется. |
| `ms3favorites.check_resource_availability` | Проверять доступность ресурса перед добавлением | `false` | При включении добавляются только опубликованные и неудалённые ресурсы (`sync`, `copy_share`). |
| `ms3favorites.list_page` | URL страницы списка (для `ms3FavoritesLists`) | `wishlist/` | Относительный путь для формирования ссылок в списках. Кнопка «Поделиться» настройку не использует: ссылка всегда `/wishlist/share?token=…`. |

## Область frontend

CSS/JS и inline-конфиг на фронте (плагин **ms3fFrontend**, событие `OnLoadWebDocument`):

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3favorites.frontend_assets` | JSON-массив путей с плейсхолдерами `[[+cssUrl]]`, `[[+jsUrl]]`, `[[+assetsUrl]]` | `favorites.min.css`, `favorites.min.js` | CSS — в `<head>`, JS — в конце страницы с `defer`. К URL добавляется `?v=` с датой изменения файла в формате `dmYHi`. Пустой массив `[]` — ничего не подключать. |
| `ms3favorites.register_global_config` | Вывод inline `window.ms3fLexicon` и `window.ms3fConfig` перед `favorites.js` | `true` | Аналог `ms3_register_global_config` в MiniShop3. При **Нет** подключайте `[[!ms3fLexiconScript]]` в шаблоне. |

Значение **frontend_assets** по умолчанию:

```json
[
    "[[+cssUrl]]favorites.min.css",
    "[[+jsUrl]]favorites.min.js"
]
```

Свои файлы (неминифицированные) или отключение автоподключения:

```json
[
    "[[+cssUrl]]favorites.css",
    "[[+jsUrl]]favorites.js"
]
```

```json
[]
```

## Область в менеджере MODX

В транспортном пакете ключи разделены на области **default** и **frontend**. Группы по смыслу:

| Группа | Ключи |
|--------|--------|
| Лимиты и хранение | `max_items`, `storage_type`, `max_lists` |
| Гости и БД | `guest_db_enabled`, `guest_ttl_days` |
| Шаринг | `share_ttl_days` |
| Поведение | `comments_enabled`, `check_resource_availability`, `list_page` |
| Фронтенд | `frontend_assets`, `register_global_config` |

## Очистка гостевых записей (cron)

```bash
0 3 * * * php /path/to/site/core/components/ms3favorites/cli/cleanup_guests.php
```

При `guest_ttl_days = 0` очистка не выполняется.
