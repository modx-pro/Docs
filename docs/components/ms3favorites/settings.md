---
title: Системные настройки
---
# Системные настройки

Префикс всех ключей: `ms3favorites.`. Пространство имён: **ms3favorites**.

**Где изменить:** **Настройки → Системные настройки**, фильтр по пространству имён `ms3favorites`.

## Таблица настроек

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3favorites.max_items` | Максимум позиций в списке (`localStorage`/`cookie` и серверный вывод) | `20` | Потолок 100. Читают JS, коннектор без `limit`, а также `ms3Favorites` и `ms3FavoritesPage`, если в вызове пустые `limit` и `pageLimit`. Явный параметр вызова важнее настройки. |
| `ms3favorites.storage_type` | Тип хранилища списка избранного | `localStorage` | `localStorage` хранит данные в браузере до очистки. `cookie` ставится на текущий хост: `path=/`, `SameSite=Lax`, 30 дней. В обоих режимах JS пишет cookie `ms3_favorites`, если JSON короче 4000 байт, чтобы серверные сниппеты видели гостевые ID. Заметки в эту cookie не попадают. |
| `ms3favorites.guest_db_enabled` | Сохранять список гостя в БД | `true` | Включить для серверного счётчика, корректных **счётчиков табов** на `/wishlist/` и синхронизации гостя. Идентификация по `session_id`. |
| `ms3favorites.guest_ttl_days` | Срок хранения записей гостей (дней) | `30` | 0: не удалять. Учитывается при автоочистке (cron). |
| `ms3favorites.share_ttl_days` | Срок действия ссылки шаринга (дней) | `90` | 0: без срока. Ссылка показывает текущий список. Снимка на момент создания нет. |
| `ms3favorites.share_guests_enabled` | Шаринг списка для гостей | `false` | Вместе с `guest_db_enabled` гость с `session_id` может вызвать `create_share`. Выключено: ссылку создаёт только авторизованный пользователь. |
| `ms3favorites.max_lists` | Максимум списков на пользователя | `10` | Именованные списки (`default`, `gifts`, `plans` и др.). Число выше 20 режется до 20 и в `favorites.js`, и при sync. |
| `ms3favorites.comments_enabled` | Включить заметки к элементам | `true` | Показывать textarea для заметок в карточках. Если выключено, `update_comment` отклоняется. |
| `ms3favorites.check_resource_availability` | Проверять доступность ресурса перед добавлением | `false` | При включении добавляются только опубликованные и неудалённые ресурсы (`sync`, `copy_share`). |
| `ms3favorites.list_page` | URL страницы списка (для `ms3FavoritesLists`) | `wishlist/` | Относительный путь для ссылок в списках. Кнопка «Поделиться» настройку не использует: ссылка всегда `/wishlist/share?token=…`. |

## Область frontend

CSS/JS и inline-конфиг на фронте (плагин **ms3fFrontend**, событие `OnLoadWebDocument`):

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3favorites.frontend_assets` | JSON-массив путей с плейсхолдерами `[[+cssUrl]]`, `[[+jsUrl]]`, `[[+assetsUrl]]` | `favorites.min.css`, `favorites.min.js` | CSS в `<head>`, JS в конце страницы с `defer`. К URL добавляется `?v=` с датой изменения файла в формате `dmYHi`. Пустой массив `[]`: ничего не подключать. |
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
| Шаринг | `share_ttl_days`, `share_guests_enabled` |
| Поведение | `comments_enabled`, `check_resource_availability`, `list_page` |
| Фронтенд | `frontend_assets`, `register_global_config` |

## Очистка гостевых записей (cron)

```bash
0 3 * * * php /path/to/site/core/components/ms3favorites/cli/cleanup_guests.php
```

При `guest_ttl_days = 0` очистка не выполняется.
