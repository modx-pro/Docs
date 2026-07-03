---
title: Интеграция и сценарии
description: 'Сборка блоков msReviews на карточке, каталоге, главной — pdoPage, verified, капча'
---
<!-- TODO: translate from docs/components/msreviews/integration.md -->


# Интеграция и сценарии

Подключите сниппеты в шаблонах MiniShop3. На карточке товара **`product_id`** — id ресурса MS3.

::: tip Fenom
Не вызывайте `getObject()` из шаблона: у `$_modx` этого метода нет. Вызывайте сниппет напрямую; при `hideEmpty=1` блок останется пустым без отзывов.
:::

## Три способа собрать блок на карточке

| Способ | Когда | Сниппеты |
| --- | --- | --- |
| **A — по частям** | Полный контроль разметки | LexiconScript → RatingSummary → … → Schema |
| **B — msReviewsHub** | Весь блок одним вызовом | `msReviewsHub` |
| **C — вкладки** | Компактная карточка | `msReviewsTabbed` + `msReviewForm` + `msReviewSchema` отдельно |

**Не смешивайте** `msReviewsHub` или `msReviewsTabbed` с отдельными `msReviews` / `msQuestions` на одной странице — получите дубли списков и второй JSON-LD.

Детали: [Страница товара](frontend/product).

## Verified purchase

1. Плагин **msReviews Order status** → очередь при статусах из **`msreviews_request_order_statuses`**.
2. Письмо со ссылкой на PDP: `?msr_token=…&msr_product_id=…`.
3. **`msReviewForm`** на той же странице с тем же `product_id`.
4. Настройки: [Verified в settings](settings#verified-purchase).

## Фильтры списка отзывов

Параметры **`msReviews`**: `verifiedOnly`, `withMedia`, `withReply`, `recommendOnly`, `sortBy=helpful`. По умолчанию те же фильтры читаются из GET `msr_*`.

Или сниппет **`msReviewsFilters`** — chip-ссылки с GET `msr_*`. Ставьте **перед** `msReviews`. Chip-ссылки ведут на `#msreviews-list-section` (якорь есть при `showHeading=1` у списка). См. [msReviewsFilters](snippets/msReviewsFilters).

**Кэш страницы:** при `cache_resource=1` HTML карточки кэшируется без учёта `?msr_*`. Пакет ставит плагин **msReviews Storefront cache** — не отключайте его, иначе фильтры «залипнут». С imageoptimizer HTML-кэшем плагин тоже сбрасывает ответ с query.

**Hub / Tabbed:** внутренний `msReviews` вызывается с `showHeading=0` и `applyRequestFilters=0`. Chip-фильтры снаружи Hub не сработают, пока не передадите **`applyRequestFilters=1`** в [msReviewsHub](snippets/msReviewsHub) / [msReviewsTabbed](snippets/msReviewsTabbed).

## Пагинация (pdoPage)

Нужен **pdoTools**. Обёртка `pdoPage` передаёт дочернему сниппету `limit`, `offset` и `totalVar`. Сниппеты **`msReviews`**, **`msQuestions`**, **`msReviewsLatest`**, **`msQuestionsLatest`** распознают вызов из pdoPage (через `setTotal` от pdoTools) и выводят **только карточки**, без шапки списка.

Параметр **`pdoPage`** у дочернего сниппета не передавайте: в менеджере его убрали. Старый `&pdoPage=`1`` на прямом вызове сниппета всё ещё работает.

Сводку **`msRatingSummary`** ставьте **над** обёрткой pdoPage. Прямой `[[!msReviews? …]]` без pdoPage даёт полный список с шапкой.

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'msReviews',
  'product_id' => $_modx->resource.id,
  'limit' => 5,
  'showStats' => 0,
  'pageVarKey' => 'reviews_page',
  'pageNavVar' => 'reviews.page.nav',
  'totalVar' => 'reviews.page.total'
]}
<div class="msreviews-pdopage-nav">{'reviews.page.nav' | placeholder}</div>
```

```modx
[[!pdoPage?
  &element=`msReviews`
  &product_id=`[[*id]]`
  &limit=`5`
  &showStats=`0`
  &pageVarKey=`reviews_page`
  &pageNavVar=`reviews.page.nav`
  &totalVar=`reviews.page.total`
]]
<div class="msreviews-pdopage-nav">[[!+reviews.page.nav]]</div>
```

:::

**Q&A** — тот же паттерн с `element=msQuestions`:

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'msQuestions',
  'product_id' => $_modx->resource.id,
  'limit' => 5,
  'pageVarKey' => 'qna_page',
  'pageNavVar' => 'qna.page.nav',
  'totalVar' => 'qna.page.total'
]}
<div class="msreviews-pdopage-nav">{'qna.page.nav' | placeholder}</div>
```

```modx
[[!pdoPage?
  &element=`msQuestions`
  &product_id=`[[*id]]`
  &limit=`5`
  &pageVarKey=`qna_page`
  &pageNavVar=`qna.page.nav`
  &totalVar=`qna.page.total`
]]
<div class="msreviews-pdopage-nav">[[!+qna.page.nav]]</div>
```

:::

Два блока на одной странице — разные **`pageVarKey`**, **`pageNavVar`**, **`totalVar`**.

Без pdoPage задайте **`limit`** и **`offset`** у прямого вызова сниппета.

После AJAX-обновления pdoPage вызовите **`window.msReviewsInitLists()`**, если кнопки «полезно» и правка перестали работать.

## SEO: JSON-LD

| Страница | HTML-рейтинг | JSON-LD |
| --- | --- | --- |
| Карточка товара | `msRatingSummary` (full) | **`msReviewSchema`** — один раз |
| Каталог | `tplRatingCatalog` / `msRatingBadge` | нет |
| Виджеты главной | Latest / TopRated | нет |

## «Полезно», правка, удаление

Скрипт **`reviews.js`** (через `msReviews` или `engagement=1` у `msReviewsLatest`) обрабатывает голос, правку и удаление. Настройки: **`msreviews_engagement_*`**.

## Капча

Встроенного виджета нет. Передайте HTML в **`&captchaHtml=`** формы и повесьте плагин на **`msrOnCaptchaVerify`**. См. [События MODX](events#капча-msroncaptchverify).

## Стилизация

Токены **`--msr-*`** в `reviews.css`. Переопределение на родителе карточки товара или через **`formClass`** у формы. В каталоге CSS подключают в шаблоне страницы или оставляют автоподключение сниппета — [Каталог — reviews.css](frontend/catalog#подключение-reviewscss-в-каталоге). Полный список токенов: [Чанки](chunks#css-токены-msr).

## См. также

- [Страница товара](frontend/product)
- [Каталог и главная](frontend/catalog)
- [Сниппеты](snippets/index)
