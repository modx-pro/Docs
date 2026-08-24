---
title: "Ряд категорий"
description: "Карточки подкатегорий родителя через pdoResources (msCategory). Слой Pro."
---

# Ряд категорий

Навигация по каталогу: дочерние категории выбранного родителя с превью и ссылкой.

<!-- ![Ряд категорий](/components/pagebuilder/screenshots/sections/categories_row.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Зачем эта секция

- Подкатегории из msCategory через pdoResources
- Навигация по каталогу без ручного меню
- Превью и ссылки из ресурсов

## Где применять

- **Главная каталога** — вход в разделы
- **Страница родительской категории** — подкатегории
- **Лендинг** — витрина направлений

## Примеры страниц

- Каталог: [Hero](hero) → [Categories row](categories_row) → [Products grid](products_grid)
- Главная: [Categories row](categories_row) → [Promo banner](promo_banner)

## Что заполнить

**Родительская категория** и **Лимит**. Ресурсы должны быть класса msCategory.

## Похожие секции

- [Сетка товаров](products_grid) после выбора категории
- [Карточки](cards) для статичных разделов без MS3

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `categories_row` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_categories_row` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Родительская категория (`parent`)

Тип [relation](../fields/relation#vyvod-v-section-data). Обязательное. Выбор одного ресурса MODX в модальном окне поиска.

### Лимит (`limit`)

Тип [number](../fields/number#vyvod-v-section-data). Необязательное.

## Что видит посетитель

Горизонтальный ряд `pb-categories-row`.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "parent": 101,
  "limit": 6
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_categories_row`:

```fenom
{var $catalogParent = $parent.id|default:($parent_id|default:0)}
{var $listing = ''}
{if $catalogParent}
  {var $listing = $modx->runSnippet('pdoResources', [
    'parents' => $catalogParent,
    'depth' => 1,
    'limit' => $limit|default:8,
    'where' => ['class_key' => 'MiniShop3\\Model\\msCategory'],
    'tpl' => 'pagebuilderpro_ms3_category_row'
  ])}
{/if}
<section class="pb-section pb-section--categories-row pb-categories-row{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="categories_row"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-categories-row__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-categories-row__grid pb-grid">
        {$listing}
      </div>
    {else}
      <p class="pb-listing__empty">В этой категории нет подразделов.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/categories_row.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
