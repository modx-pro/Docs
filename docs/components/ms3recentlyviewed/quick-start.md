---
title: Быстрый старт
---
# Быстрый старт

## Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MiniShop3 | установлен |
| pdoTools | 3.0.0+ |
| VueTools | 1.2.0+ для менеджера (Import Map `vue` + `vuetools/theme`). Без него страница Extras пустая |
| Fenom | чанки через pdoTools. Жёсткой проверки `class_exists(Fenom)` нет |

## Шаг 1: Установка

1. Перейдите в **Extras → Installer**
2. Найдите **ms3RecentlyViewed** в списке доступных пакетов
3. Нажмите **Download** и затем **Install**. Админке нужен **VueTools ≥ 1.2.0**, хотя его нет в `requires` пакета.

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

Без `ms3rvLexiconScript` скрипт использует запасные русские фразы. Для мультиязычного сайта лексикон обязателен.

## Шаг 3: Страница товара — передать ID для учёта

Список заполняется при открытии страницы товара. Укажите ID текущего ресурса одним из способов.

**Атрибут на `<body>` (рекомендуется):**

::: code-group

```fenom
<body data-viewed-product-id="{$_modx->resource.id}">
```

```modx
<body data-viewed-product-id="[[*id]]">
```

:::

**Переменная в JS (перед `viewed.js`):**

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
| **JS `render()`** | По умолчанию: **`localStorage`**, гости и общий шаблон. Сервер при обычном GET **не видит** `localStorage`. Без JS список на странице не собрать. |
| **Сниппет с `fromDB`** | Пользователь авторизован в **текущем** контексте. `sync_enabled` влияет на запись, не на это чтение. |
| **Сниппет с `ids` + cookie** | Нужен **серверный** HTML для гостей. Задайте **`ms3recentlyviewed.storage_type`** = `cookie`. Плагин **ms3recentlyviewedViewedIdsPlaceholder** задаёт плейсхолдер **`viewedIds`**. В сниппет передайте `ids` из **`[[+viewedIds]]`** или `{$_modx->getPlaceholder('viewedIds')}` в Fenom. Имя **`viewedIds`** зарезервировано. Не перекрывайте его своими плагинами. |

### Клиентский вывод (JS)

Контейнер и вызов `render()` (одинаково для Fenom и MODX):

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

К контейнеру **`.ms3rv__list`** при необходимости автоматически добавляется класс `row` (Bootstrap). При наличии в DOM **`#ms3-recently-viewed`** и **`#ms3-similar`** скрипт может сам вызвать `render` на `DOMContentLoaded`. Явное подключение `viewed.css` в шаблоне по-прежнему рекомендуется. При отсутствии ссылки JS может подтянуть стили сам.

### Серверный вывод: cookie и плейсхолдер `viewedIds`

При **`storage_type` = `cookie`** плейсхолдер заполняет плагин:

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

Для пользователя, авторизованного в текущем контексте, можно не передавать `ids`:

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

Где нужно показать количество просмотренных (иконка, шапка):

```html
<span data-viewed-count style="display: none;">0</span>
```

Значение подставится при загрузке (1–99 или «99+»). При 0 элемент скрыт.

## Шаг 6: Блок «Похожие на просмотренные» (опционально)

Серверный вывод — сниппет **ms3recentlyviewedSimilar** с параметром `ids` (список ID просмотренных). При выводе списка через AJAX передайте те же `ids` в коннектор с `action=similar`.

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

Если используете только **`localStorage`**, для «Похожих» удобнее JS `renderSimilar()` или передача `ids` с сайта. Плейсхолдер **`viewedIds`** при `storage_type` = `localStorage` **пустой**. См. [Сниппет ms3recentlyviewedSimilar](snippets/ms3recentlyviewedSimilar), [Подключение на сайте](frontend).

## Что дальше

- [Системные настройки](settings) — лимит, тип хранилища, синхронизация в БД
- [Сниппеты](snippets/) — параметры `ms3recentlyviewed`, `ms3recentlyviewedSimilar`, `ms3rvLexiconScript`
- [Интерфейс админки](interface/) — дашборд и история просмотров
- [Подключение на сайте](frontend) — чанки и стили
