---
title: Админка и модерация
description: 'CMP msReviews — дашборд, отзывы, вопросы, медиа, операции, вкладка на ресурсе'
---
<!-- TODO: translate from docs/components/msreviews/manager.md -->


# Админка и модерация

## Открытие

**Extras → msReviews**. Нужен **VueTools ≥ 1.1.2-pl** ([документация VueTools](/components/vuetools/)). Без VueTools вместо интерфейса — подсказка об установке.

Права: [Права доступа](permissions). Настройки — **Система → Настройки**, namespace **`msreviews`**.

<!-- ![Дашборд CMP](/components/msreviews/screenshots/dashboard.png) -->

## Вкладка на карточке товара

Для ресурсов **msProduct** (class_key из **`msreviews_product_class_key`**) на **resource/update** появляется вкладка **«Отзывы»** при праве **`review_view`**.

Read-only сводка: средний рейтинг, число опубликованных, pending отзывов и вопросов. Кнопка **«Открыть модерацию»** → **Extras → msReviews** с `?product_id=`.

<!-- ![Вкладка на ресурсе](/components/msreviews/screenshots/resource-product-tab.png) -->

При `mode=new` вкладка не добавляется.

## Вкладки CMP

| Вкладка | Право | Содержание |
| --- | --- | --- |
| **Дашборд** | `review_analytics` | Счётчики, период, фильтр каталога |
| **Отзывы** | базовый доступ | Фильтры, таблица, bulk, превью |
| **Вопросы** | `question_moderate` | Q&A, ответ, закреп |
| **Медиа** | `review_view` | Фото к отзывам |
| **Операции** | export/import/queue | Письма, CSV, cron |

<!-- ![Модерация отзывов](/components/msreviews/screenshots/reviews-moderation.png) -->
<!-- ![Модерация вопросов](/components/msreviews/screenshots/questions-moderation.png) -->

## Дашборд

С правом **`review_analytics`**:

- счётчики: опубликовано, pending, verified, вопросы pending, очередь писем;
- фильтр по датам и области каталога;
- клик по карточке открывает **Отзывы** или **Операции** с фильтром.

## Отзывы

### Фильтры

Товар, статус, дата, рейтинг от/до, чекбоксы: verified, с фото, с ответом, «рекомендую».

URL с `?product_id=` или `?msr_product_id=` предзаполняет фильтр.

### Массовые действия

При **`review_moderate`**: выбор строк, статус, причина в журнале.

### Таблица

Колонки: id, товар, рейтинг, verified, медиа, текст, автор, дата, закреп, ответ магазина, статус, «полезно».

- **Превью** — полный текст, structured-поля, журнал модерации, spam signals.
- **Закреп** — только для published; на витрине выводятся первыми.

### Ответ магазина

Колонка **«Ответ магазина»** → диалог → сохранение. Пустой текст снимает ответ.

## Вопросы

Право **`question_moderate`**: фильтры, статус, ответ из CMP, закреп.

## Медиа

Право **`review_view`**: список вложений. Удаление при **`review_moderate`**.

Файлы: `assets/components/msreviews/upload/`.

## Операции

- **Очередь приглашений** — статусы писем, CSV, **Обработать очередь** (`queue_process`).
- **Экспорт** отзывов и вопросов в CSV.
- **Импорт отзывов** из CSV (мастер из трёх шагов, **`review_import`**).
- Подсказка cron: `action=request/process` + **`msreviews_cron_key`**.

## См. также

- [Права доступа](permissions)
- [Системные настройки](settings)
- [Страница товара](frontend/product)
