---
title: Сниппеты
description: Обзор 17 сниппетов msReviews для витрины MiniShop3
---

# Сниппеты msReviews

Компонент поставляет 17 сниппетов для карточки, каталога, главной и готовых блоков (Hub, вкладки, фильтры). На странице товара **`product_id`** совпадает с id ресурса MS3 (`[[*id]]`).

Порядок вызова на карточке и три способа собрать блок: [Интеграция](../integration).

## Справочник

| Сниппет | Назначение |
| --- | --- |
| [msReviewsLexiconScript](msReviewsLexiconScript) | `window.msrLexicon` для JS форм и engagement |
| [msRatingSummary](msRatingSummary) | Сводка рейтинга (`full` / `aggregate`, `tplRatingCatalog`) |
| [msReviews](msReviews) | Список отзывов на странице товара, фильтры, pdoPage |
| [msReviewForm](msReviewForm) | Форма отзыва |
| [msQuestions](msQuestions) | Список Q&A |
| [msQuestionForm](msQuestionForm) | Форма вопроса |
| [msQnaBlock](msQnaBlock) | Список + форма Q&A одним вызовом |
| [msReviewSchema](msReviewSchema) | JSON-LD Product + Review (один раз на странице товара) |
| [msReviewsLatest](msReviewsLatest) | Последние отзывы (главная, лендинг) |
| [msTopRatedProducts](msTopRatedProducts) | Топ товаров по рейтингу |
| [msQuestionsLatest](msQuestionsLatest) | Последние вопросы с ответами (FAQ) |
| [msReviewMediaGallery](msReviewMediaGallery) | UGC-галерея фото отзывов |
| [msReviewPrompt](msReviewPrompt) | CTA «Будьте первым» при нуле отзывов |
| [msRatingBadge](msRatingBadge) | Микро-бейдж ★ avg (count) для каталога |
| [msReviewsHub](msReviewsHub) | Весь блок отзывов одним вызовом: сводка → список → форма → Q&A → schema |
| [msReviewsTabbed](msReviewsTabbed) | Вкладки «Отзывы / Вопросы» |
| [msReviewsFilters](msReviewsFilters) | Chip-фильтры списка отзывов (`msr_*` GET) |

## Порядок на карточке (сборка по частям)

1. `msReviewsLexiconScript`
2. `msRatingSummary`
3. по желанию: `msReviewPrompt`, `msReviewMediaGallery`, `msReviewsFilters`
4. `msReviews`
5. `msReviewForm`
6. Q&A: `msQuestionForm` + `msQuestions` или `msQnaBlock`
7. `msReviewSchema` — **один раз**

Вместо ручной сборки по частям: [msReviewsHub](msReviewsHub) или [msReviewsTabbed](msReviewsTabbed). Не вызывайте их вместе с отдельными `msReviews` / `msQuestions` на одной странице.

## Fenom и MODX

| Контекст | MODX | Fenom |
| --- | --- | --- |
| ID товара на странице товара | `[[*id]]` | `$_modx->resource.id` |
| ID в чанке msProducts | `[[+id]]` | `$id` |
| Некэшированный вызов | `[[!Snippet? ...]]` | `{'!Snippet' \| snippet : [...]}` |
| JSON-LD без экранирования | `[[!msReviewSchema? ...]]` | `{raw ('!msReviewSchema' \| snippet : [...])}` |

В Fenom не вызывайте `getObject()` из шаблона: у `$_modx` этого метода нет. Вызывайте сниппет напрямую; при `hideEmpty=1` блок останется пустым без отзывов.

## См. также

- [Интеграция](../integration)
- [Чанки](../chunks)
- [FAQ](../faq)
