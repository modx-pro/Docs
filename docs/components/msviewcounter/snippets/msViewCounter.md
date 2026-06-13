---
title: Сниппет msViewCounter
description: Вывод просмотров и active-посетителей товара MiniShop3
---

# Сниппет msViewCounter

Выводит блок social proof: суммарные просмотры и (опционально) число посетителей «сейчас на странице». Подключает базовый CSS `viewcounter.css`.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `pid` | ID текущего ресурса | ID товара (`msProduct`). При `pid <= 0` сниппет возвращает пустую строку |
| `tpl` | `tplMsViewCounter` | Чанк вывода |

Поведение total/online, режим `real`/`boost`/`fake` и тексты задаются **системными настройками** `msviewcounter_*`, а не параметрами сниппета.

## Базовый вызов

::: code-group

```fenom
{'!msViewCounter' | snippet : [
    'pid' => $_modx->resource.id,
    'tpl' => 'tplMsViewCounter'
]}
```

```modx
[[!msViewCounter?
    &pid=`[[*id]]`
    &tpl=`tplMsViewCounter`
]]
```

:::

## Вызов для другого товара

::: code-group

```fenom
{'!msViewCounter' | snippet : ['pid' => 42]}
```

```modx
[[!msViewCounter? &pid=`42`]]
```

:::

## В каталоге (msProducts)

Передайте ID из строки:

::: code-group

```fenom
{'!msViewCounter' | snippet : [
    'pid' => $id,
    'tpl' => 'tplMsViewCounter'
]}
```

```modx
[[!msViewCounter? &pid=`[[+id]]` &tpl=`tplMsViewCounter`]]
```

:::

Подробнее: [Каталог товаров](../frontend/catalog).

## Чанк tplMsViewCounter

::: code-group

```fenom
<div class="msvc-counter" data-product-id="{$pid}">
    {if $total_text}
        <p class="msvc-counter__total">{$total_text}</p>
    {/if}
    {if $online_text}
        <p class="msvc-counter__online">{$online_text}</p>
    {/if}
</div>
```

```modx
<div class="msvc-counter" data-product-id="[[+pid]]">
    [[+total_text:notempty=`<p class="msvc-counter__total">[[+total_text]]</p>`]]
    [[+online_text:notempty=`<p class="msvc-counter__online">[[+online_text]]</p>`]]
</div>
```

:::

| Плейсхолдер | MODX | Fenom |
|-------------|------|-------|
| ID товара | `[[+pid]]` | `{$pid}` |
| Просмотры | `[[+total]]` | `{$total}` |
| Online | `[[+online]]` | `{$online}` |
| Текст просмотров | `[[+total_text]]` | `{$total_text}` |
| Текст online | `[[+online_text]]` | `{$online_text}` |

## Подключаемые assets

| Файл | Когда |
|------|-------|
| `css/viewcounter.css` | При выводе сниппета (если включён total или online) |
| `js/viewcounter.js` | На **странице товара** через плагин `msViewCounterTrack`, если режим не `fake` и включён `show_online` |

Сниппет регистрирует CSS; heartbeat JS на карточке товара добавляет плагин.

## Связь с плагинами

- **`msViewCounterTrack`** — определяет страницу товара, вызывает `recordVisit`, регистрирует JS с конфигом `window.msViewCounterConfig` (connector URL, productId, sessionId, interval).
- **`msViewCounterBootstrap`** — инициализация сервиса при старте MODX.

## См. также

- [Страница товара](../frontend/product)
- [Интеграция — режимы](../integration#режимы-работы)
- [Системные настройки](../settings)
- [FAQ](../faq)
