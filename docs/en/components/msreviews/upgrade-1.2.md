---
title: Обновление до 1.2
description: 'msReviews 1.2.x: Fenom, pdoTools, data-msr, письма, патчи'
---

# Обновление до 1.2

Релиз **1.2** меняет настройку витрины: чанки на **Fenom** через **pdoTools**, JS ищет элементы по **`data-msr-*`**, часть PHP-классов переименована. Появились письма модератору, `registerCss` / `registerJs` на вызов сниппета и настраиваемая UGC-галерея.

## Нужно ли вам что-то делать

| Что у вас есть | Что делать |
| --- | --- |
| Только стандартные чанки и стили | pdoTools 3.0+, обновить пакет, очистить кэш |
| Свои чанки (`&tpl=`, `&itemTpl=`, …) | Переписать на Fenom. См. [Чанки на Fenom](#чанки-на-fenom) |
| Свой CSS на `.is-lit`, `.is-active`, `.msreviews-form__msg--ok` | Селекторы на `data-*` и ARIA. См. [JS и CSS](#js-и-css-по-data-атрибутам) |
| Свой JS по BEM-классам msReviews | Перейти на `data-msr-*` |
| Свои плагины поверх классов `msreviews\` | [Изменения в PHP API](#изменения-в-php-api) |
| Свой фронт + POST на коннектор | Ничего. Контракт API не менялся |

## Порядок обновления

1. Бэкап БД и выгрузка чанков, которые правили в менеджере.
2. Установите **[pdoTools](/components/pdotools/) 3.0+** (без него витрина отдаст пустые блоки).
3. Обновите msReviews через **Extras → Installer**.
4. **Управление → Очистить кэш**.
5. Откройте карточку товара: сводка, список, форма, Q&A.
6. **Отчёты → Журнал ошибок**: туда пишутся ошибки отрисовки Fenom.

Настройки `msreviews_*` сохраняются. Новые ключи добавляются со значениями по умолчанию.

## Чанки на Fenom

Все чанки пакета переписаны на Fenom. Отрисовка идёт через `pdoTools::getChunk()` с принудительным Fenom. Системная **`pdotools_fenom_parser`** на msReviews не влияет: она для ресурсов и шаблонов. Пакет вызывает pdoTools напрямую.

Без pdoTools сниппеты вернут пустую строку и один раз за запрос запишут в лог: что чанки на Fenom и нужен pdoTools.

Обновление пакета перезаписывает чанки категории **msReviews**. Свою версию держите под другим именем и подключайте параметром сниппета.

| Было (MODX) | Стало (Fenom) |
| --- | --- |
| `[[+text]]` | `{$text}` |
| ``[[+author_name:default=`Гость`]]`` | `{$author_name?:'Гость'}` |
| ``[[+title:notempty=`<h4>[[+title]]</h4>`]]`` | `{if $title?}<h4>{$title}</h4>{/if}` |
| ``[[+pinned:is=`1`:then=` is-pinned`]]`` | `{if $pinned?} is-pinned{/if}` |
| `[[%msreviews_helpful]]` | `{$label_helpful}` (подписи приходят плейсхолдерами) |

Необязательный плейсхолдер: `{if $var?}` или `{$var?:''}`. Голое `{$var}` на пустом ключе даст warning Fenom. Не пишите `{if !$var?}`. Берите `{if $var?}…{else}…{/if}`.

Подробнее: [Чанки](chunks).

## JS и CSS по data-атрибутам

Скрипты витрины больше не ищут элементы по BEM. Классы `msreviews-item__*`, `msreviews-form__*` остались для оформления, логика читает `data-msr-*`, `name`, `type`, `role`.

| Было | Стало |
| --- | --- |
| `.msreviews-form__star.is-lit` | `[data-msr-rating-star][data-msr-star-lit]` |
| `.msreviews-form__msg--ok` | `[data-msr-message="ok"]` |
| `.msreviews-form__msg--err` | `[data-msr-message="error"]` |
| `.msreviews-qform-wrap.is-success` | `[data-msr-form-wrap][data-msr-form-state="success"]` |
| `.msreviews-item__helpful.is-voted` | `.msreviews-item__helpful[aria-pressed="true"]` |
| `.msreviews-tabbed__tab.is-active` | `.msreviews-tabbed__tab[aria-selected="true"]` |

Полные таблицы: [Интеграция (data-контракт)](integration#кастомная-вёрстка-data-контракт).

## Изменения в PHP API

Только для кода, который зовёт классы msReviews напрямую.

| Было | Стало |
| --- | --- |
| `ReviewRequestMailDispatcher` | `MsReviewsMailDispatcher` (+ `sendModeratorAlert()`) |
| `msr_storefront_gallery_item_html()` | удалён: разметка через `&itemTpl` |
| `msr_storefront_media_link_html()` | deprecated 1.2 → `StorefrontMediaLinkBuilder::html()` |
| `$modx->getChunk(...)` для чанков пакета | `msr_get_chunk()` / `ChunkRenderer` |
| Ручная сборка `ReviewCreationService` | `ReviewServiceFactory::create()` (нужен `ModeratorNotificationService`) |

Публичные `action` коннектора, JSON и имена событий `msrOn*` (кроме нового) не менялись.

## Письма модератору

| Настройка | По умолчанию | Назначение |
| --- | --- | --- |
| `msreviews_moderator_notify_enabled` | `0` | Включить |
| `msreviews_moderator_notify_emails` | *(пусто)* | Адреса через запятую |
| `msreviews_moderator_notify_on` | `pending_only` | `pending_only` или `all` |
| `msreviews_moderator_email_subject_chunk` | *(пусто)* | Чанк темы. Пустое имя: текст из лексикона. Имя задано, отрисовка пустая: ERROR в лог, письмо не уходит (с **1.2.1**) |
| `msreviews_moderator_email_body_chunk` | *(пусто)* | Чанк тела. То же правило, что у темы |

Письма только с витрины. CSV и CMP не шлют. Отмена: плагин на **`msrOnModeratorNotify`** → `return false`.

См. [Настройки](settings#уведомление-модератора), [События](events#msronmoderatornotify).

## registerCss / registerJs

У витринных сниппетов свойства **`registerCss`** и **`registerJs`** (по умолчанию `1`). Раньше CSS и JS отключались только глобально (`msreviews_frontend_css_enabled` / `_js_enabled`).

Есть у `msReviews`, `msReviewForm`, `msQuestionForm`, `msRatingSummary`, `msReviewsLatest`, `msTopRatedProducts`, `msQuestions`, `msReviewsHub`, `msReviewPrompt`, `msReviewsFilters`, `msRatingBadge`, `msReviewsTabbed`, `msReviewMediaGallery`, `msQuestionsLatest`. У `msQnaBlock` свойства уходят в дочерние сниппеты.

```fenom
{'!msReviews' | snippet : [
  'product_id' => $_modx->resource.id,
  'registerCss' => 0
]}
```

## Галерея UGC

`msReviewMediaGallery` собирает разметку из чанков, не из PHP.

| Параметр | По умолчанию | Назначение |
| --- | --- | --- |
| `bodyTpl` | `tplReviewMediaGalleryBody` | Список фото или empty |
| `mediaLinkMode` | `lightbox` | `lightbox` / `anchor` / `raw` |
| `galleryGroup` | *(пусто)* | Значение для `data-fancybox` и аналогов |
| `thumbSize` | `160` | width/height превью |

См. [msReviewMediaGallery](snippets/msReviewMediaGallery).

## Проверка после обновления

- Карточка: сводка, список, форма, Q&A
- Звёзды и отправка формы, success-блок
- «Полезно», правка и удаление своего отзыва
- Вкладки Отзывы / Вопросы
- Галерея (`lightbox` / `anchor` / свой скрипт)
- Каталог: компактный рейтинг
- Журнал ошибок без `[msReviews]`
- Если включили уведомления, тестовый отзыв дошёл письмом

## Откат

Поставьте предыдущую версию в Installer. Данные отзывов не трогаются. Настройки `msreviews_moderator_*` останутся в системе. Свои чанки под отдельными именами откат не перезапишет.

## Патч 1.2.1

Поставьте пакет **1.2.1-pl** поверх 1.2.0 и очистите кэш. Публичный API не меняется. Resolver при upgrade создаёт отсутствующие ключи `msreviews_moderator_*`.

| Тема | Что изменилось |
| --- | --- |
| Письма модератору | Свой чанк темы/тела задан, но отрисовка пустая: ERROR в лог, лексикон не подставляется, письмо не уходит |
| CMP отзывы | Колонки «Ответ магазина» в таблице нет. Ответ в форме редактирования (право `review_reply`) |
| Привязка | `product_id` в CMP: любой неудалённый `site_content`, не только `msProduct` |
| Поиск в CMP | `mgr/catalog/search` с `type=resource`. `limit` от 1 до 100, по умолчанию 50. При вводе `q` список подсказок заменяется. Числовой `q` поднимает точный id |
| Витрина Latest | Заголовок и URL для отзывов/вопросов на любом опубликованном ресурсе |
| Фильтры | Chip-ссылки без дубля `msr_product_id` при `baseQuery` и `$_GET` |

## Патч 1.2.2

Поставьте пакет **1.2.2-pl** поверх 1.2.x и очистите кэш. Breaking API нет.

| Тема | Что изменилось |
| --- | --- |
| Письма | Уведомления (модератор, invite, reply/answer) уходят как HTML (`text/html`). Свой чанк тела можно верстать |
| Mailer | Namespace `modMail` → `MODX\Revolution\Mail\modMail`. Раньше запасной вариант: `mail()` без HTML Content-Type |
| Плейсхолдеры чанка | `type` / `status`: подписи из лексикона. Коды: `type_key` / `status_key` (`review`, `pending`) |

См. [Настройки](settings#уведомление-модератора).

## Патч 1.2.3

Поставьте пакет **1.2.3-pl** поверх 1.2.x и очистите кэш. Breaking API нет.

| Тема | Что изменилось |
| --- | --- |
| CMP Вопросы | Кнопка «Добавить вопрос» / редактирование: ресурс, автор, email, текст, статус, notify, ответ |
| API | `mgr/question/create`, `mgr/question/update`, `mgr/question/get` (POST-only create/update, `question_moderate`) |
| Каталог ACL | `mgr/catalog/search` / `resolve`: `review_analytics` или `question_moderate` |
| `msRatingSummary` | `&productIds=` / `&parents=` / `&all=`1``: общий рейтинг. Пустая явная область даёт нули |
| Рейтинг | Взвешенное среднее по опубликованным. `rating/get` и JSON-LD остаются per-product |

См. [Админка](manager#вопросы), [msRatingSummary](snippets/msRatingSummary), [AJAX API](api).

## Патч 1.2.4

Поставьте пакет **1.2.4-pl** поверх 1.2.x и очистите кэш. Breaking API нет.

| Тема | Что изменилось |
| --- | --- |
| Импорт вопросов | `mgr/import/questions`: CSV с колонками `product_id`, `text`, `status`, `author_email` или `author_name`; опционально `answer_text`, `notify`, `pinned`. Право `review_import`, кнопка «Импорт вопросов» в Операциях |
| Экспорт вопросов | `mgr/export/questions`: фиксированный набор колонок и `answer_text` (последний ответ) |
| Дашборд | Плитка и сегмент doughnut `published_questions`. Клик открывает вопросы со `status=published` |
| Витрина Q&A | `msQuestions` / `msQuestionsLatest`: параметр `&sortDir=` (`DESC` по умолчанию или `ASC`) и плейсхолдер `{$idx}` в чанке элемента (с 1, с учётом `offset`) |
| CMP Вопросы | Колонка «Ответ» и быстрый диалог ответа убраны. Ответ задаётся в форме создания/редактирования. Action `mgr/answer/create` остаётся в API |

## Патч 1.2.5

Поставьте пакет **1.2.5-pl** поверх 1.2.x и очистите кэш. Breaking API нет.

| Тема | Что изменилось |
| --- | --- |
| Вкладка «Отзывы» | На форме любого неудалённого документа с `isfolder = 0`, не только `msProduct`. На папках вкладки нет |
| `&parents=` и фильтры категорий | В область входят документы `site_content` с `deleted = 0` и `isfolder = 0` (любой `class_key`). Раньше отбор шёл через `msreviews_product_class_key` |
| `msTopRatedProducts` | JOIN к ресурсу без фильтра по class_key. Остаются `published = 1`, `deleted = 0`, `isfolder = 0` |
| `msreviews_product_class_key` | Только поиск CMP `type=product` и метрика `products_without_reviews`. Verified purchase и очередь писем — по заказам MiniShop3 |

См. [Админка](manager), [Системные настройки](settings).

## Патч 1.2.6

Поставьте пакет **1.2.6-pl** поверх 1.2.x и очистите кэш. Breaking API нет.

| Тема | Что изменилось |
| --- | --- |
| `msrOnBeforeQuestionCreate` | Вызывается и на витрине (`question/create`) до записи вопроса. `return false` из плагина отклоняет создание с `msr_err_event_block`, как в CMP |
| `msrOnBeforeReviewPublish` | Guard: результат проверяется до смены статуса. При `return false` отзыв не публикуется, агрегат не пересчитывается, `msrOnReviewPublish` не вызывается |
| Свойства сниппетов | В transport добавлены `applyRequestFilters` (`msReviewsHub`, `msReviewsTabbed`), `showStructuredFields` и `showDimensionRatings` (`msReviewForm`) — видны на вкладке «Свойства» в менеджере. Мёртвое свойство `connectorUrl` у `msQuestions` и `msRatingSummary` убрано |

::: warning
Плагин на `msrOnBeforeQuestionCreate`, написанный для CMP, с 1.2.6 срабатывает и на витрине. Проверьте его логику до обновления.
:::

См. [События MODX и капча](events).
