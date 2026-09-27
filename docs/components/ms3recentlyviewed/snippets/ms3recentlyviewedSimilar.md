---
title: ms3recentlyviewedSimilar
---
# Сниппет ms3recentlyviewedSimilar

Выводит товары из тех же категорий (родителей), что и переданные ID просмотренных, исключая сами эти товары. Блок «Похожие на просмотренные».

Один запрос `getCollection` получает родительские категории всех просмотренных товаров вместо N отдельных запросов.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **ids** | ID просмотренных товаров через запятую | — |
| **tpl** | Чанк карточки товара | tplSimilarItem |
| **limit** | Макс. количество в выборке | 10 |
| **depth** | Глубина поиска по категориям. Runtime ≥ 2. В transport значение `1` | **2** |
| **tplOuter** | Чанк-обёртка | *(пусто)* |
| **fromDB** | ID из БД, если пользователь авторизован в текущем контексте | `false` |
| **autoIdsFallback** | Демо-ID при `fromDB` и пустом списке. По умолчанию выкл., нет в transport | `false` |
| **fallbackToRoot** / **fallbackReturnIds** | Запасной поиск по каталогу, если по категории пусто. Нет в transport | `true` |
| **where** | Доп. `where` для `msProducts` (JSON). Сливается с `id:NOT IN` | — |
| **showUnpublished** / **showDeleted** | В запрос товаров | `false` |

**fromDB** читает таблицу для авторизованного пользователя. Демо-ID только при **`autoIdsFallback=1`**. Runtime **`depth` ≥ 2** (сниппет поднимает). В transport свойство = `1` и не действует.

## Примеры

::: code-group

```fenom
{'ms3recentlyviewedSimilar' | snippet : [
  'ids' => $_modx->getPlaceholder('viewedIds'),
  'limit' => 8,
  'depth' => 2,
  'tpl' => 'tplSimilarItem'
]}
```

```modx
[[!ms3recentlyviewedSimilar?
  &ids=`[[+viewedIds]]`
  &limit=`8`
  &depth=`2`
  &tpl=`tplSimilarItem`
]]
```

:::

Если по категориям ничего не найдено, сниппет может перейти к выборке по всему каталогу с увеличенной глубиной.

Через коннектор (AJAX): POST с `action=similar`, параметры `ids`, опционально `limit`, `tpl`, `depth`.
