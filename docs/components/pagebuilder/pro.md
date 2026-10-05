---
title: PageBuilder Pro
description: "Флаги Pro, библиотека pull, шаблоны страниц, журнал секций и действия connector"
---

# PageBuilder Pro

Дополнение **pagebuilderpro** расширяет бесплатный редактор. При установке подтягивает ядро **pagebuilder** как зависимость. Текущая линия: **1.0.15-beta**, требует `pagebuilder` ≥ **1.0.15**.

Free и Pro этой линии ставьте вместе: `ProFeatureProvider` реализует `serverContributions()` и `cmpContributions()`. Старый Pro без этих методов даёт fatal error при загрузке.

## Флаги Pro

`ProFeatureProvider` регистрирует флаги. Vue-редактор читает список из `PageBuilderConfig.capabilities`.

| Флаг | Назначение |
| --- | --- |
| `pro` | Лицензия Pro |
| `library` | Общие блоки: save/link/insert/edit master, pull с другой страницы, запись synced-полей в master (`pb_library_items`) |
| `versions` | Журнал событий секции (create/update/copy/remove/enable/disable) + View / Restore |
| `page-templates` | Шаблоны страниц: упорядоченные пустые секции (`pb_page_templates`, `mgr/pagetemplate/*`) |
| `responsive` | Значения полей отдельно для desktop, tablet и mobile (text, textarea, url, number, currency, richtext, slug) |
| `conditions` | `settings.conditions` и evaluator (loggedIn, guest, context, GET, …) |
| `presets` | Вкладка **Примеры** в каталоге (скрывается при `pagebuilder_catalog_examples_enabled = 0`) |
| `i18n-copy` | Копирование секции между контекстами |
| `advanced-fields` | 27 типов полей в панели управления (группа Pro в списке). Без Pro доступны 35 типов Free |
| `basket` | Глобальная корзина в панели управления (`mgr/basket/*`) |
| `utm` | Новые UTM-правила и реестр. Уже опубликованные правила исполняет Free |
| `collections` | Вкладки ресурса из панели управления (`pb_collections`, `mgr/collection/*`). Нужна ещё `pagebuilder_collections_enabled` |
| `datasources` | [Dynamic list](sections/dynamic_list) и [Filterable grid](sections/filterable_grid): провайдеры `modx-resources`, `pagebuilder-tables`, `minishop3`, `mgr/datasource/*` |
| `forms` | CMP Forms, [form_builder](sections/form_builder), FetchIt, CSRF, honeypot. Письмо и webhook после commit. Submissions в БД не пишутся |
| `api` | [Agent API](agent-api) и токены [REST v1](rest-api) (`mgr/resttoken/*`, вкладка API tokens) |
| `image-crop` | Кадрирование полей image/gallery (`mgr/media/crop`) |

Модуль `pro-resource.min.js` на вкладке ресурса добавляет в боковую колонку панель **Наследовать / Библиотека**. История секции открывается из контекстного меню строки.

## Pro-секции

Определения лежат в `pagebuilderpro/sections/`, chunk называется `pagebuilderpro_{key}`. Новые типы регистрируют plugin на `pbOnRegisterSectionDefinitions`.

| Группа | Примеры ключей |
| --- | --- |
| Универсальные | features, team, tabs |
| Контент и конверсия | pricing_table, contact_form, quiz, spec_table, how_it_works, case_study, newsletter, accordion |
| Дополнительные | map, contact_map, logos, blog_posts, timeline, portfolio, downloads, locations |
| Datasources и формы | dynamic_list, filterable_grid, form_builder |
| Коммерция | products_grid, categories_row, product_spotlight, promo_banner |

Секции витрины требуют **miniShop3** (`requires: ["pro", "minishop3"]`). Каталог на сайте: [Секции Pro](sections/).

Секции [quiz](sections/quiz) и [contact_form](sections/contact_form) на фронте нуждаются в **FetchIt**.

## Общие блоки {#obshchie-bloki}

Блок из редактора можно сохранить как общий. После **Сохранить как shared** секция на текущей странице сразу связывается с созданным master (`libraryLocalFields: []`).

| Действие | Поведение |
| --- | --- |
| Каталог → **Общие блоки** → Insert | Вставка linked или копии с master |
| Меню → **Подтянуть с другой страницы** | `mgr/library/pull`: режим **Связать** или **Копировать** |
| Чеклист локальных полей | `settings.libraryLocalFields` в инспекторе |
| Save / publish страницы | Запись synced-полей в master на сервере (`pbOnBeforeSave`) |

**Подтянуть** читает **черновик** источника. **Связать** создаёт master или берёт существующий, проставляет `libraryId` на источнике и вставляет linked-секцию на целевую. **Копировать** добавляет секции без связи.

