---
title: ms3recentlyviewedSimilar
---
# Сниппет ms3recentlyviewedSimilar

Выводит товары из тех же категорий (родителей), что и переданные ID просмотренных. Сами эти товары исключает. Блок «Похожие на просмотренные».

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **ids** | ID просмотренных товаров через запятую | — |
| **tpl** | Чанк карточки товара | tplSimilarItem |
| **limit** | Макс. количество в выборке | 10 |
| **depth** | Глубина поиска по категориям. Значение `< 2` сниппет и AJAX поднимают до 2 | **2** |
| **tplOuter** | Чанк-обёртка | *(пусто)* |
| **fromDB** | ID из БД, если пользователь авторизован в текущем контексте | `false` |
| **autoIdsFallback** | Демо-ID при `fromDB` и пустом списке. По умолчанию выкл., нет в transport | `false` |
| **fallbackToRoot** / **fallbackReturnIds** | Запасной поиск по каталогу, если по категории пусто. Нет в transport | `true` |
| **where** | Доп. `where` для `msProducts` (JSON). Сливается с `id:NOT IN` | — |
| **showUnpublished** / **showDeleted** | В запрос товаров | `false` |

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

Через коннектор (AJAX): POST с `action=similar`, параметры `ids`, опционально `limit`, `tpl`, `depth`. См. [Подключение на сайте](/components/ms3recentlyviewed/frontend).
