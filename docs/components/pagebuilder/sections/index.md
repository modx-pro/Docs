---
title: "Каталог секций"
description: "Встроенные блоки секций PageBuilder Free и Pro"
---

# Каталог секций

Встроенные блоки для страниц в менеджере MODX: выберите тип, заполните поля в инспекторе, переставляйте блоки на ресурсе.

Ключ (`key`) попадает в сниппет PageBuilder и в JSON документа. Свои типы добавляют через панель управления (Pro) или плагин на `pbOnRegisterSectionDefinitions`.

<!-- ![Каталог секций в менеджере](/components/pagebuilder/screenshots/mgr-section-catalog.jpg) -->

## Free: контент и layout (10)

| key | Секция | Категория | Требования |
| --- | --- | --- | --- |
| `contact` | [Контакты](contact) | конверсия | — |
| `cta` | [Призыв к действию](cta) | конверсия | — |
| `faq` | [Вопросы и ответы](faq) | контент | — |
| `gallery` | [Галерея](gallery) | медиа | authoring: Pro; runtime в Free |
| `hero` | [Первый экран (Hero)](hero) | герой | — |
| `richtext` | [Текстовый блок](richtext) | контент | — |
| `spacer` | [Отступ](spacer) | вёрстка | — |
| `stats` | [Цифры и факты](stats) | Отзывы и доверие (`social`) | — |
| `testimonials` | [Отзывы клиентов](testimonials) | Отзывы и доверие (`social`) | — |
| `video` | [Видео](video) | медиа | — |

## Free: utility (2)

| key | Секция | Требования |
| --- | --- | --- |
| `cards` | [Карточки](cards) | — |
| `image` | [Изображение](image) | — |

## Pro

| key | Секция | Категория | Требования |
| --- | --- | --- | --- |
| `blog_posts` | [Записи блога](blog_posts) | контент | pro |
| `brands_row` | [Ряд брендов](brands_row) | Коммерция (`commerce`) | pro, minishop3 |
| `categories_row` | [Ряд категорий](categories_row) | Коммерция (`commerce`) | pro, minishop3 |
| `contact_form` | [Форма обратной связи](contact_form) | конверсия | pro, FetchIt |
| `contact_map` | [Контакты с картой](contact_map) | конверсия | pro |
| `curated_products` | [Подборка товаров](curated_products) | Коммерция (`commerce`) | pro, minishop3 |
| `data_table` | [Таблица данных](data_table) | контент | pro |
| `features` | [Преимущества](features) | контент | pro |
| `gallery_carousel` | [Карусель галереи](gallery_carousel) | медиа | pro |
| `logos` | [Логотипы партнёров](logos) | Отзывы и доверие (`social`) | pro |
| `map` | [Карта](map) | медиа | pro |
| `pricing_table` | [Тарифы](pricing_table) | конверсия | pro |
| `product_comparison` | [Сравнение товаров](product_comparison) | Коммерция (`commerce`) | pro, minishop3 |
| `product_spotlight` | [Товар в фокусе](product_spotlight) | Коммерция (`commerce`) | pro, minishop3 |
| `products_carousel` | [Карусель товаров](products_carousel) | Коммерция (`commerce`) | pro, minishop3 |
| `products_grid` | [Сетка товаров](products_grid) | Коммерция (`commerce`) | pro, minishop3 |
| `promo_banner` | [Промо-баннер](promo_banner) | Коммерция (`commerce`) | pro, minishop3 |
| `quiz` | [Квиз](quiz) | конверсия | pro, FetchIt |
| `related_products` | [Похожие товары](related_products) | Коммерция (`commerce`) | pro, minishop3 |
| `spec_table` | [Таблица характеристик](spec_table) | контент | pro |
| `structured_content` | [Структурированный контент](structured_content) | контент | pro |
| `tabs` | [Вкладки](tabs) | контент | pro |
| `team` | [Команда](team) | Отзывы и доверие (`social`) | pro |
| `accordion` | [Аккордеон](accordion) | контент | pro |
| `before_after` | [До и после](before_after) | медиа | pro |
| `case_study` | [Кейс](case_study) | контент | pro |
| `downloads` | [Загрузки](downloads) | контент | pro |
| `dynamic_list` | [Динамический список](dynamic_list) | контент | pro, `datasources` |
| `filterable_grid` | [Сетка с фильтром](filterable_grid) | контент | pro, `datasources` |
| `form_builder` | [Конструктор формы](form_builder) | конверсия | pro, `forms`, FetchIt |
| `how_it_works` | [Как это работает](how_it_works) | контент | pro |
| `locations` | [Адреса](locations) | контент | pro |
| `media_split` | [Медиа и текст](media_split) | контент | pro |
| `newsletter` | [Рассылка](newsletter) | конверсия | pro |
| `notice` | [Уведомление](notice) | контент | pro |
| `portfolio` | [Портфолио](portfolio) | контент | pro |
| `quote` | [Цитата](quote) | контент | pro |
| `timeline` | [Хронология](timeline) | контент | pro |

Секции Коммерции требуют **miniShop3**. Без пакета `SectionRequirementChecker` уберёт их из каталога. Проверку переопределяют через `pbOnCheckSectionRequirement`.

Секции `quiz` и `contact_form` на витрине нуждаются в **FetchIt** (отдельная установка).

**msProducts** отрисовывает товарные секции: `products_grid`, `products_carousel`, `product_spotlight`, `product_comparison`, `promo_banner`, `curated_products`, `related_products`. **pdoResources** отрисовывает категории с классом `MiniShop3\Model\msCategory`.

[Рассылка](newsletter) шлёт HTML-форму на внешний `action_url`. Это не FetchIt. [Аккордеон](accordion) выводит `<details>` без JS.

[Конструктор формы](form_builder) требует capability `forms`. [Динамический список](dynamic_list) и [сетка с фильтром](filterable_grid) требуют `datasources`.

С флагом `runtimeContext: true` в JSON также [квиз](quiz) и [форма обратной связи](contact_form). Эти пять типов входят в контекст страницы, чтобы HTML-кеш их не замораживал.

Типы с `runSnippet` в чанке помечены `"cacheable": false`. HTML-кеш документа их не замораживает: `products_*`, `product_*`, `promo_banner`, `blog_posts`, `categories_row`, `data_table`, [подборка товаров](curated_products), [похожие товары](related_products).

## Связанные страницы

- [Разработчик](../developer)
- [Справочник типов полей](../fields/types)
- [Вывод на сайте](../frontend)
- [Менеджер и события](../integration)
