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
| Fenom | обязателен для работы сниппетов и чанков |

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

### Как выбрать способ вывода

| Сценарий | Когда использовать |
|----------|-------------------|
| **JS `render()`** | По умолчанию: **`localStorage`**, гости и общий шаблон. Сервер при обычном GET **не видит** localStorage — без JS список на странице не собрать. |
| **Сниппет с `fromDB`** | Авторизованный пользователь в контексте **web**, синхронизация в БД включена — ID берутся из таблицы на сервере. |
| **Сниппет с `ids` + cookie** | Нужен **серверный** HTML для гостей: **`ms3recentlyviewed.storage_type` = `cookie`**, плагин **ms3recentlyviewedViewedIdsPlaceholder** задаёт плейсхолдер **`viewedIds`**, в сниппет передаётся `ids` из **`[[+viewedIds]]`** или `{$_modx->getPlaceholder('viewedIds')}` в Fenom. Имя **`viewedIds`** зарезервировано — не перекрывайте его своими плагинами. |

### Клиентский вывод (JS)

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

**Удобства в актуальной версии пакета:** к контейнеру **`.ms3rv__list`** при необходимости **автоматически добавляется класс `row`** (Bootstrap); при наличии в DOM **`#ms3-recently-viewed`** и **`#ms3-similar`** скрипт может **сам вызвать рендер** на `DOMContentLoaded`. Явное подключение `viewed.css` в шаблоне по-прежнему рекомендуется; при отсутствии ссылки JS может подтянуть стили сам.

### Серверный вывод: cookie и плейсхолдер `viewedIds`

При **`storage_type` = `cookie`** плейсхолдер заполняет плагин; список «Недавно просмотренные» на сервере:

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : [
  'ids' => $_modx->getPlaceholder('viewedIds'),
  'tpl' => 'tplViewedItem',
  'emptyTpl' => 'tplViewedEmpty'
]}
```

```modx
[[!ms3recentlyviewed?
  &ids=`[[+viewedIds]]`
  &tpl=`tplViewedItem`
  &emptyTpl=`tplViewedEmpty`
]]
```

:::

### Серверный вывод: только из БД (`fromDB`)

Для **авторизованного** пользователя (контекст **web**, синхронизация включена) можно не передавать `ids`:

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : ['fromDB' => true]}
```

```modx
[[!ms3recentlyviewed?
  &fromDB=`1`
]]
```

:::

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

Если используете только **localStorage**, для «Похожих» удобнее **JS** `renderSimilar()` или передача `ids` с фронта; плейсхолдер **`viewedIds`** при `storage_type` = `localStorage` **пустой**. Подробнее: [Сниппет ms3recentlyviewedSimilar](snippets/ms3recentlyviewedSimilar), [Подключение на сайте](frontend).

## Что дальше

- [Системные настройки](settings) — лимит, тип хранилища, синхронизация в БД
- [Сниппеты](snippets/) — параметры ms3recentlyviewed, ms3recentlyviewedSimilar, ms3rvLexiconScript
- [Интерфейс админки](interface/) — дашборд и история просмотров
- [Подключение на сайте](frontend) — кастомизация чанков и стилей
