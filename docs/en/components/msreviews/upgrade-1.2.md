---
title: Обновление до 1.2
description: 'msReviews 1.2: Fenom, pdoTools, data-msr, письма модератору, галерея'
---

<!-- TODO: translate from docs/components/msreviews/upgrade-1.2.md -->

# Обновление до 1.2

Релиз **1.2** меняет настройку витрины: чанки на **Fenom** через **pdoTools**, JS ищет элементы по **`data-msr-*`**, часть PHP-классов переименована. Появились письма модератору, `registerCss` / `registerJs` на вызов сниппета и настраиваемая UGC-галерея.

Если вы не правили чанки, CSS и JS, поставьте pdoTools 3.0+, обновите пакет и очистите кэш.

## Нужно ли вам что-то делать

| Что у вас есть | Что делать |
| --- | --- |
| Только стандартные чанки и стили | pdoTools 3.0+, обновить пакет, очистить кэш |
| Свои чанки (`&tpl=`, `&itemTpl=`, …) | Переписать на Fenom. См. [Чанки на Fenom](#чанки-на-fenom) |
| Свой CSS на `.is-lit`, `.is-active`, `.msreviews-form__msg--ok` | Селекторы на `data-*` и ARIA. См. [JS и CSS](#js-и-css-по-data-атрибутам) |
| Свой JS по BEM-классам msReviews | Перейти на `data-msr-*` |
| Свои плагины поверх классов `msreviews\` | [Изменения в PHP API](#изменения-в-php-api) |
| Headless: свой фронт + POST на коннектор | Ничего. Контракт API не менялся |

## Порядок обновления

1. Бэкап БД и выгрузка чанков, которые правили в менеджере.
2. Установите **[pdoTools](/components/pdotools/) 3.0+** (без него витрина отдаст пустые блоки).
3. Обновите msReviews через **Extras → Installer**.
4. **Управление → Очистить кэш**.
5. Откройте карточку товара: сводка, список, форма, Q&A.
6. **Отчёты → Журнал ошибок**: туда пишутся ошибки рендера Fenom.

Настройки `msreviews_*` сохраняются. Новые ключи добавляются со значениями по умолчанию.

## Чанки на Fenom

Все чанки пакета переписаны на Fenom. Рендер идёт через `pdoTools::getChunk()` с принудительным Fenom. Системная **`pdotools_fenom_parser`** на msReviews не влияет: она для ресурсов и шаблонов, а пакет зовёт pdoTools напрямую.

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
| `msreviews_moderator_email_subject_chunk` | *(пусто)* | Чанк темы |
| `msreviews_moderator_email_body_chunk` | *(пусто)* | Чанк тела |

Письма только с витрины. CSV и CMP не шлют. Отмена: плагин на **`msrOnModeratorNotify`** → `return false`.

См. [Настройки](settings#уведомление-модератора), [События](events#msronmoderatornotify).

## registerCss / registerJs

У витринных сниппетов свойства **`registerCss`** и **`registerJs`** (по умолчанию `1`). Раньше ассеты отключались только глобально (`msreviews_frontend_css_enabled` / `_js_enabled`).

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
