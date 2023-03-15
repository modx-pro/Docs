# Примеры использования компонента

## Вывод товаров только с остатками

Если необходимо вывести на странице только те товары, у которых хотя бы по одной комбинации свойств имеется остатки, необходимо вызвать сниппет `msProducts` следующим образом:

:::code-group

``` modx
[[!msProducts?
  &leftJoin=`{"Remains":{"class":"msprRemains","on":"msProduct.id = Remains.product_id AND Remains.remains > 0"}}`
  &groupby=`msProduct.id`
  &select=`{"msProduct":"*","Remains":"SUM(Remains.remains) as remains"}`
  &where=`{"Remains.remains:>":"0"}`
]]
```

``` fenom
{'!msProducts' | snippet : [
  'leftJoin' => [
    'Remains' => [
      'class' => 'msprRemains',
      'on' => 'msProduct.id = Remains.product_id AND Remains.remains >= 0'
    ]
  ],
  'groupby' => 'msProduct.id',
  'select' => [
    'msProduct' => '*',
    'Remains' => 'SUM(Remains.remains) as remains'
  ],
  'where' => [
    'Remains.remains:>' => '0'
  ]
]}
```

:::

При этом в плейсхолдер `[[+remains]]` будет записано общее количество оставшихся единиц товара (то же самое выводит сниппет `getRemains`, вызванный без указания свойств).

## Подключение остатков при вызове mFilter2

Если необходимо фильтровать товары по остатками в каталоге, необходимо добавить к вызову `mFilter2` следующие параметры:

:::code-group

```modx
  &loadModels=`msProductRemains`
  &leftJoin=`{"Remains":{"class":"msprRemains","on":"msProduct.id = Remains.product_id AND Remains.remains >= 0"}}`
  &groupby=`msProduct.id`
  &select=`{"msProduct":"*","Remains":"SUM(Remains.remains) as remains"}`
```

``` fenom
  'loadModels => 'msProductRemains',
  'leftJoin' => [
    'Remains' => [
      'class' => 'msprRemains',
      'on' => 'msProduct.id = Remains.product_id AND Remains.remains >= 0'
    ]
  ],
  'groupby' => 'msProduct.id',
  'select' => [
    'msProduct' => '*',
    'Remains' => 'SUM(Remains.remains) as remains'
  ],
```

:::

Для добавления фильтра "В наличии" необходимо также добавить к вызову `mFilter2` дополнительные параметры

:::code-group

```modx
  &filters=`mspr|remains:availability`
  &suggestionsRadio=`mspr|remains`
  &tplFilter.row.mspr|value=`tpl.mFilter2.filter.checkbox`
```

```fenom
  'filters' => 'mspr|remains:availability',
  'suggestionsRadio' => 'mspr|remains',
  'tplFilter.row.mspr|value' => 'tpl.mFilter2.filter.checkbox',
```

:::

А также в настройке `mse2_filters_handler_class` компонента `mSearch2` указать класс-обработчик фильтров

``` php
msprRemainsFilter
```
