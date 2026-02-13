---
title: Быстрый старт
---
# Быстрый старт

Пошаговое подключение блока «Недавно просмотренные» к сайту с MiniShop3.

## Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MiniShop3 | установлен |
| pdoTools | 3.0.0+ |

## Шаг 1: Установка

1. Перейдите в **Extras → Installer**
2. Найдите **ms3RecentlyViewed** в списке доступных пакетов
3. Нажмите **Download** и затем **Install**

## Шаг 2: Подключение лексикона, стилей и скрипта

В шаблоне (или в общем head/footer) подключите **сначала** лексикон, затем CSS и JS.

::: code-group

```fenom
{'ms3rvLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3recentlyviewed/css/viewed.css">
<script src="{'assets_url' | option}components/ms3recentlyviewed/js/viewed.js"></script>
```

```modx
[[!ms3rvLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3recentlyviewed/css/viewed.css">
<script src="[[++assets_url]]components/ms3recentlyviewed/js/viewed.js"></script>
```

:::

Без ms3rvLexiconScript скрипт использует запасные русские фразы; для мультиязычного сайта лексикон обязателен.

## Шаг 3: Страница товара — передать ID для учёта

Список заполняется **автоматически** при открытии страницы товара. Укажите ID текущего ресурса одним из способов.

**Атрибут на `<body>` (рекомендуется):**

::: code-group

```fenom
<body data-viewed-product-id="{$_modx->resource.id}">
```

```modx
<body data-viewed-product-id="[[*id]]">
```

:::

**Переменная в JS (перед viewed.js):**

::: code-group

```fenom
<script>window.ms3rvCurrentProductId = {$_modx->resource.id};</script>
```

```modx
<script>window.ms3rvCurrentProductId = [[*id]];</script>
```

:::

## Шаг 4: Блок «Недавно просмотренные»

Контейнер и вызов рендера (одинаково для Fenom и MODX):

```html
<div id="ms3-recently-viewed" class="ms3rv__list"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.ms3RecentlyViewed) {
    window.ms3RecentlyViewed.render('#ms3-recently-viewed');
  }
});
</script>
```

Скрипт запросит список у коннектора и выведет HTML. При отсутствии товаров блок не отображается.

## Шаг 5: Счётчик просмотренных (опционально)

Где нужно показывать количество просмотренных (иконка, шапка):

```html
<span data-viewed-count style="display: none;">0</span>
```

Значение подставится при загрузке (1–99 или «99+»); при 0 элемент скрыт.

## Шаг 6: Блок «Похожие на просмотренные» (опционально)

Под списком недавно просмотренных можно вывести товары из тех же категорий. Серверный вывод — сниппет **ms3recentlyviewedSimilar** с параметром `ids` (список ID просмотренных). При AJAX-рендере списка передайте те же `ids` в коннектор с `action=similar`.

::: code-group

```fenom
{'ms3recentlyviewedSimilar' | snippet : [
  'ids' => $viewedIds,
  'limit' => 8,
  'tpl' => 'tplViewedItem'
]}
```

```modx
[[!ms3recentlyviewedSimilar?
  &ids=`[[+viewedIds]]`
  &limit=`8`
  &tpl=`tplViewedItem`
]]
```

:::

Подробнее: [Сниппет ms3recentlyviewedSimilar](snippets/ms3recentlyviewedSimilar), [Подключение на сайте](frontend).

## Что дальше

- [Системные настройки](settings) — лимит, тип хранилища, синхронизация в БД
- [Сниппеты](snippets/) — параметры ms3recentlyviewed, ms3recentlyviewedSimilar, ms3rvLexiconScript
- [Интерфейс админки](interface/) — дашборд и история просмотров
- [Подключение на сайте](frontend) — кастомизация чанков и стилей
