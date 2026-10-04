---
title: Системные настройки
description: Ключи namespace tickets в MODX
---

# Системные настройки

**Системные настройки** → фильтр namespace `tickets`. Ключ настройки один для БД и для `[[++…]]`: `tickets.<name>`, например `[[++tickets.date_format]]`.

## Основные (`tickets.main`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.mgr_tree_icon_ticketssection` | text | `icon icon-comments-o` | Иконка раздела тикетов в дереве ресурсов. Внимание: код эту настройку не читает, иконки заданы жёстко |
| `tickets.mgr_tree_icon_ticket` | text | `icon icon-comment-o` | Иконка тикета в дереве ресурсов. Внимание: код эту настройку не читает, иконки заданы жёстко |
| `tickets.date_format` | text | `%d.%m.%y <small>%H:%M</small>` | Формат даты в админке (сетки и превью комментариев). На фронтенде настройка не используется: сниппеты выводят дату относительно (`date_ago`), формат задаётся свойствами класса `Tickets` |
| `tickets.enable_editor` | boolean | `1` | Редактор MarkItUp для тикетов и комментариев |
| `tickets.frontend_css` | text | `[[+cssUrl]]web/default.css` | Путь к CSS фронтенда; пустое значение отключает автоподключение |
| `tickets.frontend_js` | text | `[[+jsUrl]]web/default.js` | Путь к JS фронтенда |
| `tickets.source_default` | источник медиа | `0` | Источник файлов тикетов по умолчанию. После установки сюда автоматически записывается ID источника **Tickets Files**; `0` — если источник не создан или удалён |

## Раздел тикетов (`tickets.section`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.section_content_default` | textarea | пусто | Контент новой секции тикетов. Вывод дочерних тикетов настраивается контентом секции или шаблоном сайта |

## Тикет (`tickets.ticket`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.editor_config.ticket` | textarea | JSON MarkItUp | Панель кнопок редактора тикета |
| `tickets.default_template` | шаблон | пусто | Шаблон новых тикетов (mgr и фронтенд) |
| `tickets.private_ticket_page` | number | `0` | ID ресурса для редиректа с закрытого тикета |
| `tickets.unpublished_ticket_page` | number | `0` | ID ресурса при запросе неопубликованного тикета |
| `tickets.ticket_max_cut` | number | `1000` | Макс. длина текста без тега `<cut/>` |
| `tickets.count_guests` | boolean | `0` | Считать просмотры гостями; риск накрутки |
| `tickets.auto_introtext` | boolean | `1` | Заполнять пустую аннотацию из контента до `<cut/>` |
| `tickets.max_files_upload` | number | `0` | Лимит вложений к тикету; `0` — без ограничений |

## Комментарий (`tickets.comment`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.editor_config.comment` | textarea | JSON MarkItUp | Панель кнопок редактора комментария |
| `tickets.snippet_prepare_comment` | text | пусто | Сниппет постобработки комментария вместо стандартной |
| `tickets.comment_edit_time` | number | `600` | Секунды, в течение которых автор может править комментарий |
| `tickets.clear_cache_on_comment_save` | boolean | `0` | Очищать кэш тикета при действиях с комментариями; нужно только если `TicketComments` вызывается кэшированным |

## Почтовые уведомления (`tickets.mail`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.mail_from` | text | пусто | Адрес отправителя; иначе `emailsender` |
| `tickets.mail_from_name` | text | пусто | Имя отправителя; иначе `site_name` |
| `tickets.mail_queue` | boolean | `0` | Очередь писем; при `1` добавьте в cron `core/components/tickets/cron/mail_queue.php` |
| `tickets.mail_bcc` | text | `1` | ID администраторов через запятую для BCC |
| `tickets.mail_bcc_level` | number | `2` | `0` — выкл., `1` — только тикеты, `2` — тикеты и комментарии |

## Настройки вне пакета {#nastrojki-vne-paketa}

Код читает ещё 14 ключей, которых нет в транспорте: в списке настроек они не появляются. Задавайте такие настройки вручную, через `context` или API:

| Ключ | Где применяется | По умолчанию в коде |
| --- | --- | --- |
| `tickets.disable_jevix_default` | свойство нового тикета «Отключить Jevix» | `0` |
| `tickets.process_tags_default` | свойство нового тикета «Выполнять теги MODX» | `0` |
| `tickets.ticket_show_in_tree_default` | показывать тикеты в дереве ресурсов | `0` |
| `tickets.ticket_hidemenu_force` | принудительно скрывать тикеты из меню | `0` |
| `tickets.ticket_isfolder_force` | все тикеты — контейнеры | `0` |
| `tickets.section_id_as_alias` | ID раздела вместо псевдонима в URI | `0` |
| `tickets.ticket_id_as_alias` | ID тикета вместо псевдонима в URI | `0` |
| `tickets.rating_ticket_default` | вес «тикет» в свойствах секции `ratings` | `10` |
| `tickets.rating_comment_default` | вес «комментарий» | `1` |
| `tickets.rating_view_default` | вес просмотра | `0.1` |
| `tickets.rating_vote_ticket_default` | вес голоса за тикет | `1` |
| `tickets.rating_vote_comment_default` | вес голоса за комментарий | `0.2` |
| `tickets.rating_star_ticket_default` | вес звезды за тикет | `3` |
| `tickets.rating_star_comment_default` | вес звезды за комментарий | `0.6` |

## Источник медиа Tickets Files

При установке создаётся источник **Tickets Files** (`assets/images/tickets/`). Его ID резолвер записывает в `tickets.source_default`.

Параметры источника (не системные настройки):

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `basePath` | `assets/images/tickets/` | путь на диске |
| `baseUrl` | `assets/images/tickets/` | путь в URL |
| `allowedFileTypes` | `jpg,jpeg,png,gif` | допустимые расширения загружаемых файлов |
| `imageExtensions` | `jpg,jpeg,png,gif` | расширения, обрабатываемые как изображения (сжатие, превью) |
| `thumbnails` | JSON `thumb` 120×90 | превью загруженных изображений |
| `thumbnailType` | `jpg` | формат превью |
| `imageNameType` | `hash` | `hash` — хеш имени файла, `friendly` — человекочитаемое имя |
| `maxUploadWidth` | `1920` | сжатие по ширине |
| `maxUploadHeight` | `1080` | сжатие по высоте |
| `maxUploadSize` | `3145728` | лимит размера файла, байт (3 МБ) |

## Cron-скрипты

Скрипты лежат в `core/components/tickets/cron/`, запускаются по расписанию напрямую (`php mail_queue.php`):

| Скрипт | Что делает |
| --- | --- |
| `mail_queue.php` | отправляет письма из очереди `TicketQueue`; нужен при `tickets.mail_queue` = `1` |
| `rebuild_rating.php` | полный пересчёт рейтинга авторов: очищает `TicketAuthorAction` и `TicketTotal` и заново считает действия всех пользователей |
| `remove_votes.php` | удаляет голоса за тикеты и комментарии, оставшиеся после лимитов `days_ticket_vote` / `days_comment_vote` (свойства секции `ratings`), и пересчитывает рейтинг комментариев |
