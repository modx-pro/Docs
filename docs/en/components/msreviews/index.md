---
title: msReviews
description: Отзывы, рейтинг, Q&A и JSON-LD для MiniShop3
author: ibochkarev
logo: https://modstore.pro/assets/extras/msreviews/logo.png
modstore: https://modstore.pro/packages/ecommerce/msreviews
dependencies: miniShop3
categories: minishop3

items: [
  {
    text: 'Начало работы',
    link: 'quick-start',
    items: [
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Обновление до 1.2', link: 'upgrade-1.2' },
      { text: 'Системные настройки', link: 'settings' },
    ],
  },
  {
    text: 'Интеграция на сайте',
    link: 'integration',
    items: [
      { text: 'Сценарии на сайте', link: 'integration' },
      { text: 'Страница товара', link: 'frontend/product' },
      { text: 'Каталог товаров', link: 'frontend/catalog' },
      { text: 'Сниппеты (обзор)', link: 'snippets/index' },
      { text: 'msReviewsLexiconScript', link: 'snippets/msReviewsLexiconScript' },
      { text: 'msRatingSummary', link: 'snippets/msRatingSummary' },
      { text: 'msReviews', link: 'snippets/msReviews' },
      { text: 'msReviewForm', link: 'snippets/msReviewForm' },
      { text: 'msQuestions', link: 'snippets/msQuestions' },
      { text: 'msQuestionForm', link: 'snippets/msQuestionForm' },
      { text: 'msQnaBlock', link: 'snippets/msQnaBlock' },
      { text: 'msReviewSchema', link: 'snippets/msReviewSchema' },
      { text: 'msReviewsLatest', link: 'snippets/msReviewsLatest' },
      { text: 'msTopRatedProducts', link: 'snippets/msTopRatedProducts' },
      { text: 'msQuestionsLatest', link: 'snippets/msQuestionsLatest' },
      { text: 'msReviewMediaGallery', link: 'snippets/msReviewMediaGallery' },
      { text: 'msReviewPrompt', link: 'snippets/msReviewPrompt' },
      { text: 'msRatingBadge', link: 'snippets/msRatingBadge' },
      { text: 'msReviewsHub', link: 'snippets/msReviewsHub' },
      { text: 'msReviewsTabbed', link: 'snippets/msReviewsTabbed' },
      { text: 'msReviewsFilters', link: 'snippets/msReviewsFilters' },
      { text: 'Чанки', link: 'chunks' },
    ],
  },
  {
    text: 'Менеджер',
    link: 'manager',
    items: [
      { text: 'Админка и модерация', link: 'manager' },
      { text: 'Права доступа', link: 'permissions' },
    ],
  },
  {
    text: 'Для разработчика',
    link: 'api',
    items: [
      { text: 'AJAX API (connector)', link: 'api' },
      { text: 'События MODX и капча', link: 'events' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---

<!-- TODO: translate from docs/components/msreviews/index.md -->

# msReviews

**msReviews** — дополнение для [MODX Revolution 3](https://modx.com/) и [MiniShop3](/components/minishop3/): отзывы 1–5★, Q&A, фото к отзывам, подтверждённая покупка, JSON-LD и Vue-админка модерации.

С чего начать: [Быстрый старт](quick-start).

## Минимальный путь на витрине

1. Установить **MiniShop3** и **msReviews** через ModStore.
2. На шаблоне **msProduct** вывести блок сниппетов (см. [Быстрый старт](quick-start#шаг-2-блок-на-карточке-товара)).
3. В **Системные настройки** (namespace `msreviews`) задайте статусы заказа для писем и правила модерации.
4. **Настройки → Очистить кэш** и открыть карточку товара.
5. Модерация: **Extras → msReviews**.

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Установить и вывести блок на странице товара | [Быстрый старт](quick-start) |
| Переход с 1.1 на 1.2 | [Обновление до 1.2](upgrade-1.2) |
| Все ключи `msreviews_*` | [Системные настройки](settings) |
| Как собрать блок на карточке | [Интеграция](integration) |
| Карточка товара | [Страница товара](frontend/product) |
| Как подключить `reviews.css` в каталоге | [Каталог](frontend/catalog#подключение-reviewscss-в-каталоге), [msRatingSummary](snippets/msRatingSummary#подключение-reviewscss) |
| Параметры сниппетов | [Сниппеты (обзор)](snippets/index) |
| Чанки и CSS-токены | [Чанки](chunks) |
| CMP и модерация | [Админка](manager) |
| Connector API | [AJAX API](api) |
| Капча и события | [События MODX](events) |
| Диагностика | [FAQ](faq) |

## Возможности

- **Карточка товара** — сводка рейтинга, список отзывов, форма, Q&A, JSON-LD Product + Review
- **Готовые блоки для карточки** — `msReviewsHub`, вкладки, фильтры, CTA и галерея одним или несколькими вызовами
- **Каталог** — строка ★ 4.4 (32) через `tplRatingCatalog` или `msRatingBadge`
- **Главная** — `msReviewsLatest`, `msTopRatedProducts`, `msQuestionsLatest`
- **Verified purchase** — метка по токену из письма после заказа MS3
- **UGC** — плюсы/минусы, сценарий, вариант, «рекомендую», фото, оценки по критериям
- **Engagement** — «полезно», правка и удаление своего отзыва
- **CMP** — дашборд, модерация, ручное добавление и правка отзывов, медиа, CSV import/export, очередь писем

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| MiniShop3 | 1.0+ |
| VueTools | 1.1.2+ (только CMP) |
| pdoTools | 3.0+ (обязателен: чанки на Fenom, пагинация pdoPage) |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — товары `msProduct`, заказы, verified purchase
- **[pdoTools](/components/pdotools/) 3.0+** — рендер чанков витрины. Без него сниппеты вернут пустую строку

### Опционально

- **[CrawlerDetect](/components/crawlerdetect/)** — блок ботов при `msreviews_crawler_block_enabled`

## Установка

1. [Подключите ModStore](https://modstore.pro/info/connection).
2. **Extras → Installer → Download Extras** — **msReviews** → **Download** → **Install**.
3. Убедитесь, что установлены **MiniShop3**, **pdoTools 3.0+** и **VueTools** (для CMP).
4. **Настройки → Очистить кэш**.

## Термины

| Термин | Описание |
| --- | --- |
| **product_id** | ID ресурса (`site_content.id`). На карточке товара MS3 совпадает с id товара. В CMP с **1.2.1** отзыв можно привязать к любому неудалённому ресурсу |
| **display_avg** | Рейтинг для сортировки топа (алгоритм Wilson или среднее) |
| **verified** | Отзыв с подтверждённой покупкой по токену заказа |
| **Готовые блоки** | `msReviewsHub`, `msReviewsTabbed`, `msReviewsFilters` — вместо ручной сборки по частям |
| **pending** | Отзыв на модерации, не виден на витрине |

## Поток verified-отзыва

```mermaid
flowchart LR
  order[Заказ MS3]
  status[Статус из msreviews_request_order_statuses]
  queue[Очередь писем]
  email[Письмо с токеном]
  form[msReviewForm на странице товара]
  mod[Модерация CMP]
  pub[Опубликован на витрине]
  order --> status --> queue --> email --> form --> mod --> pub
```

См. [Интеграция](integration), [Системные настройки](settings).
