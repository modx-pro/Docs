---
title: Сценарии
description: Flow A–I для менеджера и витрины ms3OptionsColor
---

# Сценарии

Короткие сценарии для менеджера и витрины. Если пакет ещё не ставили, начните с [быстрого старта](/components/ms3optionscolor/quick-start).

| Flow | Сценарий |
| --- | --- |
| A | Назначить HEX значению опции |
| B | Pattern вместо сплошного цвета |
| C | Найти unset в словаре и назначить |
| D | Добавить цвет в RAL |
| E | Select на карточке товара |
| F | Корзина через byOptions |
| G | Фильтр каталога mFilter |
| H | Сетка карточек каталога |
| I | Цвета вариантов в каталоге (ms3variants) |

## Flow A. Назначить HEX значению опции

1. Откройте товар → **Свойства товара** → значение для `color` → сохраните.
2. Вкладка **Swatches** → **Назначить** у нужной строки.
3. Введите HEX или выберите RAL → сохраните.

![Вкладка Swatches](/components/ms3optionscolor/screenshots/product-tab.png)

![Диалог цвета](/components/ms3optionscolor/screenshots/color-edit.png)

В словаре появляется активная запись. Другие товары с тем же `option_key` + `value` показывают тот же свотч. На **Свойства товара** у назначенных значений в чипах появляется квадрат цвета:

![Чипы опции со swatch](/components/ms3optionscolor/screenshots/product-options-chips.png)

## Flow B. Pattern вместо сплошного цвета

1. В диалоге переключите режим на **Паттерн**.
2. Укажите URL изображения в поле pattern.
3. Сохраните.

При переходе в режим **Паттерн** форма удаляет прежний RAL из сохраняемой записи. На витрине чанк рисует `background-image`. Select использует `data-pattern`.

![Диалог паттерна](/components/ms3optionscolor/screenshots/pattern-edit.png)

## Flow C. Словарь: найти unset и назначить

1. **Компоненты → ms3OptionsColor** → вкладка **Словарь**.
2. В фильтре статуса выберите **Не задан**.
3. Откройте строку карандашом → HEX / RAL / паттерн → сохраните.

![Фильтр unset](/components/ms3optionscolor/screenshots/dictionary-filter.png)

![Диалог назначения](/components/ms3optionscolor/screenshots/dictionary-assign.png)

Поиск по значению:

![Поиск в словаре](/components/ms3optionscolor/screenshots/dictionary.png)

## Flow D. Добавить цвет в RAL

1. Вкладка **RAL**.
2. **Добавить** → код, название, HEX → сохраните.
3. Поиск по коду проверяет запись в таблице.

![Вкладка RAL](/components/ms3optionscolor/screenshots/ral.png)

![Диалог RAL](/components/ms3optionscolor/screenshots/ral-add.png)

## Flow E. Select на карточке товара

1. Убедитесь, что `ms3optionscolor_frontend_css` включён (или подключите CSS вручную).
2. Подключите `js/web/select.js`.
3. Вызовите чанк `tplMs3OptionsColorSelect`.

::: code-group

```fenom
<script src="{'assets_url' | option}components/ms3optionscolor/js/web/select.js"></script>
{$_modx->getChunk('tplMs3OptionsColorSelect', [
  'product' => $_modx->resource.id,
  'option_key' => 'color',
  'caption' => 'Цвет',
  'native' => 1
])}
```

```modx
<script src="[[++assets_url]]components/ms3optionscolor/js/web/select.js"></script>
[[$tplMs3OptionsColorSelect?
  &product=`[[*id]]`
  &option_key=`color`
  &caption=`Цвет`
  &native=`1`
]]
```

:::

![Закрытый select](/components/ms3optionscolor/screenshots/storefront-select.png)

![Открытый список](/components/ms3optionscolor/screenshots/storefront-select-open.png)

Значение уходит в `options[color]` вместе с формой miniShop3.

## Flow F. Корзина через byOptions

В чанке строки корзины значения уже есть в `$product.options`. Не читайте опции из БД повторно:

::: code-group

```fenom
{set $colors = $_modx->runSnippet('!ms3OptionsColor', [
  'product' => $product.id,
  'byOptions' => json_encode($product.options),
  'return' => 'data'
])}
```

```modx
[[!ms3OptionsColor?
  &product=`[[+id]]`
  &byOptions=`{"color":["Синий","Чёрный"]}`
  &return=`data`
]]
```

:::

Готовый пример-чанк: `tplMs3OptionsColorCart`. Подробности: [Вывод на сайте](/components/ms3optionscolor/frontend#корзина).

![byOptions](/components/ms3optionscolor/screenshots/storefront-byoptions.png)

## Flow G. Фильтр каталога mFilter

В JSON набора фильтров:

```json
{
  "color": {
    "type": "ms3oc",
    "source": "option",
    "field": "color",
    "label": "Цвет",
    "tpl": "tplMFilterMs3OptionsColor"
  }
}
```

Встроенный тип `colors` не меняется. Для свотчей из словаря используйте `ms3oc`. Подробнее: [mFilter](/components/ms3optionscolor/mfilter).

![mFilter ms3oc](/components/ms3optionscolor/screenshots/storefront-mfilter.png)

## Flow H. Сетка карточек каталога

На листинге вызовите сниппет с `product` = ID товара строки:

::: code-group

```fenom
{'!ms3OptionsColor' | snippet : [
  'product' => $id,
  'options' => 'color',
  'tpl' => 'tplMs3OptionsColor',
  'limit' => 6
]}
```

```modx
[[!ms3OptionsColor?
  &product=`[[+id]]`
  &options=`color`
  &tpl=`tplMs3OptionsColor`
  &limit=`6`
]]
```

:::

![Сетка](/components/ms3optionscolor/screenshots/storefront-grid.png)

![Каталог](/components/ms3optionscolor/screenshots/storefront-catalog.png)

## Flow I. Цвета вариантов в каталоге

В `msProducts` задайте `usePackages=ms3Variants`. У вариантов в каталоге появятся цвета из словаря. Подробности: [ms3variants](/components/ms3optionscolor/ms3variants).

![Variants swatches](/components/ms3optionscolor/screenshots/storefront-variants.png)
