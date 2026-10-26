---
title: ms3recentlyviewedSimilar
---
# Сниппет ms3recentlyviewedSimilar

Товары из тех же категорий (родителей), что у переданных ID. Эти ID исключаются. Блок «Похожие на просмотренные».

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **ids** | ID просмотренных товаров через запятую | — |
| **tpl** | Чанк карточки товара | tplSimilarItem |
| **limit** | Макс. количество в выборке | 10 |
| **depth** | Глубина поиска по категориям. Значение `< 2` сниппет и AJAX поднимают до 2 | **2** |
| **tplOuter** | Чанк-обёртка | *(пусто)* |
| **fromDB** | ID из БД, если пользователь авторизован в текущем контексте. Нет в transport | `false` |
| **autoIdsFallback** | Демо-ID при `fromDB` и пустом списке. По умолчанию выкл., нет в transport | `false` |
| **fallbackToRoot** / **fallbackReturnIds** | Запасной поиск по каталогу, если по категории пусто. Нет в transport | `true` |
| **where** | Доп. `where` для `msProducts` (JSON). Сливается с `id:NOT IN`. Нет в transport | — |
| **showUnpublished** / **showDeleted** | В запрос товаров. Нет в transport | `false` |

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

Если по категориям пусто, сниппет может выбрать по всему каталогу с большей глубиной. Без ID возвращается пустая строка.

`renderSimilar()` в `viewed.js`: 8 товаров по умолчанию, текущий исключается, `depth` не передаётся. На сервере остаётся 2. Пустой ответ скрывает контейнер. Лимит сниппета по умолчанию 10.

Коннектор (AJAX): POST `action=similar`, `ids`, опционально `limit`, `tpl`, `depth`. Контекст: `ms3recentlyviewed.context` (по умолчанию `web`). См. [Подключение на сайте](/components/ms3recentlyviewed/frontend).
