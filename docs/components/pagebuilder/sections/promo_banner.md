---
title: "Промо-баннер"
description: "Баннер с текстом, кнопкой, фоном и опциональной привязкой к товару. Слой Pro."
---

# Промо-баннер

Широкий промо-блок: заголовок, текст, CTA, фон и опционально карточка товара miniShop3.

<!-- ![Промо-баннер](/components/pagebuilder/screenshots/sections/promo_banner.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Промо между витринами

- Текст, фон и CTA как у hero, но компактнее
- Optional привязка к товару MS3
- Подходит для сезонных акций между витринами

## Сценарии акций

- Для сезонной распродажи на главной
- Для новинки с переходом в карточку
- Между секциями каталога

## Примеры страниц

- Главная: [Products grid](products_grid) → [Promo banner](promo_banner) → [Products carousel](products_carousel)
- Распродажа: [Hero](hero) → [Promo banner](promo_banner) → [Curated products](curated_products)

## Текст, кнопка, товар

Заполните текст и кнопку. **Товар** необязателен. Если выбран, chunk может показать мини-карточку.

## Похожие секции

- [Hero](hero) для первого экрана
- [CTA](cta) без фона и товара

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `promo_banner` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_promo_banner` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Обязательное.

### Текст (`text`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### Текст кнопки (`button_label`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### URL кнопки (`button_url`)

Тип [url](../fields/url#vyvod-v-section-data). Необязательное.

### Фон (`background`)

Тип [image](../fields/image#vyvod-v-section-data). Необязательное.

### Товар (`product`)

Тип [relation](../fields/relation#vyvod-v-section-data). Необязательное. Выбор одного ресурса MODX в модальном окне поиска.

## Что видит посетитель

Секция `pb-promo-banner` с CTA и optional product block.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "text": "Дополнительный текст под заголовком.",
  "button_label": "Подробнее",
  "button_url": "https://example.com/action",
  "background": {
    "url": "assets/images/example.jpg",
    "id": 12,
    "filename": "example.jpg",
    "extension": "jpg",
    "title": "example.jpg",
    "width": 1920,
    "height": 1080,
    "type": "image"
  },
  "product": 201
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_promo_banner`:

```fenom
{var $promoBg = is_array($background) ? ($background.url ?: '') : ($background ?: '')}
{var $productId = $pb_product_resource|default:($product_id|default:0)}
{var $listing = ''}
{if $productId}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => 0,
    'resources' => $productId,
    'limit' => 1,
    'tpl' => 'pagebuilderpro_ms3_product_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1
  ])}
{/if}
<section class="pb-section pb-section--promo-banner pb-promo-banner{if $promoBg} pb-promo-banner--media{/if}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="promo_banner"{if $id} id="pb-{$id|escape}"{/if}{if $promoBg} style="--pb-hero-bg: url('{$promoBg|escape}')"{/if}>
  <div class="pb-section__inner pb-promo-banner__inner">
    <h2 class="pb-heading pb-promo-banner__title">{$title|escape}</h2>
    {if $text}
      <p class="pb-promo-banner__text">{$text|escape}</p>
    {/if}
    {if $listing}
      <div class="pb-promo-banner__product">
        {$listing}
      </div>
    {/if}
    {if $button_label && $button_url}
      <a class="pb-promo-banner__button pb-button" href="{$button_url|escape}">{$button_label|escape}</a>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/promo_banner.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
