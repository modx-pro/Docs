---
title: mFilter
description: Тип фильтра ms3oc для свотчей из словаря ms3OptionsColor
---

# mFilter

Пакет добавляет тип фильтра **`ms3oc`**. В каталоге покупатель видит квадраты цвета из словаря, не голый список значений. Встроенный тип mFilter `colors` пакет не меняет.

Нужен установленный [mFilter](/components/mfilter/). Без него событие `OnMFilterInit` не сработает и типа `ms3oc` не будет.

```mermaid
flowchart LR
  Set[Filter Set type ms3oc]
  Form[mFilterForm]
  Dict[(Словарь цветов)]
  Page[Страница каталога]
  Set --> Form
  Dict --> Form
  Form --> Page
```

## Настройка Filter Set

1. Создайте **Filter Set** в mFilter и привяжите к странице каталога.
2. В JSON набора добавьте фильтр по опции:

```json
{
  "color": {
    "type": "ms3oc",
    "source": "option",
    "field": "color",
    "label": "Цвет",
    "tpl": "tplMFilterMs3OptionsColor",
    "multiple": true
  }
}
```

| Поле | Назначение |
| --- | --- |
| `type` | Всегда `ms3oc` для свотчей из словаря |
| `source` | Обычно `option` |
| `field` | Значения опции и `option_key` словаря. Если `field` пуст — ключ Filter Set |
| ключ объекта | Должен совпадать с `filters` у `mFilterForm`. На словарь не влияет, если задан `field` |
| `label` | Подпись блока на витрине |
| `tpl` | Чанк строки: штатный `tplMFilterMs3OptionsColor` или свой |
| `multiple` | Несколько значений сразу |

`option_key` словаря равен `field`, иначе ключу Filter Set. Пример: ключ `color_swatch` и `"field": "color"` ищет свотчи по `color` ([#1](https://github.com/Ibochkarev/ms3OptionsColor/issues/1)).

## Вызов на странице

Сначала сниппет результатов (`mFilter` / `baseIds`), затем форма:

::: code-group

```fenom
{'!mFilterForm' | snippet : [
  'filters' => 'color',
  'tplItem' => 'tplMFilterMs3OptionsColor'
]}
```

```modx
[[!mFilterForm?
  &filters=`color`
  &tplItem=`tplMFilterMs3OptionsColor`
]]
```

:::

Параметры `mFilter` / `mFilterForm` зависят от сборки. См. [сниппеты mFilter](/components/mfilter/snippets/). Для ms3OptionsColor:

- в Filter Set указан `"type": "ms3oc"`
- `filters` совпадает с ключом в JSON набора
- `mFilterForm` отдаёт в item `hex` / `pattern` / `ral` (или плоские `$hex`, `$pattern`, `$ral`)
- при необходимости задайте `&tplItem=tplMFilterMs3OptionsColor`

![Фильтр ms3oc](/components/ms3optionscolor/screenshots/storefront-mfilter.png)

## Чанк `tplMFilterMs3OptionsColor`

Два формата данных у чанка:

| Источник | Поля |
| --- | --- |
| demo / ручной вызов | `$item.value`, `$item.label`, `$item.hex`, `$item.pattern`, `$item.ral`, `$item.count`, `$item.selected` |
| mFilterForm | плоские `$value`, `$label`, `$hex`, `$pattern`, `$ral`, `$count`, `$active` |

Минимальный свой ряд (Fenom). Атрибуты `data-ms3oc-filter-label` и `data-ms3oc-filter-count` читает CSS пакета для подписи и счётчика.

```fenom
<label data-ms3oc-filter{if $active?} data-selected{/if}>
  <input type="checkbox" name="{$key}[]" value="{$value | escape}" {if $active?}checked{/if}>
  <span data-ms3oc-swatch data-size="sm"
        {if !$hex && !$pattern}data-empty{/if}
        style="{if $hex}background-color:{$hex};{/if}{if $pattern}background-image:url('{$pattern}');{/if}"></span>
  <span data-ms3oc-filter-label>{$label ?: $value}</span>
  <span data-ms3oc-filter-count>{$count}</span>
</label>
```

CSS витрины (`ms3optionscolor_frontend_css`) должен быть включён. Иначе свотч в фильтре часто без размера.

## Типичные ошибки

| Симптом | Что проверить |
| --- | --- |
| Нет свотчей, только текст | В Filter Set стоит `colors`, а не `ms3oc` |
| Тип `ms3oc` не находится | Установлен mFilter, очищен кэш, плагин подписан на `OnMFilterInit` |
| Значения нет в фильтре | У записи словаря нет HEX и pattern. `ms3oc` её пропускает |
| Пустые квадраты | Нет CSS (`frontend_css`) или свой чанк отдаёт пустой `hex` |
| Нет стилей | `ms3optionscolor_frontend_css` или ручной `<link>` на `css/web/main.css` |

Сценарий со скриншотом: [Flow G](interface/flows#flow-g-фильтр-каталога-mfilter). Общая витрина: [Вывод на сайте](frontend).
