---
title: Быстрый старт
description: Подключение CSS/JS и вывод блока реакций на странице ресурса
---

# Быстрый старт

Минимальный путь: подключить ассеты, вызвать сниппет, проверить клик.

## 1. CSS и JS

В шаблоне или через `registerClientScript` / `registerClientCSS`.

::: code-group

```modx
<link rel="stylesheet" href="[[++assets_url]]components/reactions/js/web/reactions.css">
<script src="[[++assets_url]]components/reactions/js/web/reactions.js" defer></script>
```

```html
<link rel="stylesheet" href="{'assets_url' | config}components/reactions/js/web/reactions.css">
<script src="{'assets_url' | config}components/reactions/js/web/reactions.js" defer></script>
```

:::

Подробнее про автоинициализацию и data-атрибуты — [JavaScript-виджет](js).

## 2. Блок реакций

На странице ресурса (набор `github`). При `layout=auto` (по умолчанию) виджет рисует compact picker: чипы + кнопка `+`. Для `updown` остаётся полоса из двух кнопок.

::: code-group

```modx
[[!Reactions? &set=`github`]]
[[!Reactions? &set=`updown`]]
[[!Reactions? &set=`github` &layout=`bar`]]
```

```fenom
{'!Reactions' | snippet : [
    'set' => 'github',
    'object' => $_modx->resource.id,
]}
{'!Reactions' | snippet : [
    'set' => 'github',
    'layout' => 'bar',
    'object' => $_modx->resource.id,
]}
```

:::

Без `&set` берётся значение `reactions_default_set` (по умолчанию `updown`).

Товар miniShop3:

::: code-group

```modx
[[!Reactions?
    &class=`msProduct`
    &object=`[[*id]]`
    &set=`updown`
]]
```

```fenom
{'!Reactions' | snippet : [
    'class'  => 'msProduct',
    'object' => $_modx->resource.id,
    'set'    => 'updown',
]}
```

:::

Параметры и чанки — [сниппет Reactions](snippets/reactions).

## 3. Проверка API

```bash
curl "https://example.com/assets/components/reactions/api.php?action=counts&class_key=modResource&object_id=1&context=web"
```

Виджет сам запрашивает CSRF и обновляет счётчики через AJAX.

## 4. Очистить кэш

После установки и смены настроек: **Настройки → Очистить кэш**.

---

Дальше:

- [Системные настройки](settings) — стратегия идентификации, rate limit, webhooks
- [Сниппеты](snippets/) — топы, счётчики, schema
- [Интеграции](integrations/minishop3) — miniShop3, pdoTools, Tickets
