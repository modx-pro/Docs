---
title: Каталог товаров
description: Вывод msViewCounter в списке товаров msProducts
---

# Каталог товаров

В каталоге передайте **`pid`** из строки товара (`[[+id]]` / `{$id}`). Трекинг просмотров при листинге **не** выполняется — плагин `msViewCounterTrack` срабатывает только на странице товара. Сниппет в каталоге **только показывает** накопленную статистику.

## msProducts с отдельным чанком

**Вызов списка:**

::: code-group

```fenom
{'!msProducts' | snippet : [
    'parents' => 0,
    'limit' => 12,
    'tpl' => 'tplProductWithViewCounter'
]}
```

```modx
[[!msProducts?
    &parents=`0`
    &limit=`12`
    &tpl=`tplProductWithViewCounter`
]]
```

:::

**Чанк `tplProductWithViewCounter`:**

::: code-group

```fenom
<article class="product-card">
    <h3>{$pagetitle}</h3>
    {'!msViewCounter' | snippet : [
        'pid' => $id,
        'tpl' => 'tplMsViewCounter'
    ]}
</article>
```

```modx
<article class="product-card">
    <h3>[[+pagetitle]]</h3>
    [[!msViewCounter?
        &pid=`[[+id]]`
        &tpl=`tplMsViewCounter`
    ]]
</article>
```

:::

**Чанк `tplMsViewCounter`:**

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

![Счётчик в сетке каталога](/components/msviewcounter/screenshots/catalog-grid.png)

## msProducts с inline-шаблоном

::: code-group

```fenom
{'!msProducts' | snippet : [
    'parents' => 0,
    'limit' => 12,
    'tpl' => '@INLINE
        <article class="product-card">
            <h3>[[+pagetitle]]</h3>
            [[!msViewCounter? &pid=`[[+id]]` &tpl=`tplMsViewCounter`]]
        </article>
    '
]}
```

```modx
[[!msProducts?
    &parents=`0`
    &limit=`12`
    &tpl=`@INLINE
        <article class="product-card">
            <h3>[[+pagetitle]]</h3>
            [[!msViewCounter? &pid=`[[+id]]` &tpl=`tplMsViewCounter`]]
        </article>
    `
]]
```

:::

## Компактный вид в каталоге

Для плитки каталога часто достаточно одной строки total. Создайте чанк, например **`tplMsViewCounterCompact`**:

```modx
<div class="msvc-counter msvc-counter--compact" data-product-id="[[+pid]]">
    [[+total_text:notempty=`<p class="msvc-counter__total">[[+total_text]]</p>`]]
</div>
```

И отключите online глобально (`msviewcounter_show_online`) или скройте строку в чанке — тогда в каталоге не подтянется heartbeat JS для каждой карточки (JS регистрируется только при `show_online` и режиме не `fake` на **странице товара** через плагин; в каталоге сниппет подключает только CSS).

::: tip Производительность
В плотной сетке каталога (десятки карточек) каждый вызов `msViewCounter` — отдельный запрос к БД или расчёт fake/boost. Для очень больших листингов рассмотрите вывод счётчика только на карточке товара или лимит `limit` в `msProducts`.
:::

## См. также

- [Страница товара](product)
- [Сниппет msViewCounter](../snippets/msViewCounter)
