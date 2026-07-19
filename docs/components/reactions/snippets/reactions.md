---
title: Сниппет Reactions
---
# Сниппет Reactions

Выводит интерактивный блок реакций с счётчиками. Работает на любом объекте MODX: ресурс, товар miniShop3, комментарий Tickets.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `set` | из `reactions_default_set` | Ключ набора реакций (`updown`, `github`, `full` или свой) |
| `types` | *(пусто)* | Подмножество имён типов через запятую (пересечение с набором). Для `full` иначе берётся `reactions_full_types` |
| `layout` | `auto` | `auto` — picker если типов больше 3, иначе bar. `picker` — чипы + popover. `bar` — все кнопки в ряд |
| `class` | `modResource` | `class_key` объекта в xPDO |
| `object` | ID текущего ресурса | ID объекта |
| `context` | ключ текущего контекста | Контекст MODX (`web`, `mgr` и т.д.) |
| `tpl` | `tpl.Reactions` | Чанк одной кнопки реакции |
| `tplOuter` | `tpl.Reactions.outer` | Внешний чанк-обёртка |
| `toPlaceholder` | *(пусто)* | Имя плейсхолдера вместо прямого вывода |

## Встроенные типы и наборы

Все пресетные типы (имя → эмодзи). Имена — то, что передаёте в `&types=` и `reactions_full_types`.

| `name` | Эмодзи | `updown` | `github` | `full` |
| --- | --- | --- | --- | --- |
| `like` | 👍 | ✓ | ✓ | ✓ |
| `dislike` | 👎 | ✓ | ✓ | ✓ |
| `love` | ❤️ | | ✓ | ✓ |
| `funny` | 😂 | | ✓ | ✓ |
| `wow` | 😮 | | ✓ | ✓ |
| `sad` | 😢 | | ✓ | ✓ |
| `angry` | 😡 | | ✓ | ✓ |
| `hooray` | 🎉 | | ✓ | ✓ |
| `rocket` | 🚀 | | | ✓ |
| `eyes` | 👀 | | | ✓ |
| `fire` | 🔥 | | | ✓ |
| `clap` | 👏 | | | ✓ |
| `thinking` | 🤔 | | | ✓ |
| `party` | 🥳 | | | ✓ |
| `star` | ⭐ | | | ✓ |
| `beer` | 🍺 | | | ✓ |
| `sparkles` | ✨ | | | ✓ |
| `hundred` | 💯 | | | ✓ |
| `pray` | 🙏 | | | ✓ |
| `muscle` | 💪 | | | ✓ |
| `cool` | 😎 | | | ✓ |
| `heart_eyes` | 😍 | | | ✓ |
| `confused` | 😕 | | | ✓ |
| `raised_hands` | 🙌 | | | ✓ |

Кратко по наборам:

- `updown` (2) — `like`, `dislike`. Exclusive.
- `github` (8) — `like`, `dislike`, `love`, `funny`, `wow`, `sad`, `angry`, `hooray`.
- `full` (24) — все строки таблицы выше.

Пример значения для настройки или параметра:

```text
like,love,fire,star,clap,rocket,heart_eyes
```

