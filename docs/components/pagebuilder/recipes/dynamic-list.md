---
title: Динамический список
description: "Секция dynamic_list читает modx-resources, таблицу PageBuilder или miniShop3. Слой Pro"
---

# Динамический список

Результат: на странице список записей на момент открытия, не копия в JSON секции. Нужны PageBuilder Pro и capability `datasources` (живой запрос к провайдеру).

## Что нужно заранее

1. Ресурс опубликован, в шаблоне стоит `[[!PageBuilder]]`.
2. Capability `datasources` включена. Без неё текст `Datasources are not available.`
3. Для провайдера `modx-resources` есть опубликованные дочерние ресурсы. Для таблицы заранее создан `table_key`. Для miniShop3 пакет установлен.

## Шаги

1. Добавьте секцию `dynamic_list`.
2. В поле `datasource` выберите провайдера: `modx-resources`, `pagebuilder-tables` или `minishop3`.
3. Для таблицы укажите ключ. Задайте фильтры, сортировку и limit. Лимит больше 100 `QueryPolicy` не пропустит.
4. Операторы: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. `contains` не различает регистр, в том числе кириллицу. Ключи `sql`, `php`, `snippet`, `class`, `classname` и `query` отклоняются.
5. Превью в менеджере идёт через `mgr/datasource/query`.
6. **Сохранить** ресурса публикует секцию. В чанк попадают `items` и `total`.

Пустой провайдер: `Datasource is not configured.` Пустой результат: лексикон `pagebuilder_fe_list_empty`. Если у записи есть `image`, карточка его показывает. Секция в контексте страницы, HTML-кеш её не замораживает. Без Pro и capability `datasources` тип `dynamic_list` и обогащение запросом к провайдеру недоступны.

## Пример полей

Провайдер `modx-resources`. Допустимые поля фильтра и sort:

| Поле |
| --- |
| `id` |
| `pagetitle` |
| `alias` |
| `parent` |
| `template` |
| `context_key` |
| `published` |

Фильтр как на странице секции: поле `parent`, оператор `eq`, значение `5` (id родителя, пример). Sort: поле `published`, direction `desc`. Limit запроса `20`. Отдельное поле секции **Лимит** можно поставить `8`.

Тот же набор ключей лежит в [данных секции](../sections/dynamic_list#vyvod-v-section-data). Менять published-ресурсы родителя `5` достаточно, чтобы список на сайте обновился. JSON секции при этом не переписывают.

## Что проверить

Превью в менеджере возвращает строки через `mgr/datasource/query`. На сайте карточки дочерних ресурсов родителя из фильтра. Запрос без строк показывает `pagebuilder_fe_list_empty`.

## Откат

Удалите секцию.

## См. также

- [Динамический список](../sections/dynamic_list)
- [Сетка с фильтром](filterable-grid)
- [Витрина магазина](shop-landing)
