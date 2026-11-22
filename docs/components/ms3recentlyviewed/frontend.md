---
title: Подключение на сайте
---
# Подключение на сайте

Лексикон, стили и скрипты: [Быстрый старт](/components/ms3recentlyviewed/quick-start).

## Проверка интеграции: пустая статистика в админке

Статистика и история в админке — из таблицы `ms3recentlyviewed_items`. Строки пишутся при включённой синхронизации, для **авторизованных** и **анонимных** (гостей).

- Анонимных определяют по сессии. Учёт гостей: `ms3recentlyviewed.track_anonymous`.
- Просмотры ботов не сохраняются при **`ms3recentlyviewed.block_bots` = Да**.
- Способ определения: **`ms3recentlyviewed.block_bots_detector`** — **`crawler_detect`** (jaybizzle/crawler-detect в `vendor`) или **`regex`**.

**Проверьте:**

- лексикон и `viewed.js` на каждой странице товара
- на странице товара задан `data-viewed-product-id` на `<body>` или `window.ms3rvCurrentProductId`
- `ms3recentlyviewed.sync_enabled` = Да
- пользователь авторизован в **текущем** контексте сайта, не только в админке

`fromDB`, `action=sync` и `action=get` смотрят текущий контекст. `web` подставляется, только если контекста нет. `action=similar` переключает контекст на `ms3recentlyviewed.context` (по умолчанию `web`).

### Плейсхолдер `viewedIds` (cookie)

Плагин **ms3recentlyviewedViewedIdsPlaceholder** (событие **OnWebPageInit**, приоритет **-5**) всегда ставит **`viewedIds`**. При **`storage_type` = `cookie`** значение берётся из cookie `ms3_recently_viewed`. Иначе плейсхолдер пустой и может затереть ранее заданное значение. Имя **зарезервировано**. Fenom: `{$_modx->getPlaceholder('viewedIds')}`.

## Коннектор (AJAX)

**URL:** `assets/components/ms3recentlyviewed/connector.php`  
**Метод:** POST.

Действия:

- **Вывод списка просмотренных** — без `action`, параметры `ids`, `limit`, `tpl`, `emptyTpl`, `includeThumbs`. Пустой `ids` у сниппета даёт обёртку с HTML `emptyTpl` и `data-ms3rv-hydrate="viewed"`.
- **Похожие** — `action=similar`, `ids`, опционально `limit`, `tpl`, `depth`. Без ID сниппет возвращает пустую строку.
- **`track`** + `product_id` — пишет просмотр гостю (сессия) и авторизованному при включённом sync
- **`sync`** + `ids`, **`get`** — пользователь, авторизованный в текущем контексте. Ответ JSON.

**Ответ списка:** HTML. Если заданы `window.MODX_ASSETS_URL` или `window.MODX_BASE_URL`, JS сам формирует URL коннектора.

| Что | Правило |
|-----|---------|
| ID | целые, потолок 100 |
| POST `tpl` / `emptyTpl` (list и similar) | `ms3rv_sanitize_chunk_name`, только `[a-zA-Z0-9_-]` |
| `@FILE` и путь | отбрасываются |
| Пустое имя | стандартный чанк |
| Свойства сниппета в шаблоне | `ms3rv_resolve_chunk_name` (`trim`, `@FILE` можно) |
| Сниппет вернул пусто | запасной вариант читает `showUnpublished` / `showDeleted` из POST, по умолчанию оба выкл |

## Чанки

| Чанк | Назначение |
|------|------------|
| tplViewedItem | Карточка «Недавно просмотренные». В поставке `priceCurrency` зашит как `RUB`. Свою валюту задайте копией чанка |
| tplViewedEmpty | Пустое состояние. Текст из лексикона `ms3recentlyviewed_empty` |
| tplViewedOuter | Опциональная обёртка. Плейсхолдеры: `output`, `hydrate`, `tpl`, `emptyTpl`, `limit`, `includeThumbs` |
| tplSimilarItem | Карточка «Похожие». В поставке тоже `priceCurrency` = `RUB` |
| tplMs3rvLexiconScript | Ставится пакетом и сниппетом не читается. Рабочий вывод собирает `ms3rvLexiconScript` |

Чанки можно заменить своими (Fenom или MODX). Параметры `tpl` и `emptyTpl` есть в сниппете и при вызове `render()` в JS.

## Стили и BEM

Классы с префиксом **ms3rv** (BEM): `ms3rv__list`, `ms3rv__item` и др. Файл: `assets/components/ms3recentlyviewed/css/viewed.css`.

Карточки по умолчанию используют Bootstrap (`ms3-product-card`, `product-image-wrapper`). Подключите Bootstrap и при необходимости стили каталога.

Горизонтальная прокрутка только у `.ms3rv-slider__wrapper .ms3rv__list`. Обычный `.ms3rv__list` — сетка Bootstrap.

Переменных `--ms3rv-*` на витрине нет. `--ms3rv-accent*` есть только в стилях менеджера.

## Передача ID товара вручную

Опционально задайте кнопку с `data-viewed-toggle` и `data-id`. Клик добавляет товар в список, например из сетки каталога без перехода на страницу товара.

После такого клика у авторизованного пользователя блок `#ms3rv-fromdb-content` заново запрашивает список (`action=get`).

Стартовые ID можно положить в `data-initial-ids` на контейнере. Общие параметры отрисовки читаются из `window.ms3rvRenderOptions`: `tpl`, `emptyTpl`, `limit`, `similarLimit`.

Кнопки `[data-slider-prev]` и `[data-slider-next]` внутри `.ms3rv-slider` листают `.ms3rv-slider__wrapper`.

У `window.ms3RecentlyViewed` доступны `getAll`, `save`, `add`, `sync`, `getFromDB`, `render`, `renderSimilar`, `trackToDB`.
