---
title: Системные настройки
description: Ключи namespace tickets в MODX
---

# Системные настройки

Параметры компонента: **Системные настройки** → фильтр namespace `tickets`. Ключ в БД: `tickets_{name}`.

## Основные (`tickets.main`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets_mgr_tree_icon_ticketssection` | text | `icon icon-comments-o` | Иконка раздела тикетов в дереве ресурсов |
| `tickets_mgr_tree_icon_ticket` | text | `icon icon-comment-o` | Иконка тикета в дереве ресурсов |
| `tickets_date_format` | text | `%d.%m.%y <small>%H:%M</small>` | Формат даты на фронтенде |
| `tickets_enable_editor` | boolean | `1` | Редактор MarkItUp для тикетов и комментариев |
| `tickets_frontend_css` | text | `[[+cssUrl]]web/default.css` | Путь к CSS фронтенда; пустое значение отключает автоподключение |
| `tickets_frontend_js` | text | `[[+jsUrl]]web/default.js` | Путь к JS фронтенда |
| `tickets_source_default` | источник медиа | `0` | Источник файлов тикетов по умолчанию |

## Раздел тикетов (`tickets.section`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets_section_content_default` | textarea | пусто | Контент новой секции; по умолчанию в пакете подставляется вывод дочерних тикетов |

## Тикет (`tickets.ticket`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets_editor_config.ticket` | textarea | JSON MarkItUp | Панель кнопок редактора тикета |
| `tickets_default_template` | шаблон | пусто | Шаблон новых тикетов (mgr и фронтенд) |
| `tickets_private_ticket_page` | number | `0` | ID ресурса для редиректа с закрытого тикета |
| `tickets_unpublished_ticket_page` | number | `0` | ID ресурса при запросе неопубликованного тикета |
| `tickets_ticket_max_cut` | number | `1000` | Макс. длина текста без тега `<cut/>` |
| `tickets_count_guests` | boolean | `0` | Считать просмотры гостями (легко накрутить) |
| `tickets_auto_introtext` | boolean | `1` | Заполнять пустую аннотацию из контента до `<cut/>` |
| `tickets_max_files_upload` | number | `0` | Лимит вложений к тикету; `0` — без ограничений |

## Комментарий (`tickets.comment`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets_editor_config.comment` | textarea | JSON MarkItUp | Панель кнопок редактора комментария |
| `tickets_snippet_prepare_comment` | text | пусто | Сниппет постобработки комментария вместо стандартной |
| `tickets_comment_edit_time` | number | `600` | Секунды, в течение которых автор может править комментарий |
| `tickets_clear_cache_on_comment_save` | boolean | `0` | Очищать кэш тикета при действиях с комментариями; нужно только если `TicketComments` вызывается кэшированным |

## Почтовые уведомления (`tickets.mail`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets_mail_from` | text | пусто | Адрес отправителя; иначе `emailsender` |
| `tickets_mail_from_name` | text | пусто | Имя отправителя; иначе `site_name` |
| `tickets_mail_queue` | boolean | `0` | Очередь писем; при `1` добавьте в cron `core/components/tickets/cron/mail_queue.php` |
| `tickets_mail_bcc` | text | `1` | ID администраторов через запятую для BCC |
| `tickets_mail_bcc_level` | number | `2` | `0` — выкл., `1` — только тикеты, `2` — тикеты и комментарии |

## Источник медиа Tickets Files

При установке создаётся источник **Tickets Files** (`assets/images/tickets/`). Его ID укажите в `tickets_source_default`.

Параметры источника (не системные настройки):

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `thumbnails` | JSON `thumb` 120×90 | превью загруженных изображений |
| `maxUploadWidth` | `1920` | сжатие по ширине |
| `maxUploadHeight` | `1080` | сжатие по высоте |
| `maxUploadSize` | байты | лимит размера файла |
| `imageExtensions` | `jpg,jpeg,png,gif` | допустимые расширения |
