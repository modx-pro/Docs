---
title: msReviewsTabbed
description: Вкладки «Отзывы / Вопросы» на карточке товара msReviews
---

# Сниппет msReviewsTabbed

Собирает [msReviews](msReviews) и [msQuestions](msQuestions) в блок с вкладками «Отзывы / Вопросы». Переключение — `msreviews-tabs.js` (`type="module"`, подключается автоматически).

## Назначение

**Форму отзыва** и **JSON-LD** выводите отдельно: `msReviewsTabbed` их не включает.

## Где вызывать

- Шаблон **msProduct** вместо пары `msReviews` + `msQuestions`.
- Рядом (вне блока вкладок): [msReviewForm](msReviewForm), [msReviewSchema](msReviewSchema), [msReviewsLexiconScript](msReviewsLexiconScript).
- **Не дублируйте** с [msReviewsHub](msReviewsHub) или отдельными списками.

<!-- ![Вкладки «Отзывы / Вопросы» на витрине](/components/msreviews/screenshots/storefront-tabbed.png) -->

## Зависимости

- **MiniShop3**, **msReviews**
- **pdoTools 3.0+** — отрисовка чанков на Fenom
- **msReviewForm** и **msReviewSchema** — отдельными вызовами рядом с вкладками
- **msReviewsLexiconScript** — для engagement в списке отзывов

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3 |
| `activeTab` | `reviews` | `reviews` или `questions` |
| `showStats` | `0` | Статистика в шапке списка отзывов |
| `applyRequestFilters` | `0` | `1`: внутренний `msReviews` читает GET `msr_*` |
| `useGravatar` | `1` | Аватар Gravatar во внутреннем `msReviews` |
| `tpl` | `tplReviewsTabbed` | Чанк вкладок |
| `registerCss` | `1` | Подключать `reviews.css` этим вызовом |
| `registerJs` | `1` | Подключать JS витрины этим вызовом |

Внутренний `msReviews` получает `product_id`, `showStats`, `showHeading=0`, `applyRequestFilters` и `useGravatar`. Внутренний `msQuestions` получает только `product_id`. Остальные параметры списков (`limit`, фильтры) задавайте отдельными вызовами сниппетов.

## Вкладки + форма + schema

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviewsTabbed' | snippet : [
  'product_id' => $_modx->resource.id,
  'activeTab' => 'reviews',
  'showStats' => 0
]}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id, 'showHeading' => 0]}
<div class="msreviews-qna-stack">
  {'!msQuestionForm' | snippet : ['product_id' => $_modx->resource.id, 'showHeading' => 0]}
</div>
{raw ('!msReviewSchema' | snippet : ['product_id' => $_modx->resource.id])}
```

```modx
[[!msReviewsLexiconScript]]
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviewsTabbed? &product_id=`[[*id]]` &activeTab=`reviews` &showStats=`0`]]
[[!msReviewForm? &product_id=`[[*id]]` &showHeading=`0`]]
<div class="msreviews-qna-stack">
[[!msQuestionForm? &product_id=`[[*id]]` &showHeading=`0`]]
</div>
[[!msReviewSchema? &product_id=`[[*id]]`]]
```

:::

## Вкладка «Вопросы» по умолчанию

::: code-group

```fenom
{'!msReviewsTabbed' | snippet : [
  'product_id' => $_modx->resource.id,
  'activeTab' => 'questions'
]}
```

```modx
[[!msReviewsTabbed? &product_id=`[[*id]]` &activeTab=`questions`]]
```

:::

## msReviewsHub или вкладки?

| Сниппет | Форма отзыва | JSON-LD | Q&A |
| --- | --- | --- | --- |
| `msReviewsHub` | внутри | внутри | внутри |
| `msReviewsTabbed` | отдельно | отдельно | список во вкладке, форма вопроса отдельно |

::: code-group

```fenom
{'!msReviewsTabbed' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id]}
{raw ('!msReviewSchema' | snippet : ['product_id' => $_modx->resource.id])}
```

```modx
[[!msReviewsTabbed? &product_id=`[[*id]]`]]
[[!msReviewForm? &product_id=`[[*id]]`]]
[[!msReviewSchema? &product_id=`[[*id]]`]]
```

:::

## См. также

- [msReviewsHub](msReviewsHub)
- [msReviewForm](msReviewForm)
- [msReviewSchema](msReviewSchema)
- [Интеграция](../integration)
- [FAQ](../faq)
