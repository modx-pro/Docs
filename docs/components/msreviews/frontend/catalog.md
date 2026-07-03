---
title: Каталог и главная
description: Рейтинг в msProducts, виджеты Latest, TopRated, QuestionsLatest, prefetch
---

# Каталог и главная

## Каталог (msProducts)

Компактная строка **★ 4.4 (32)** — чанк **`tplRatingCatalog`**, режим **`summaryMode=aggregate`**.

::: code-group

```fenom
{'!msRatingSummary' | snippet : [
  'product_id' => $id,
  'tpl' => 'tplRatingCatalog',
  'summaryMode' => 'aggregate',
  'hideEmpty' => 1
]}
```

```modx
[[!msRatingSummary?
  &product_id=`[[+id]]`
  &tpl=`tplRatingCatalog`
  &summaryMode=`aggregate`
  &hideEmpty=`1`
]]
```

:::

Параметр **`registerCss`** не указан — CSS подключится автоматически (см. ниже). Если прописали `<link>` в шаблоне каталога, добавьте **`registerCss=0`** / `&registerCss=`0``.

| Параметр | Назначение |
| --- | --- |
| `summaryMode=aggregate` | Только средняя и число отзывов |
| `hideEmpty=1` | Ничего при нуле отзывов |
| `registerCss=0` | Не просить сниппет подключить CSS (см. ниже) |

### Подключение `reviews.css` в каталоге

Стили звёзд и строки рейтинга лежат в:

```text
assets/components/msreviews/css/reviews.css
```

Полный URL на сайте: `[[++assets_url]]components/msreviews/css/reviews.css`.

#### Способ 1 — ничего не добавлять

Оставьте **`registerCss=1`** (значение по умолчанию) или вообще не передавайте параметр.

Пакет подключит CSS **один раз за запрос**, когда у первой карточки с отзывами отрисуется рейтинг. Повторные вызовы в сетке `msProducts` CSS не дублируют.

В карточке товара параметр **`registerCss=0`** не нужен.

#### Способ 2 — `<link>` в шаблоне каталога

Добавьте `<link>` **один раз** в шаблон страницы каталога (или в общий layout, если каталог его использует). В чанке карточки у всех вызовов `msRatingSummary` / `msRatingBadge` передайте **`registerCss=0`**.

**Шаблон каталога** (в `<head>` или перед `msProducts`):

::: code-group

```fenom
<link rel="stylesheet" href="{$_modx->getOption('assets_url')}components/msreviews/css/reviews.css">
```

```modx
<link rel="stylesheet" href="[[++assets_url]]components/msreviews/css/reviews.css">
```

:::

**Чанк карточки товара** (при ручном `<link>` в шаблоне):

::: code-group

```fenom
{'!msRatingSummary' | snippet : [
  'product_id' => $id,
  'tpl' => 'tplRatingCatalog',
  'summaryMode' => 'aggregate',
  'hideEmpty' => 1,
  'registerCss' => 0
]}
```

```modx
[[!msRatingSummary?
  &product_id=`[[+id]]`
  &tpl=`tplRatingCatalog`
  &summaryMode=`aggregate`
  &hideEmpty=`1`
  &registerCss=`0`
]]
```

:::

Если CSS подключаете вручную, настройка **`msreviews_frontend_css_enabled`** должна оставаться **`Да`** — она разрешает подключение стилей сниппетами; ваш `<link>` работает независимо от неё.

#### Способ 3 — через `regClientCSS` в Fenom-шаблоне

В шаблоне каталога один раз до вывода списка товаров:

```fenom
{$_modx->regClientCSS($_modx->getOption('assets_url') ~ 'components/msreviews/css/reviews.css')}
```

CSS попадёт в блок head через стандартный вывод MODX (`[[+head]]` или аналог в вашей теме). В карточках передайте **`registerCss=0`**.

::: warning
Если везде в каталоге стоит **`registerCss=0`**, а `<link>` в шаблон забыли, звёзды отобразятся без оформления.
:::

<!-- ![Рейтинг в сетке каталога](/components/msreviews/screenshots/catalog-rating.png) -->

### msRatingBadge

Ещё компактнее: [msRatingBadge](snippets/msRatingBadge).

::: code-group

```fenom
{'!msRatingBadge' | snippet : ['product_id' => $id, 'hideEmpty' => 1]}
```

```modx
[[!msRatingBadge? &product_id=`[[+id]]` &hideEmpty=`1`]]
```

:::

### Prefetch агрегатов (N+1)

В кастомном PHP (сниппет, плагин) перед циклом карточек вызовите **`msr_prefetch_aggregates($modx, $productIds)`** из `core/components/msreviews/include/helpers.php`. См. [Prefetch в events](events#prefetch-агрегатов).

## Главная и лендинги

<!-- ![Виджеты на главной](/components/msreviews/screenshots/widgets-homepage.png) -->

::: code-group

```fenom
{set $catalog_id = ('ms3_page_id_catalog' | option) ?: ('site_start' | option)}
{'!msTopRatedProducts' | snippet : [
  'limit' => 8,
  'minReviewCount' => 3,
  'parents' => $catalog_id,
  'hideEmpty' => 1
]}
{'!msReviewsLatest' | snippet : [
  'limit' => 6,
  'showProduct' => 1,
  'hideEmpty' => 1,
  'viewAllUrl' => ($catalog_id | url)
]}
{'!msQuestionsLatest' | snippet : [
  'limit' => 5,
  'parents' => $catalog_id,
  'faqOnly' => 1,
  'showProduct' => 1,
  'hideEmpty' => 1,
  'viewAllUrl' => ($catalog_id | url)
]}
```

```modx
[[!msTopRatedProducts? &limit=`8` &minReviewCount=`3` &parents=`[[++ms3_page_id_catalog]]` &hideEmpty=`1`]]
[[!msReviewsLatest? &limit=`6` &showProduct=`1` &hideEmpty=`1` &viewAllUrl=`[[~[[++ms3_page_id_catalog]]]]`]]
[[!msQuestionsLatest?
  &limit=`5`
  &parents=`[[++ms3_page_id_catalog]]`
  &faqOnly=`1`
  &showProduct=`1`
  &hideEmpty=`1`
  &viewAllUrl=`[[~[[++ms3_page_id_catalog]]]]`
]]
```

:::

Детали параметров:

- [msReviewsLatest](snippets/msReviewsLatest)
- [msTopRatedProducts](snippets/msTopRatedProducts)
- [msQuestionsLatest](snippets/msQuestionsLatest)

JSON-LD на главной **не выводится**.

## См. также

- [msRatingSummary](snippets/msRatingSummary)
- [Интеграция](integration)
