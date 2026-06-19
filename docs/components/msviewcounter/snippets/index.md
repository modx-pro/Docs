---
title: Сниппеты
description: Обзор сниппетов msViewCounter для MiniShop3
---

# Сниппеты msViewCounter

| Сниппет | Назначение |
|---------|------------|
| [msViewCounter](msViewCounter) | Вывод просмотров и active-посетителей товара |

## Порядок на типовой странице товара

1. Плагин **`msViewCounterTrack`** (автоматически) — запись просмотра на `OnLoadWebDocument`.
2. **`msViewCounter`** в шаблоне — HTML-блок и подключение CSS.

Heartbeat JS подключает плагин на странице товара (режимы `real` и `boost`, при включённом `show_online`). Сниппет дополнительно регистрирует CSS при каждом выводе.

## Таблица соответствий (MODX / Fenom)

| Назначение | MODX | Fenom |
|------------|------|-------|
| Базовый вывод | `[[!msViewCounter? &pid=`[[*id]]` &tpl=`tplMsViewCounter`]]` | `{'!msViewCounter' \| snippet : ['pid' => $_modx->resource.id, 'tpl' => 'tplMsViewCounter']}` |
| Другой товар | `[[!msViewCounter? &pid=`42`]]` | `{'!msViewCounter' \| snippet : ['pid' => 42]}` |
| Свой чанк | `[[!msViewCounter? &tpl=`myCounter`]]` | `{'!msViewCounter' \| snippet : ['tpl' => 'myCounter']}` |
| В каталоге | `[[!msViewCounter? &pid=`[[+id]]`]]` | в чанке msProducts: `pid` из `[[+id]]` |

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
