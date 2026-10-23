---
title: Системные настройки
description: Ключи namespace tickets в MODX
---

# Системные настройки

**Системные настройки** → фильтр namespace `tickets`. У большинства ключей имя в БД совпадает с `[[++tickets.<name>]]`, например `[[++tickets.date_format]]`. Два ключа иконок дерева хранятся без префикса `tickets.`.

## Основные (`tickets.main`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mgr_tree_icon_ticketssection` | text | `icon icon-comments-o` | Иконка раздела тикетов в дереве ресурсов. Ключ без префикса `tickets.`: дерево MODX читает `mgr_tree_icon_{class_key}` |
| `mgr_tree_icon_ticket` | text | `icon icon-comment-o` | Иконка тикета в дереве ресурсов. Ключ без префикса `tickets.` |
| `tickets.date_format` | text | `%d.%m.%y <small>%H:%M</small>` | Формат даты в админке (сетки и превью комментариев). На фронтенде настройка не используется. Сниппеты выводят дату относительно (`date_ago`). Формат задают свойства класса `Tickets` |
| `tickets.enable_editor` | boolean | `1` | Редактор MarkItUp для тикетов и комментариев |
| `tickets.frontend_css` | text | `[[+cssUrl]]web/default.css` | Путь к CSS фронтенда. Пустое значение отключает автоподключение |
| `tickets.frontend_js` | text | `[[+jsUrl]]web/default.js` | Путь к JS фронтенда |
| `tickets.source_default` | источник медиа | `0` | Источник файлов тикетов по умолчанию. После установки сюда записывается ID источника **Tickets Files**. `0` если источник не создан или удалён |

## Раздел тикетов (`tickets.section`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.section_content_default` | textarea | пусто | Контент новой секции тикетов. Вывод дочерних тикетов настраивается контентом секции или шаблоном сайта |
| `tickets.section_id_as_alias` | boolean | `0` | У нового раздела псевдонимом становится его id |

## Тикет (`tickets.ticket`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.editor_config.ticket` | textarea | JSON MarkItUp | Панель кнопок редактора тикета |
| `tickets.default_template` | шаблон | пусто | Шаблон новых тикетов (mgr и фронтенд) |
| `tickets.private_ticket_page` | number | `0` | ID ресурса для подмены закрытого тикета. Адрес в браузере не меняется. `0` подмену не делает |
| `tickets.unpublished_ticket_page` | number | `0` | ID ресурса, если по короткому URI раздела запрошен неопубликованный тикет. Подмена с кодом 403, не редирект. Прямой адрес тикета настройка не перехватывает |
| `tickets.ticket_max_cut` | number | `1000` | Макс. длина текста без тега `<cut/>` |
| `tickets.count_guests` | boolean | `0` | Считать просмотры гостями. Есть риск накрутки |
| `tickets.auto_introtext` | boolean | `1` | Заполнять пустую аннотацию из контента до `<cut/>` |
| `tickets.autocut_text_length` | number | `0` | Длина автоаннотации без `<cut/>`, если включён `tickets.auto_introtext`. `0` оставляет cut обязательным, когда текст длиннее `tickets.ticket_max_cut` |
| `tickets.max_files_upload` | number | `0` | Лимит вложений к тикету. `0` без ограничений |
| `tickets.disable_jevix_default` | boolean | `0` | Свойство нового тикета «Отключить Jevix» |
| `tickets.process_tags_default` | boolean | `0` | Свойство нового тикета «Выполнять теги MODX» |
| `tickets.ticket_show_in_tree_default` | boolean | `0` | Показывать новые тикеты в дереве ресурсов |

## Комментарий (`tickets.comment`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.editor_config.comment` | textarea | JSON MarkItUp | Панель кнопок редактора комментария |
| `tickets.snippet_prepare_comment` | text | пусто | Сниппет постобработки комментария вместо стандартной |
| `tickets.comment_edit_time` | number | `600` | Секунды, в течение которых автор может править комментарий |
| `tickets.clear_cache_on_comment_save` | boolean | `0` | Очищать кэш тикета при действиях с комментариями. Нужно только если `TicketComments` вызывается кэшированным |

