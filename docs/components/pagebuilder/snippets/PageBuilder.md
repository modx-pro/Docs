---
title: PageBuilder
description: Сниппет PageBuilder — HTML опубликованных секций ресурса
---

# Сниппет PageBuilder

Выводит **опубликованные** секции ресурса в HTML. Черновик на сайте не показывается: HTML-путь (`return_values=0`) отдаёт пустую строку, пока страницу не опубликовали. Каждая секция отрисовывается своим Fenom-chunk (`pagebuilder_{key}`).

## Где вызывать

- Шаблон страницы, собранной во вкладке **Секции**.
- Поле content, если шаблон выводит `[[*content]]`.
- Только некэшированный вызов (`[[!PageBuilder]]`). Без `!` HTML может устареть после публикации секций.

## Зависимости

- Установленное дополнение **pagebuilder** (или **pagebuilderpro**).
- **pdoTools** 3.0+ для Fenom в chunks секций.
- Опубликованный snapshot секций на ресурсе.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `resource_id` | `0` | ID ресурса. `0` = текущий |
| `section_types` | пусто | Ключи секций через запятую (`hero,gallery`). Пусто = все опубликованные |
| `return_values` | `0` | `1` → JSON `{ plainText, sections }` вместо HTML |
| `use_cache` | `1` | Кеш MODX для HTML. `0` при отладке событий отрисовки |
| `load_css` | из `pagebuilder_load_frontend_css` | Подключить `pagebuilder-sections.css` и связанные стили |
| `wrap_page` | как `load_css` | Обёртка `<div class="pb-page">` |
| `qa_css` | `0` | `1` → подключить `pagebuilder-qa.css`. Иначе CSS QA подключается сам, если на странице есть QA-секции |

Параметры `load_css` и `wrap_page` не указаны в properties сниппета, но поддерживаются в коде. См. [Системные настройки → Связь со сниппетом](../settings#связь-со-сниппетом).

## Базовый вызов

::: code-group

```modx
[[!PageBuilder]]
```

```fenom
{'!PageBuilder' | snippet}
```

:::

## Фильтр по типам секций

Только hero и CTA:

::: code-group

```modx
[[!PageBuilder?
  &section_types=`hero,cta`
]]
```

```fenom
{'!PageBuilder' | snippet : [
  'section_types' => 'hero,cta'
]}
```

:::

## return_values

JSON для SEO-плагинов и headless-гибридов. Структура совпадает с полем `values` в [Public API](../public-api):

::: code-group

```modx
[[!PageBuilder? &return_values=`1`]]
```

```fenom
{'!PageBuilder' | snippet : ['return_values' => 1]}
```

:::

При `return_values=1` срабатывает событие `pbOnGetValues`. CSS и обёртка `pb-page` не подключаются.

Источник документа: опубликованный snapshot, если `publishedRevision > 0`. Иначе берётся **черновик**.

## CSS и обёртка

При `load_css=1` сниппет регистрирует frontend CSS (см. [Дизайн-система](../design-system)). Стили Pro и commerce подключаются при флаге `pro`.

Глобально отключить: `pagebuilder_load_frontend_css = 0`. На одном вызове: `&load_css=`0``.

## Кеш HTML

Кеш MODX: partition `pagebuilder/{resourceId}`, ключ `render/{context}/{resourceId}/{publishedRevision}[/{typeHash}]`. Сбрасывается при publish/unpublish. Ошибки отрисовки в кеш не попадают.

События `pbOnBeforeRenderDocument` и `pbOnBeforeRenderSection` вызываются только при промахе кеша:

::: code-group

```modx
[[!PageBuilder? &use_cache=`0`]]
```

```fenom
{'!PageBuilder' | snippet : ['use_cache' => 0]}
```

:::

## Пропуск секций

Секция с невыполненным `requires` (Pro, miniShop3) не попадает в HTML. Неизвестный тип логируется, блок пропускается.

## См. также

- [PageBuilderResource](PageBuilderResource)
- [Вывод на сайте](../frontend)
- [Public API](../public-api)
