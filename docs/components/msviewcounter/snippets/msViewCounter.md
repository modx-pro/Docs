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

При выключенных `msviewcounter_show_total` и `msviewcounter_show_online` текстовые плейсхолдеры приходят пустыми, а числовые `total` и `online` равны `0`. Чанк оборачивает строки в `:notempty` или `{if}`, поэтому пустые тексты не превращаются в пустые `<p>`.

Атрибут `data-product-id` в чанк штатный JS не читает: ID берётся из `window.msViewCounterConfig.productId`. Атрибут пригодится для своих скриптов и аналитики.

## Подключаемые assets

| Файл | Когда |
|------|-------|
| `css/viewcounter.css` | При выводе сниппета (если включён total или online) |
| `js/viewcounter.js` | На **странице товара** через плагин `msViewCounterTrack`, если режим не `fake` и включён `show_online` |

Сниппет регистрирует только CSS. JS подключает плагин, а не наоборот. Если выключены оба флага показа, не регистрируется даже CSS.

## Связь с плагинами

- **`msViewCounterBootstrap`** (событие `OnMODXInit`) — подключает `bootstrap.php`: автозагрузчик классов и функцию `msvc_get_service()`. С версии 1.0.1 сниппет подключает `bootstrap.php` сам, поэтому выключенный плагин не приводит к фатальной ошибке, но счётчик останется без учёта просмотров, без CSS и без heartbeat.
- **`msViewCounterTrack`** (`OnLoadWebDocument`) — определяет страницу товара по `class_key` с `msProduct` или по шаблону `ms3_template_product_default`, вызывает `recordVisit`, регистрирует JS с конфигом `window.msViewCounterConfig` (connector URL, productId, sessionId, interval).

## Connector

Heartbeat уходит в `assets/components/msviewcounter/connector.php` обычным POST-запросом:

| Параметр | Тип | Описание |
|----------|-----|----------|
| `action` | строка | Всегда `ping`. Любое другое значение даёт `Unknown action` |
| `product_id` | число | ID товара, `> 0`. Значение `0` и пустой `session_id` дают `Invalid payload` |
| `session_id` | строка | Идентификатор сессии, обрезается до 64 символов |

Ответ всегда `{"success": true}`, обработка ошибок на клиенте пустая. Значения приходят в запросе, но `session_id` сверяется с сессией на сервере, а частота ограничена 10 запросами в минуту на сессию — подробности в [FAQ](../faq#mozhno-li-nakrutit-online).

## См. также

- [Страница товара](../frontend/product)
- [Интеграция — режимы](../integration#rezhimy-raboty)
- [Системные настройки](../settings)
- [FAQ](../faq)
