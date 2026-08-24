---
title: "Каталог секций"
description: "Встроенные блоки секций PageBuilder Free и Pro"
---

# Каталог секций

Встроенные блоки для сборки страниц в менеджере MODX. Выберите тип секции, заполните поля в инспекторе и меняйте порядок блоков на ресурсе.

На странице каждой секции: **Зачем эта секция**, **Где применять**, **Примеры страниц** (типичный порядок блоков) и **Похожие секции** для выбора альтернативы.

Ключ секции (`key`) используется в сниппете PageBuilder и в JSON документа. Свои типы добавляют через CMP (Pro) или плагин на `pbOnRegisterSectionDefinitions`.

<!-- ![Каталог секций в менеджере](/components/pagebuilder/screenshots/mgr-section-catalog.png) -->

## Free — контент и layout (9)

| key | Секция | Категория | Требования |
| --- | --- | --- | --- |
| `contact` | [Контакты](contact) | конверсия | — |
| `cta` | [Призыв к действию](cta) | конверсия | — |
| `faq` | [Вопросы и ответы](faq) | контент | — |
| `gallery` | [Галерея](gallery) | медиа | — |
| `hero` | [Первый экран (Hero)](hero) | герой | — |
| `richtext` | [Текстовый блок](richtext) | контент | — |
| `spacer` | [Отступ](spacer) | вёрстка | — |
| `stats` | [Цифры и факты](stats) | доверие | — |
| `testimonials` | [Отзывы клиентов](testimonials) | доверие | — |

## Free — utility (2)

| key | Секция | Требования |
| --- | --- | --- |
| `cards` | [Карточки](cards) | — |
| `image` | [Изображение](image) | — |

## Pro

| key | Секция | Категория | Требования |
| --- | --- | --- | --- |
| `blog_posts` | [Записи блога](blog_posts) | контент | pro |
| `brands_row` | [Ряд брендов](brands_row) | магазин | pro, minishop3 |
| `categories_row` | [Ряд категорий](categories_row) | магазин | pro, minishop3 |
| `contact_form` | [Форма обратной связи](contact_form) | конверсия | pro |
| `contact_map` | [Контакты с картой](contact_map) | конверсия | pro |
| `curated_products` | [Подборка товаров](curated_products) | магазин | pro, minishop3 |
| `data_table` | [Таблица данных](data_table) | контент | pro |
| `features` | [Преимущества](features) | контент | pro |
| `gallery_carousel` | [Карусель галереи](gallery_carousel) | медиа | pro |
| `logos` | [Логотипы партнёров](logos) | доверие | pro |
| `map` | [Карта](map) | медиа | pro |
| `pricing_table` | [Тарифы](pricing_table) | конверсия | pro |
| `product_comparison` | [Сравнение товаров](product_comparison) | магазин | pro, minishop3 |
| `product_spotlight` | [Товар в фокусе](product_spotlight) | магазин | pro, minishop3 |
| `products_carousel` | [Карусель товаров](products_carousel) | магазин | pro, minishop3 |
| `products_grid` | [Сетка товаров](products_grid) | магазин | pro, minishop3 |
| `promo_banner` | [Промо-баннер](promo_banner) | магазин | pro, minishop3 |
| `related_products` | [Похожие товары](related_products) | магазин | pro, minishop3 |
| `spec_table` | [Таблица характеристик](spec_table) | контент | pro |
| `structured_content` | [Структурированный контент](structured_content) | контент | pro |
| `tabs` | [Вкладки](tabs) | контент | pro |
| `team` | [Команда](team) | доверие | pro |
| `video` | [Видео](video) | медиа | pro |

Commerce-секции требуют **miniShop3**. `SectionRequirementChecker` фильтрует каталог. Переопределение через `pbOnCheckSectionRequirement`.

Товарные секции (`products_grid`, `product_spotlight`, `promo_banner`) рендерятся через **msProducts**. Категории через **pdoResources** (`msCategory`).

## Связанные страницы

- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
- [Менеджер и события](../integration)
