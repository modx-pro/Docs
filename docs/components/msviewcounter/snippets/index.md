---
title: Сниппеты
description: Обзор сниппетов msViewCounter для MiniShop3
---

# Сниппеты msViewCounter

| Сниппет | Назначение |
|---------|------------|
| [msViewCounter](msViewCounter) | Вывод просмотров и active-посетителей товара |

## Порядок на типовой странице товара

1. Плагин **`msViewCounterBootstrap`** на `OnMODXInit` — подключает автозагрузчик и функцию `msvc_get_service()`. С версии 1.0.1 сниппет подключает `bootstrap.php` самостоятельно, так что без плагина страница не падает, но теряются учёт просмотров, стили и heartbeat.
2. Плагин **`msViewCounterTrack`** на `OnLoadWebDocument` — определяет страницу товара, записывает просмотр и подключает CSS и JS.
3. **`msViewCounter`** в шаблоне — HTML-блок и регистрация CSS.
4. **`viewcounter.js`** в браузере — шлёт heartbeat в `connector.php`, который продлевает active-сессию в БД.

Порядок важно понимать буквально: heartbeat JS подключает **плагин** на странице товара, а не наоборот. JS не запускается сам по себе — его регистрирует `ViewCounter::registerAssets()` из плагина. Условие подключения: режим не `fake` и `msviewcounter_show_online` включён.

Число на странице при этом не обновляется само: ответ коннектора JS не читает и в DOM ничего не пишет. Значение фиксируется при отрисовке страницы.

## Таблица соответствий (MODX / Fenom)

| Назначение | MODX | Fenom |
|------------|------|-------|
| Базовый вывод | `` [[!msViewCounter? &pid=`[[*id]]` &tpl=`tplMsViewCounter`]] `` | `{'!msViewCounter' \| snippet : ['pid' => $_modx->resource.id, 'tpl' => 'tplMsViewCounter']}` |
| Другой товар | `` [[!msViewCounter? &pid=`42`]] `` | `{'!msViewCounter' \| snippet : ['pid' => 42]}` |
| Свой чанк | `` [[!msViewCounter? &tpl=`myCounter`]] `` | `{'!msViewCounter' \| snippet : ['tpl' => 'myCounter']}` |
| В каталоге | `` [[!msViewCounter? &pid=`[[+id]]`]] `` | в чанке msProducts: `pid` из `[[+id]]` |

## Кэширование

Вызывайте сниппет **некэшированно** (`[[!...]]` или `{'!...' | snippet}`), иначе на закэшированной странице могут застыть устаревшие числа online.

## Плейсхолдеры в чанке

| Плейсхолдер | MODX | Fenom (если чанк Fenom) |
|-------------|------|-------------------------|
| ID товара | `[[+pid]]` | `{$pid}` |
| Просмотры | `[[+total]]` | `{$total}` |
| Online | `[[+online]]` | `{$online}` |
| Текст просмотров | `[[+total_text]]` | `{$total_text}` |
| Текст online | `[[+online_text]]` | `{$online_text}` |

## См. также

- [msViewCounter](msViewCounter)
- [Страница товара](../frontend/product)
- [Системные настройки](../settings)
