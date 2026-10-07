---
title: Каталог товаров
description: Вывод msViewCounter в списке товаров msProducts
---

# Каталог товаров

В каталоге передайте **`pid`** из строки товара (`[[+id]]` / `{$id}`). Запись просмотра на листинге не идёт: её делает плагин `msViewCounterTrack`, и только для страницы товара. Страницу товара определяет не вид страницы, а признаки ресурса: `class_key` содержит `msProduct` **или** `template` совпадает с настройкой MiniShop3 `ms3_template_product_default`. Если шаблон товара назначен и категории, просмотр категории запишется как просмотр товара. Сниппет в каталоге **только показывает** текущее значение счётчика: в режиме `real` накопленное, в `boost` усиленное, в `fake` синтетическое.

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

Значения приходят в чанк на момент генерации страницы: в каталоге heartbeat не работает, конфиг скрипта не собирается, и до перезагрузки число не изменится. Атрибут `data-product-id` в разметке остаётся, но штатный JS его не читает.

![Счётчик в сетке каталога](/components/msviewcounter/screenshots/catalog-grid.jpg)

Числа на скриншоте зафиксированы на момент генерации страницы.

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

Модификатора вида в пакете нет: в `viewcounter.css` только `.msvc-counter`, `.msvc-counter__total` и `.msvc-counter__online`. Компактную карточку собирают двумя средствами: чанк без строки online и переопределение CSS-переменных.

**Чанк `tplMsViewCounterCompact`:**

::: code-group

```fenom
<div class="msvc-counter">
    {if $total_text}
        <p class="msvc-counter__total">{$total_text}</p>
    {/if}
</div>
```

```modx
<div class="msvc-counter">
    [[+total_text:notempty=`<p class="msvc-counter__total">[[+total_text]]</p>`]]
</div>
```

:::

**CSS для плитки каталога:**

```css
.product-card .msvc-counter {
    --msvc-padding: 0.25rem 0.5rem;
    --msvc-margin: 0;
    --msvc-gap: 0.25rem;
    --msvc-font-size: 0.8125rem;
    --msvc-background: transparent;
    --msvc-border: 0;
    --msvc-shadow: none;
}
```

Переменные объявлены на самом `.msvc-counter`, поэтому свой класс-модификатор на этом же элементе (например `.msvc-counter--compact`) перебьёт их только если подключить его **после** `viewcounter.css`. Селектор с родителем, как выше, имеет большую специфичность и от порядка подключения не зависит. Полный список переменных и значений по умолчанию: [Интеграция — CSS-переменные](../integration#css-peremennye).

Отдельно отключать heartbeat не нужно: в каталоге он и не подключается. JS регистрирует только плагин на странице товара, а сниппет на листинге добавляет лишь CSS. Строку online можно просто не выводить в чанке: на число это не влияет, значение всё равно приходит в плейсхолдере `online_text`. Глобальное `msviewcounter_show_online = Нет` убирает строку из всех чанков, а вместе с `msviewcounter_show_total = Нет` отключает и CSS: при обоих выключенных флагах `ViewCounter::registerStyles()` ничего не подключает.

::: tip Производительность
В плотной сетке каталога (десятки карточек) каждый вызов `msViewCounter` — это до двух SELECT к БД без кэша (просмотры и online). Для очень больших листингов рассмотрите вывод счётчика только на карточке товара или уменьшите `limit` в `msProducts`.
:::

## См. также

- [Страница товара](product)
- [Сниппет msViewCounter](../snippets/msViewCounter)