При отрисовке master merge + локальные поля из `libraryLocalFields`. Без ключа в settings остаётся прежнее перекрытие: локальные ключи перекрывают master. После записи Library сбрасывается HTML-кеш `pagebuilder/*`.

Вкладка **Общие блоки** в каталоге видна даже при пустом списке.

## Журнал событий секции

Capability `versions`: **журнал событий одной секции**, не снимки всей страницы. Из меню строки: View / Restore (`mgr/sectionevents/*`). Page-level UI `mgr/versions/*` в текущей линии нет.

## Шаблоны страниц {#shablony-stranic}

Capability `page-templates`. Именованный скелет: упорядоченный список типов секций **без контента** (`pb_page_templates`).

| Где | Что делает |
| --- | --- |
| CMP → **Шаблоны страниц** | CRUD: имя, ID шаблонов MODX, порядок типов, default |
| Редактор → **Сохранить как шаблон** | Берёт только `type` / `typeVersion` с текущей страницы |
| Пустой outline | Кнопки «Применить …» для подходящих шаблонов |

Apply пишет черновик через `mgr/pagetemplate/apply` (на непустой draft нужен `force`).

## Примеры

Вкладка **Примеры** в каталоге добавления: готовые блоки с текстом (capability `presets`, `mgr/presets/list`). После вставки поля можно править. Скрытие без удаления JSON: `pagebuilder_catalog_examples_enabled` или тумблер в CMP Blocks.

В пакете 11 пресетов (`pagebuilderpro/sections/presets/`):

| Ключ | Тип секции |
| --- | --- |
| `hero-centered` | `hero` |
| `cta-banner` | `cta` |
| `stats-launch` | `stats` |
| `features-grid` | `features` |
| `contact-split` | `contact_map` |
| `blog-featured-first` | `blog_posts` |
| `blog-compact-list` | `blog_posts` |
| `pricing-saas` | `pricing_table` |
| `pricing-utm` | `data_table` |
| `products-hero` | `promo_banner` |
| `quiz-kitchen` | `quiz` |

`pricing-utm` это таблица `data_table`, не тарифы. `products-hero` требует miniShop3. `quiz-kitchen` требует FetchIt и задаёт старт «Начать подбор».

## Constructor Bundle

Вкладка **Bundle** в текущем релизе **скрыта** (`BUNDLE_ENABLED = false` в `ProFeatureProvider`). Процессоры `mgr/bundle/*` и UI есть, в CMP вкладка не регистрируется. Не обещайте её пользователю, пока флаг не включат в выпуске.

В бандл v1 не кладите secrets, токены, содержимое страниц и строки таблиц. Формы и datasources в этот формат не входят.

## Действия connector (Pro)

Все запросы идут POST на `assets/components/pagebuilder/connector.php` с `action=mgr/...`, как у Vue-редактора.

| Действие | Назначение |
| --- | --- |
| `mgr/library/list` | Список элементов библиотеки |
| `mgr/library/save` | Сохранить или обновить элемент |
| `mgr/library/remove` | Удалить элемент |
| `mgr/library/adjustusage` | Счётчик использования элемента библиотеки |
| `mgr/library/pull` | Подтянуть секции с другой страницы (link \| copy) |
| `mgr/sectionevents/list` | Журнал событий секции |
| `mgr/sectionevents/get` | Одна запись журнала / снимок секции |
| `mgr/sectionevents/record` | Добавить запись в журнал (внутреннее / тесты) |
| `mgr/sectionevents/restore` | Восстановить состояние секции из журнала |
| `mgr/pagetemplate/list` / `save` / `remove` | CRUD шаблонов страниц |
| `mgr/pagetemplate/apply` | Применить шаблон на черновик |
| `mgr/presets/list` | Список примеров для вкладки каталога |
| `mgr/basket/*` | [Глобальная корзина в панели управления](cmp#basket-pro) |
| `mgr/api/page/snapshot` / `apply` | [Agent API](agent-api) |
| `mgr/datasource/*` | Превью datasource |
| `mgr/form/*` | CMP Forms |
| `mgr/bundle/*` | Export, dry-run и import UI-типов |
| `mgr/resttoken/*` | Токены [REST API v1](rest-api) |
| `mgr/ms3/products/search` | Поиск товаров для commerce-секций |
| `mgr/ms3/categories/search` | Поиск категорий miniShop3 (parent в сетках и каруселях) |

## Связанные страницы

- [Agent API](agent-api)
- [Панель управления](cmp)
- [Разработчик](developer)
- [Ключевые возможности](key-features#pagebuilder-pro)
