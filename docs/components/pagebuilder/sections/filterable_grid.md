---
title: "Сетка с фильтром"
description: "Записи datasource с GET-фильтрами, сортировкой и пагинацией. Слой Pro."
---

# Сетка с фильтром

Секция `filterable_grid` показывает записи с фильтрами в URL. Chunk: `pagebuilderpro_filterable_grid`. Нужны PageBuilder Pro и capability `datasources`.

1. Выберите datasource: `modx-resources`, `pagebuilder-tables` или `minishop3`.
2. Для таблиц укажите ключ `table`.
3. На сайте форма фильтров обновляет URL (`pb_fg_{sectionId}_*`). Пагинация сохраняет search, sort и `f_*`.

Пагинация в чанке идёт через `range` и `foreach`. Fenom `{for}` здесь не поддерживается.

Операторы запроса те же, что у [динамического списка](dynamic_list): `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. Ключи `sql`, `php`, `snippet` и `class` отклоняются. Страница не больше 100.

Секция входит в контекст страницы, чтобы HTML-кеш не замораживал фильтр.

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `datasource` | datasource | да | Провайдер и query |
| `limit` | number | нет | Размер страницы |

## Рендер

Форма `method="get"`. Префикс параметров `pb_fg_{id}_`, его пишет `DatasourceSectionEnricher` в `filter_param_prefix`. Имена: `search`, `sort`, `dir`, `f_{поле}`, `page`. Поле `id` в фильтрах пропускается.

Пагинация рисуется, если `page_count` больше 1. Пустой результат: лексикон `pagebuilder_fe_filter_empty`, запасная строка `No items.` Ошибки те же, что у [динамического списка](dynamic_list).

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Каталог",
  "datasource": {
    "provider": "modx-resources",
    "table": "",
    "filters": [],
    "sort": [{ "field": "menuindex", "direction": "asc" }],
    "search": "",
    "limit": 12
  },
  "limit": 12
}
```

## Похожие секции

- [Динамический список](dynamic_list) без формы фильтров
- [Сетка товаров](products_grid) для витрины miniShop3 через `msProducts`

## Связанные страницы

- [Каталог секций](index)
- [PageBuilder Pro](../pro)
