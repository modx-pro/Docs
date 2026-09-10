---
title: PageBuilder Pro
description: Флаги Pro, общие блоки, версии, примеры и действия connector
---

# PageBuilder Pro

Дополнение **pagebuilderpro** расширяет бесплатный редактор. При установке подтягивает ядро **pagebuilder** как зависимость.

## Флаги Pro

`ProFeatureProvider` регистрирует флаги лицензии и функций. Vue-редактор читает список из `PageBuilderConfig.capabilities`.

| Флаг | Назначение |
| --- | --- |
| `pro` | Лицензия Pro |
| `library` | Общие блоки: сохранение, связь, вставка, правка master (`pb_library_items`) |
| `versions` | История публикаций страницы, восстановление, журнал событий секции |
| `responsive` | Значения полей отдельно для desktop, tablet и mobile (text, textarea, url, number, currency, richtext, slug) |
| `conditions` | `settings.conditions` и evaluator (loggedIn, guest, context, GET, …) |
| `presets` | Вкладка **Примеры** в каталоге добавления (готовые блоки с текстом) |
| `i18n-copy` | Копирование секции между контекстами |
| `advanced-fields` | 20 типов полей в панели управления (группа Pro в списке). Без Pro доступны 31 тип Free |
| `basket` | Глобальная корзина в панели управления (`mgr/basket/*`) |
| `api` | [Agent API](agent-api): snapshot и apply секций |

Модуль `pro-resource.min.js` на вкладке ресурса добавляет в боковую колонку панели **Общие блоки** и **История**.

## Pro-секции

Определения лежат в `pagebuilderpro/sections/`, chunk называется `pagebuilderpro_{key}`. Новые типы регистрируют plugin на `pbOnRegisterSectionDefinitions`.

| Группа | Примеры ключей |
| --- | --- |
| Универсальные | features, video, team, tabs |
| Дополнительные | map, contact_map, logos, blog_posts |
| Коммерция | products_grid, categories_row, product_spotlight |

Секции витрины требуют **miniShop3** (`requires: ["pro", "minishop3"]`). Каталог на сайте: [Секции Pro](sections/).

## Общие блоки

Блок из редактора можно сохранить как общий, вставить на другой ресурс или связать с master-копией. При выводе на сайте данные master подмешиваются в связанные экземпляры. В каталоге **+ Создать** вкладка **Общие блоки** появляется, когда есть хотя бы один сохранённый элемент.

## Версии и история

Снимки опубликованного документа, сравнение версий и откат в черновик. У каждой секции свой журнал событий.

## Примеры

Вкладка **Примеры** в каталоге добавления: готовые блоки с текстом (capability `presets`, `mgr/presets/list`). После вставки поля можно править. Connector по-прежнему называется `presets`.

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
| `mgr/presets/list` | Список примеров для вкладки каталога |
| `mgr/basket/*` | [Глобальная корзина в панели управления](cmp#basket-pro) |
| `mgr/api/page/snapshot` / `apply` | [Agent API](agent-api) |
| `mgr/ms3/products/search` | Поиск товаров для commerce-секций |
| `mgr/ms3/categories/search` | Поиск категорий miniShop3 (parent в сетках и каруселях) |

## Связанные страницы

- [Agent API](agent-api)
- [Панель управления](cmp)
- [Разработчик](developer)
- [Ключевые возможности](key-features#pagebuilder-pro)