## Почтовые уведомления (`tickets.mail`)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.mail_from` | text | пусто | Адрес отправителя. Иначе `emailsender` |
| `tickets.mail_from_name` | text | пусто | Имя отправителя. Иначе `site_name` |
| `tickets.mail_queue` | boolean | `0` | Очередь писем. При `1` добавьте в cron `core/components/tickets/cron/mail_queue.php` |
| `tickets.mail_bcc` | text | `1` | ID администраторов через запятую для BCC |
| `tickets.mail_bcc_level` | number | `2` | `0` выкл., `1` только тикеты, `2` тикеты и комментарии |

## Рейтинг (`tickets.rating`) {#rating}

Вес действия, если в свойствах раздела своё значение не задано.

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `tickets.rating_ticket_default` | number | `10` | Создание тикета |
| `tickets.rating_comment_default` | number | `1` | Комментарий |
| `tickets.rating_view_default` | number | `0.1` | Просмотр |
| `tickets.rating_vote_ticket_default` | number | `1` | Голос за тикет |
| `tickets.rating_vote_comment_default` | number | `0.2` | Голос за комментарий |
| `tickets.rating_star_ticket_default` | number | `3` | Звезда за тикет |
| `tickets.rating_star_comment_default` | number | `0.6` | Звезда за комментарий |

## Настройки вне пакета {#nastrojki-vne-paketa}

Этих ключей нет в транспорте. В списке настроек они не появляются, пока вы не создадите их вручную.

| Ключ | Где применяется | По умолчанию в коде |
| --- | --- | --- |
| `tickets.ticket_hidemenu_force` | `hidemenu` новых тикетов раздела, если в свойствах раздела значение ещё не задано. Иначе берётся `hidemenu_default`. Уже сохранённые тикеты не переписываются | `hidemenu_default` |
| `tickets.ticket_isfolder_force` | Суффикс URI новых тикетов, и только если в конфиге уже есть ключ `tickets.ticket_id_as_alias`. Истина дописывает `/`, ложь дописывает `%ext`. Флаг `isfolder` у тикета не ставит | `0` |
| `tickets.ticket_id_as_alias` | Шаблон URI новых тикетов. Пока ключа нет, шаблон `%id-%alias%ext`. Ключ есть и выключен: `%alias` плюс `/` или `%ext`. Ключ есть и включён: `%id` плюс тот же суффикс. Само значение `0` шаблон не включает, пока настройку не создали | `0` |
| `tickets.core_path` | Каталог ядра. Если записи нет: `core/components/tickets/` | |
| `tickets.assets_path` | Каталог файлов компонента. Если записи нет: `assets/components/tickets/` | |
| `tickets.assets_url` | URL файлов компонента. Если записи нет: `assets/components/tickets/` | |
| `tickets.action_url` | URL `action.php`. Если записи нет: URL файлов плюс `action.php` | |

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
| `imageNameType` | `hash` | `hash`: хеш имени файла, `friendly`: человекочитаемое имя |
| `maxUploadWidth` | `1920` | сжатие по ширине |
| `maxUploadHeight` | `1080` | сжатие по высоте |
| `maxUploadSize` | `3145728` | лимит размера файла, байт (3 МБ) |

## Cron-скрипты

Скрипты лежат в `core/components/tickets/cron/`. Запускайте по расписанию напрямую (`php mail_queue.php`):

| Скрипт | Что делает |
| --- | --- |
| `mail_queue.php` | отправляет письма из очереди `TicketQueue`. Нужен при `tickets.mail_queue` = `1` |
| `rebuild_rating.php` | полный пересчёт рейтинга авторов: очищает `TicketAuthorAction` и `TicketTotal` и заново считает действия всех пользователей |
| `remove_votes.php` | удаляет голоса за тикеты и комментарии, оставшиеся после лимитов `days_ticket_vote` / `days_comment_vote` (свойства секции `ratings`), и пересчитывает рейтинг комментариев |
