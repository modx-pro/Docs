---
title: Подключение на сайте
---
# Подключение на сайте

Лексикон, стили и скрипты: [Быстрый старт](/components/ms3recentlyviewed/quick-start).

## Проверка интеграции: пустая статистика в админке

Статистика и история в админке берутся из таблицы `ms3recentlyviewed_items`. Записи попадают туда при включённой синхронизации, для **авторизованных** и **анонимных** (гостей).

- Анонимные идентифицируются по сессии. Учёт гостей: `ms3recentlyviewed.track_anonymous`.
- Просмотры ботов не сохраняются при **`ms3recentlyviewed.block_bots` = Да**.
- Способ определения: **`ms3recentlyviewed.block_bots_detector`** — **`crawler_detect`** (jaybizzle/crawler-detect в `vendor`) или **`regex`**.

**Проверьте:**

- лексикон и `viewed.js` на каждой странице товара
- на странице товара задан `data-viewed-product-id` на `<body>` или `window.ms3rvCurrentProductId`
- `ms3recentlyviewed.sync_enabled` = Да
- авторизованный пользователь вошёл в контексте **web**, не только в админке

Блок `fromDB` работает только для пользователей, авторизованных на сайте (контекст web).

### Плейсхолдер `viewedIds` (cookie)

Плагин **ms3recentlyviewedViewedIdsPlaceholder** (событие **OnWebPageInit**, приоритет **-5**) всегда ставит **`viewedIds`**. При **`storage_type` = `cookie`** значение берётся из cookie `ms3_recently_viewed`. Иначе плейсхолдер пустой и может затереть ранее заданное значение. Имя **зарезервировано**. Fenom: `{$_modx->getPlaceholder('viewedIds')}`.

## Коннектор (AJAX)

**URL:** `assets/components/ms3recentlyviewed/connector.php`  
**Метод:** POST.

Действия:

- **Вывод списка просмотренных** — опционально `ids`, `limit`, `tpl`, `emptyTpl`, `includeThumbs`. Пустой `ids` не ошибка: сниппет вернёт `emptyTpl`.
- **Похожие** — `action=similar`, `ids`, опционально `limit`, `tpl`, `depth`
- **`track`** + `product_id` — пишет просмотр гостю (сессия) и авторизованному при включённом sync
- **`sync`** + `ids`, **`get`** — только пользователь, авторизованный в web

**Ответ:** HTML списка. При отсутствии товаров — пустая строка. Если заданы `window.MODX_ASSETS_URL` или `window.MODX_BASE_URL`, JS сам формирует URL коннектора.

ID парсятся как целые (потолок 100). POST `tpl` / `emptyTpl` (list и similar) проходят `ms3rv_sanitize_chunk_name`. Допустимы только `[a-zA-Z0-9_-]`. `@FILE` и путь отбрасываются. Пустое имя даёт стандартный чанк. Свойства сниппета в шаблоне по-прежнему идут через `ms3rv_resolve_chunk_name` (`trim`, `@FILE` можно). Если сниппет вернул пусто, запасной вариант читает `showUnpublished` / `showDeleted` из POST. По умолчанию оба выкл.

## Чанки

| Чанк | Назначение |
|------|------------|
| tplViewedItem | Карточка товара в списке «Недавно просмотренные» |
| tplViewedEmpty | Пустое состояние |
| tplViewedOuter | Опциональная обёртка. Плейсхолдеры: `output`, `hydrate`, `tpl`, `emptyTpl`, `limit`, `includeThumbs` |
| tplSimilarItem | Карточка в блоке «Похожие» |
| tplMs3rvLexiconScript | Опциональная обёртка `ms3rvLexiconScript`. Сниппет умеет вывести script сам |

Чанки можно переопределять (Fenom или MODX). Параметры `tpl` и `emptyTpl` есть в сниппете и при вызове `render()` в JS.

## Стили и BEM

Классы с префиксом **ms3rv** (BEM): `ms3rv__list`, `ms3rv__item` и др. Файл: `assets/components/ms3recentlyviewed/css/viewed.css`.

Карточки по умолчанию используют Bootstrap (`ms3-product-card`, `product-image-wrapper`). Подключите Bootstrap и при необходимости стили каталога.

Горизонтальная прокрутка только у `.ms3rv-slider__wrapper .ms3rv__list`. Обычный `.ms3rv__list` — сетка Bootstrap.

Переменных `--ms3rv-*` на витрине нет. `--ms3rv-accent*` есть только в стилях менеджера.

## Передача ID товара вручную

Опционально задайте кнопку с `data-viewed-toggle` и `data-id`. Клик добавляет товар в список, например из сетки каталога без перехода на страницу товара.
