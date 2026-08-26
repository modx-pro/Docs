---
title: PageBuilder Pro
description: Capabilities Pro, библиотека секций, версии, пресеты и processors
---

# PageBuilder Pro

Transport **pagebuilderpro** расширяет Free-редактор. Ставится одним пакетом: ядро `pagebuilder` подтягивается как зависимость.

## Capabilities

`ProFeatureProvider` регистрирует флаги. Клиент читает список через `PageBuilderConfig.capabilities`.

| Capability | Назначение |
| --- | --- |
| `pro` | Базовый флаг лицензии |
| `library` | Переиспользуемые секции: save/link/insert/edit master (`pb_library_items`) |
| `versions` | История публикаций страницы и восстановление версий. Журнал событий секции |
| `responsive` | Breakpoint desktop / tablet / mobile для text, textarea, url, number, currency, richtext, slug |
| `conditions` | `settings.conditions` + evaluator (loggedIn, guest, context, GET, …) |
| `presets` | Готовые пресеты секций в каталоге |
| `i18n-copy` | Копирование секции между контекстами |
| `advanced-fields` | 20 типов полей в CMP (группа Pro в dropdown). Без Pro доступны 30 Free-типов |
| `basket` | Глобальная корзина CMP (`mgr/basket/*`) |
| `api` | [Agent API](agent-api): snapshot и apply секций |

Vue-модуль `pro-resource.min.js` на вкладке ресурса добавляет панели **Library** и **History** в sidebar.

## Pro-секции

JSON в `pagebuilderpro/sections/`. Chunk: `pagebuilderpro_{key}`. Регистрация через plugin на `pbOnRegisterSectionDefinitions`.

| Группа | Примеры |
| --- | --- |
| Universal | features, video, team, tabs |
| Extras | map, contact_map, logos, blog_posts |
| Commerce | products_grid, categories_row, product_spotlight |

Commerce требует **miniShop3** (`requires: ["pro", "minishop3"]`). Каталог на сайте: [Секции Pro](sections/).

## Библиотека секций

Сохраните блок из редактора в библиотеку, вставьте на другой ресурс или свяжите с master-копией. При рендере данные master подмешиваются в связанные экземпляры.

Processors: `mgr/library/list`, `save`, `remove`.

## Версии и история

Снимки опубликованного документа, сравнение версий, откат в черновик. Журнал событий отдельной секции.

Processors: `mgr/versions/list`, `get`, `restore`, `mgr/sectionevents/*`.

## Пресеты

Готовые наборы секций для типовых лендингов в каталоге добавления.

Processor: `mgr/presets/list`.

## Processors Pro (сводка)

| Действие | Назначение |
| --- | --- |
| `mgr/library/*` | Библиотека секций |
| `mgr/versions/*` | Версии страницы |
| `mgr/sectionevents/*` | Журнал секции |
| `mgr/presets/list` | Пресеты |
| `mgr/basket/*` | [Глобальная корзина CMP](cmp#basket-pro) |
| `mgr/api/page/snapshot` / `apply` | [Agent API](agent-api) |
| `mgr/ms3/products/search` | Автодополнение товаров в commerce-секциях |

## Связанные страницы

- [Agent API](agent-api)
- [CMP](cmp)
- [Разработчик](developer)
- [Ключевые возможности](key-features#pagebuilder-pro)
