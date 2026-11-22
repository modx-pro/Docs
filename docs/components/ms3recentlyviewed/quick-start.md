---
title: Быстрый старт
---
# Быстрый старт

## Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MiniShop3 | 1.0.0+ |
| pdoTools | 3.0.0+ |
| VueTools | 1.2.0+ для менеджера (Import Map `vue` + `vuetools/theme`). Если ключей нет, модули снимаются и показывается предупреждение `ms3rv_vuetools_required` |
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

Без `ms3rvLexiconScript` пустой список берёт русскую фразу «Вы ещё ничего не смотрели». Хранилище остаётся `localStorage`, лимит в JS падает до 20. Для cookie и своего `max_items` сниппет нужен на каждой странице.

## Шаг 3: Страница товара — передать ID для учёта

На шаблоне товара MiniShop3 (`ms3_template_product_default`) плагин **ms3recentlyviewedSync** пишет `window.ms3rvCurrentProductId`. На своём шаблоне задайте ID сами.

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

Одинаково для Fenom и MODX:

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

Если ID в браузере нет, контейнер получает абзац с фразой лексикона `ms3recentlyviewed_empty`. Сам контейнер остаётся на странице. Скрывается только предок `#ms3-recently-viewed-section`. `emptyTpl` уходит в коннектор, когда ID уже есть.

Сниппет без ID оборачивает `emptyTpl` в `div` с `data-ms3rv-hydrate="viewed"`. На `DOMContentLoaded` `viewed.js` подставляет список из браузера.

К **`.ms3rv__list`** при необходимости добавляется класс `row` (Bootstrap). Если в DOM есть **`#ms3-recently-viewed`** или **`[data-ms3rv-hydrate="viewed"]`**, скрипт сам вызывает `render`. Подключите `viewed.css` в шаблоне. Если ссылки нет, JS подтягивает стили сам.

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

В иконке или шапке:

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

При **`localStorage`** плейсхолдер **`viewedIds`** пустой. Для «Похожих» вызывайте `renderSimilar()` или передайте `ids` с сайта. JS по умолчанию берёт 8 товаров, всегда убирает текущий товар и не шлёт `depth`. На сервере глубина остаётся 2. Пустой список прячет контейнер (`display: none`). См. [Сниппет ms3recentlyviewedSimilar](snippets/ms3recentlyviewedSimilar), [Подключение на сайте](frontend).

## Что дальше

- [Системные настройки](settings) — лимит, тип хранилища, синхронизация в БД
- [Сниппеты](snippets/) — параметры `ms3recentlyviewed`, `ms3recentlyviewedSimilar`, `ms3rvLexiconScript`
- [Интерфейс админки](interface/) — дашборд и история просмотров
- [Подключение на сайте](frontend) — чанки и стили
