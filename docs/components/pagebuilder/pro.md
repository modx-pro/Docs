---
title: PageBuilder Pro
description: Флаги Pro, библиотека секций, версии, пресеты и действия connector
---

# PageBuilder Pro

Дополнение **pagebuilderpro** расширяет бесплатный редактор. При установке подтягивает ядро **pagebuilder** как зависимость.

## Флаги Pro

`ProFeatureProvider` регистрирует флаги лицензии и функций. Vue-редактор читает список из `PageBuilderConfig.capabilities`.

| Флаг | Назначение |
| --- | --- |
| `pro` | Лицензия Pro |
| `library` | Библиотека секций: сохранение, связь, вставка, правка master (`pb_library_items`) |
| `versions` | История публикаций страницы, восстановление, журнал событий секции |
| `responsive` | Значения полей отдельно для desktop, tablet и mobile (text, textarea, url, number, currency, richtext, slug) |
| `conditions` | `settings.conditions` и evaluator (loggedIn, guest, context, GET, …) |
| `presets` | Готовые пресеты в каталоге секций |
| `i18n-copy` | Копирование секции между контекстами |
| `advanced-fields` | 20 типов полей в панели управления (группа Pro в списке). Без Pro доступны 30 типов Free |
| `basket` | Глобальная корзина в панели управления (`mgr/basket/*`) |
| `api` | [Agent API](agent-api): snapshot и apply секций |

Модуль `pro-resource.min.js` на вкладке ресурса добавляет в боковую колонку панели «Библиотека» и «История».

## Pro-секции

Определения лежат в `pagebuilderpro/sections/`, chunk называется `pagebuilderpro_{key}`. Новые типы регистрируют plugin на `pbOnRegisterSectionDefinitions`.

| Группа | Примеры ключей |
| --- | --- |
| Универсальные | features, video, team, tabs |
| Дополнительные | map, contact_map, logos, blog_posts |
| Коммерция | products_grid, categories_row, product_spotlight |

Секции витрины требуют **miniShop3** (`requires: ["pro", "minishop3"]`). Каталог на сайте: [Секции Pro](sections/).

## Библиотека секций

Блок из редактора можно сохранить в библиотеку, вставить на другой ресурс или связать с master-копией. При выводе на сайте данные master подмешиваются в связанные экземпляры.

## Версии и история

Снимки опубликованного документа, сравнение версий и откат в черновик. У каждой секции свой журнал событий.

## Пресеты

Готовые наборы секций для типовых лендингов в каталоге добавления.

## Действия connector (Pro)

Все запросы идут POST на `assets/components/pagebuilder/connector.php` с `action=mgr/...`, как у Vue-редактора.

| Действие | Назначение |
| --- | --- |
| `mgr/library/list` | Список элементов библиотеки |
| `mgr/library/save` | Сохранить или обновить элемент |
| `mgr/library/remove` | Удалить элемент |
| `mgr/library/adjustusage` | Счётчик использования элемента библиотеки |
| `mgr/versions/list` | Список версий страницы |
| `mgr/versions/get` | Одна версия документа |
| `mgr/versions/restore` | Откат черновика к версии |
| `mgr/sectionevents/list` | Журнал событий секции |
| `mgr/sectionevents/get` | Одна запись журнала |
| `mgr/sectionevents/record` | Добавить запись в журнал |
| `mgr/sectionevents/restore` | Восстановить состояние секции из журнала |
| `mgr/presets/list` | Список пресетов |
| `mgr/basket/*` | [Глобальная корзина в панели управления](cmp#basket-pro) |
| `mgr/api/page/snapshot` / `apply` | [Agent API](agent-api) |
| `mgr/ms3/products/search` | Поиск товаров для commerce-секций |
| `mgr/ms3/categories/search` | Поиск категорий miniShop3 (parent в сетках и каруселях) |

## Связанные страницы

- [Agent API](agent-api)
- [Панель управления](cmp)
- [Разработчик](developer)
- [Ключевые возможности](key-features#pagebuilder-pro)
