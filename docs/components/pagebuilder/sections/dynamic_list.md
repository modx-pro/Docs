---
title: "Динамический список"
description: "Список записей провайдера datasource. Capability datasources. Слой Pro."
---

# Динамический список

Секция `dynamic_list` показывает записи провайдера на момент рендера. Chunk: `pagebuilderpro_dynamic_list`. Нужны PageBuilder Pro и capability `datasources`.

Провайдеры: `modx-resources`, `pagebuilder-tables`, `minishop3`. В поле `datasource` выбирают провайдера, при необходимости ключ таблицы, фильтры, sort и limit. Enrich вызывает `DatasourceQueryService` и передаёт в чанк `items` и `total`.

Превью в менеджере: `mgr/datasource/query`.

Секция входит в контекст страницы, чтобы HTML-кеш не замораживал живой список. Без Pro опубликованный HTML заново не строится: у типа `requires: ["pro"]`.

## Запрос

Запрос принимает только объявленные поля и операторы `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. `contains` не различает регистр, включая кириллицу. Ключи `sql`, `php`, `snippet` и `class` отклоняет `QueryPolicy`. Лимит больше 100 не проходит.

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `datasource` | datasource | да | Провайдер, фильтры, sort, limit |
| `limit` | number | нет | Лимит строк |

## Рендер

`ProSectionRenderSupport` наполняет `items`. Подпись строки берётся по цепочке `pagetitle`, `title`, `name`, `label`, `id`. Ссылка есть только при `uri`. Иначе `<span>`. Если у записи есть `image`, карточка его показывает.

Ошибка запроса пишется в `query_error`. Без capability `datasources` текст `Datasources are not available.` Пустой провайдер: `Datasource is not configured.` Пустой результат: лексикон `pagebuilder_fe_list_empty`, запасная строка `No items.`

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Новости",
  "datasource": {
    "provider": "modx-resources",
    "table": "",
    "filters": [{ "field": "parent", "op": "eq", "value": "5" }],
    "sort": [{ "field": "publishedon", "direction": "desc" }],
    "search": "",
    "limit": 20
  },
  "limit": 8
}
```

## Похожие секции

- [Сетка с фильтром](filterable_grid) для GET-фильтров и пагинации
- [Записи блога](blog_posts) для дочерних ресурсов через `pdoResources`

## Связанные страницы

- [Каталог секций](index)
- [PageBuilder Pro](../pro)
