---
title: Страница товара
description: Вывод msViewCounter на карточке товара MiniShop3
---

# Страница товара

## Базовый вывод

Передайте ID текущего товара в `pid`. Вызов **некэшированный** (`[[!...]]` / `{'!...' | snippet}`).

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

Плагин **`msViewCounterTrack`** на `OnLoadWebDocument` записывает просмотр и регистрирует assets для страницы товара.

## Условный вывод только для msProduct

Если один шаблон назначен и товарам, и обычным страницам:

::: code-group

```fenom
{set $classKey = $_modx->resource.class_key | default : ''}
{set $isProduct = $classKey && (($classKey | replace : 'msProduct' : '') != $classKey)}

{if $isProduct}
    {'!msViewCounter' | snippet : [
        'pid' => $_modx->resource.id,
        'tpl' => 'tplMsViewCounter'
    ]}
{/if}
```

```modx
[[!msViewCounter?
    &pid=`[[*id]]`
    &tpl=`tplMsViewCounter`
]]
```

:::

В классическом MODX-синтаксисе надёжнее держать вызов в шаблоне, который назначен **только** товарам.

## Стандартный чанк

Пакет устанавливает **`tplMsViewCounter`** (MODX-синтаксис). Для Fenom-чанка используйте те же переменные и `{if}` вместо `:notempty`:

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

### Плейсхолдеры

| Плейсхолдер | MODX | Fenom |
|-------------|------|-------|
| ID товара | `[[+pid]]` | `{$pid}` |
| Просмотры | `[[+total]]` | `{$total}` |
| Online | `[[+online]]` | `{$online}` |
| Текст просмотров | `[[+total_text]]` | `{$total_text}` |
| Текст online | `[[+online_text]]` | `{$online_text}` |

Поля `total_text` и `online_text` пустые, если в настройках выключены `show_total` / `show_online`.

![Счётчик на странице товара](/components/msviewcounter/screenshots/product-page.png)

## Свой чанк

::: code-group

```fenom
{'!msViewCounter' | snippet : [
    'pid' => $_modx->resource.id,
    'tpl' => 'tplProductSocialProof'
]}
```

```modx
[[!msViewCounter?
    &pid=`[[*id]]`
    &tpl=`tplProductSocialProof`
]]
```

:::

Пример **`tplProductSocialProof`**:

::: code-group

```fenom
<aside class="product-social-proof">
    {if $total_text}
        <div class="product-social-proof__item">{$total_text}</div>
    {/if}
    {if $online_text}
        <div class="product-social-proof__item product-social-proof__item--online">{$online_text}</div>
    {/if}
</aside>
```

```modx
<aside class="product-social-proof">
    [[+total_text:notempty=`<div class="product-social-proof__item">[[+total_text]]</div>`]]
    [[+online_text:notempty=`<div class="product-social-proof__item product-social-proof__item--online">[[+online_text]]</div>`]]
</aside>
```

:::

Стилизация дефолтного блока: [Интеграция — стилизация](../integration#стилизация).

## Размещение на карточке

Типичные места в шаблоне msProduct:

- под заголовком и артикулом;
- рядом с ценой и кнопкой «В корзину»;
- в блоке social proof над отзывами.

## См. также

- [Сниппет msViewCounter](../snippets/msViewCounter)
- [Каталог товаров](catalog)
- [Быстрый старт](../quick-start)
