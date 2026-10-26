---
title: Сетка с фильтром
description: "filterable_grid: поиск, сортировка и страницы через Ajax, без JS остаётся GET. Слой Pro"
---

# Сетка с фильтром

Результат: посетитель фильтрует записи без перезагрузки. Без JavaScript форма остаётся обычным GET. Нужны PageBuilder Pro и capability `datasources`.

## Что нужно заранее

1. Ресурс опубликован, в шаблоне стоит `[[!PageBuilder]]`.
2. Capability `datasources` включена.
3. Провайдер уже отдаёт строки: дочерние ресурсы, таблица с `table_key` или miniShop3.

## Шаги

1. Добавьте секцию `filterable_grid`.
2. Выберите datasource: `modx-resources`, `pagebuilder-tables` или `minishop3`. Для таблицы укажите ключ.
3. **Сохранить** ресурса. На сайте форма, сортировка и пагинация идут через `pagebuilder-filterable-grid.js`. Адрес обновляет `history.pushState`.
4. Параметры: `pb_fg_{id}_search`, `_sort`, `_dir`, `_page`, `_f_{поле}`. Префикс `pb_fg_{id}_` пишет `DatasourceSectionEnricher` в `filter_param_prefix`.
5. Колонки `image` и `id` в фильтр и сортировку не попадают. Подпись фильтра берётся из `label` колонки.

| Тип поля | Оператор |
| --- | --- |
| text | `contains` |
| number, currency | `gte` |
| color, colorpalette, yesno, toggle | `eq` |

Страница больше последней приводится к последней. Пустой результат: `pagebuilder_fe_filter_empty`. Кнопка сброса: `pagebuilder_fe_filter_clear`.

## Пример полей

Title `Каталог`. Datasource `pagebuilder-tables`, ключ таблицы тот же, что на вкладке **Таблицы**. **Лимит** `12` (размер страницы).

## Что проверить

С JavaScript список обновляется без полной перезагрузки, а query остаётся в адресе. Выключите JavaScript и отправьте форму: это обычный GET с теми же параметрами.

## Откат

Удалите секцию.

## См. также

- [Сетка с фильтром](../sections/filterable_grid)
- [Динамический список](dynamic-list)