Собственные типы добавляются через [CLI](../cli) или [admin API](../api#admin) и подключаются к набору. В эту таблицу они не входят.

## Плейсхолдеры чанка кнопки (`tpl`)

| Плейсхолдер | Описание |
| --- | --- |
| `[[+emoji]]` | Эмодзи типа реакции |
| `[[+name]]` | Имя типа (`like`, `love`, `funny`…) |
| `[[+count]]` | Текущий счётчик |
| `[[+active]]` | `1` если пользователь поставил эту реакцию, иначе `0` |

## Плейсхолдеры обёртки (`tplOuter`)

| Плейсхолдер | Описание |
| --- | --- |
| `[[+output]]` | HTML всех кнопок |
| `[[+total]]` | Сумма всех реакций |
| `[[+api_url]]` | URL API. Стандартный outer пишет в `data-api`. JS также умеет вывести API из пути `reactions.js` или `Reactions.config.api` |
| `[[+csrf]]` | CSRF-токен для AJAX |
| `[[+class_key]]` | Класс объекта (как в API, в БД — `object_class`) |
| `[[+object_id]]` | ID объекта |
| `[[+set]]` | Ключ набора |
| `[[+context]]` | Контекст |
| `[[+types]]` | Имена показанных типов через запятую (`data-types` для JS) |
| `[[+exclusive]]` | `1` / `0` — набор exclusive (`data-exclusive`) |
| `[[+allow_multiple]]` | `1` / `0` — настройка `reactions_allow_multiple` (`data-allow-multiple`) |
| `[[+layout]]` | `picker` или `bar` после разрешения `auto` (`data-layout`) |
| `[[+trigger]]` | HTML кнопки `+` для picker (пусто в bar) |

Для JS контейнеру нужны класс `reactions-widget` и data-атрибуты объекта (`data-class-key`, `data-object-id`). `data-api` не обязателен. См. [js](../js).

## Примеры

Примеры в синтаксисе MODX и Fenom.

### Набор из `reactions_default_set` (без `&set`)

::: code-group

```modx
[[!Reactions]]
```

```fenom
{'!Reactions' | snippet}
```

:::

### Exclusive: `updown`

::: code-group

```modx
[[!Reactions?
    &set=`updown`
    &class=`modResource`
    &object=`[[*id]]`
    &context=`web`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'     => 'updown',
    'class'   => 'modResource',
    'object'  => $_modx->resource.id,
    'context' => 'web',
]}
```

:::

### `github` — compact picker (по умолчанию при `layout=auto`)

Чипы текущих реакций и кнопка `+` с сеткой типов. Длинная полоса из 8 кнопок не нужна.

::: code-group

```modx
[[!Reactions? &set=`github`]]
[[!Reactions? &set=`github` &layout=`picker`]]
[[!Reactions? &set=`github` &layout=`bar`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'github']}
{'!Reactions' | snippet : ['set' => 'github', 'layout' => 'picker']}
{'!Reactions' | snippet : ['set' => 'github', 'layout' => 'bar']}
```

:::

### До 24 типов: `full` (тоже picker по умолчанию)

::: code-group

```modx
[[!Reactions? &set=`full`]]
[[!Reactions? &set=`full` &layout=`bar`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'full']}
{'!Reactions' | snippet : ['set' => 'full', 'layout' => 'bar']}
```

:::

Без `&types=` для `full` берётся системная `reactions_full_types`. Пустая настройка — все 24 типа в popover.

### Подмножество через `&types=` на `full`

::: code-group

```modx
[[!Reactions?
    &set=`full`
    &types=`like,love,fire,star,clap`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'   => 'full',
    'types' => 'like,love,fire,star,clap',
]}
```

:::

Приоритет фильтра: `&types=` → иначе `reactions_full_types` (только `full`) → весь набор. В `data-types` попадают только реально показанные имена.

### Отсев неизвестных имён в `&types=`

`not_a_type` отбрасывается. Остаются типы из набора.

::: code-group

```modx
[[!Reactions?
    &set=`full`
    &types=`like,angry,not_a_type`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'   => 'full',
    'types' => 'like,angry,not_a_type',
]}
```

:::

Результат: две кнопки — `like`, `angry`.

### `&types=` на `github`: имена вне набора игнорируются

`fire` есть в `full`, но не в `github` → на экране только `like` и `love`.

::: code-group

```modx
[[!Reactions?
    &set=`github`
    &types=`like,love,fire`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'   => 'github',
    'types' => 'like,love,fire',
]}
```

:::

### Товар miniShop3

Короткий класс `msProduct` и ID товара. Сервер сам резолвит FQCN.

::: code-group

```modx
[[!Reactions?
    &set=`github`
    &class=`msProduct`
    &object=`[[*id]]`
    &context=`web`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'     => 'github',
    'class'   => 'msProduct',
    'object'  => $_modx->resource.id,
    'context' => 'web',
]}
```

:::

То же с exclusive:

::: code-group

```modx
[[!Reactions?
    &set=`updown`
    &class=`msProduct`
    &object=`[[+id]]`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'    => 'updown',
    'class'  => 'msProduct',
    'object' => $id,
]}
```

:::

### Комментарий Tickets

На MODX 3 пакет Tickets пока не проверен. Схема вызова:

::: code-group

```modx
[[!Reactions?
    &class=`TicketComment`
    &object=`[[+id]]`
    &set=`updown`
]]
```

```fenom
{'!Reactions' | snippet : [
    'class'  => 'TicketComment',
    'object' => $id,
    'set'    => 'updown',
]}
```

:::

### Вывод в плейсхолдер

::: code-group

```modx
[[!Reactions?
    &set=`updown`
    &object=`[[*id]]`
    &toPlaceholder=`pageReactions`
]]
[[+pageReactions]]
```

```fenom
{'!Reactions' | snippet : [
    'set' => 'updown',
    'object' => $_modx->resource.id,
    'toPlaceholder' => 'pageReactions',
]}
{$_modx->getPlaceholder('pageReactions')}
```

:::

### Свои чанки кнопки и обёртки

::: code-group

```modx
[[!Reactions?
    &set=`github`
    &tpl=`myReactionBtn`
    &tplOuter=`myReactionsWrap`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set' => 'github',
    'tpl' => 'myReactionBtn',
    'tplOuter' => 'myReactionsWrap',
]}
```

:::

В `tplOuter` сохраните класс `reactions-widget` и data-атрибуты (`data-class-key`, `data-object-id`, `data-exclusive`, `data-allow-multiple`, `data-layout`…) и плейсхолдер `[[+trigger]]` для picker. См. [js](../js).

## Поведение кнопок

- Повторное нажатие снимает реакцию.
- В наборе `updown` (и любом `exclusive`) выбор другой реакции заменяет предыдущую.
- Несколько типов одновременно: набор не `exclusive` **и** `reactions_allow_multiple=Да` (иначе сервер держит один тип на посетителя даже для `github` / `full`).
- Счётчики обновляются через AJAX без перезагрузки страницы.

## Подключение скриптов

Без `reactions.js` кнопки отображаются, но не реагируют на клики.

::: code-group

```html
<link rel="stylesheet" href="[[++assets_url]]components/reactions/js/web/reactions.css">
<script src="[[++assets_url]]components/reactions/js/web/reactions.js" defer></script>
```

```html
<link rel="stylesheet" href="{'assets_url' | config}components/reactions/js/web/reactions.css">
<script src="{'assets_url' | config}components/reactions/js/web/reactions.js" defer></script>
```

:::
