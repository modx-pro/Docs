---
title: msOptions
---
# msOptions

Выводит указанные опции товара по их ключам. Если ключи заранее неизвестны, нужны все опции или выборка по группам — [msProductOptions](msproductoptions).

::: warning Опция должна существовать и быть включена для категории
Опция попадёт в `$options` при двух условиях: она заведена в админке и включена для категории, в которой лежит товар. Несуществующий ключ сниппет не создаёт, а молча пропускает.

На чистой установке опций нет вообще — компонент их не добавляет. Поэтому первый вызов на новом сайте вернёт пустоту, и это не ошибка настройки.
:::

::: danger Имена `color` и `size` для опций запрещены
Это колонки таблицы товара, и `msProduct::get()` проверяет их **раньше** опций. Опция с таким ключом молча затеняется: в выводе окажется значение поля товара, а не значение опции.

Полный список занятых имён — в правиле `reserved` модели `msOption`: все поля ресурса MODX плюс `article`, `price`, `old_price`, `weight`, `image`, `thumb`, `vendor`, `made_in`, `new`, `popular`, `favorite`, `tags`, `color`, `size`, `source`, `action`.
:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **product** | текущий ресурс | ID товара |
| **options** | | Список опций через запятую |
| **tpl** | `tpl.msOptions` | Чанк оформления |
| **sortOptionValues** | | [Сортировка значений опций](#сортировка-значений-опций) |

Опции с пустым первым значением не попадают в `$options` чанка.

### Устаревшие параметры

| Параметр | Замена |
| --- | --- |
| `&input` | `&product` |
| `&name` | `&options` |

Оба ещё работают, но будут удалены в будущих версиях.

## Примеры

### Опции текущего товара

:::code-group

```modx
[[msOptions? &options=`material,length`]]
```

```fenom
{'msOptions' | snippet : [
    'options' => 'material,length'
]}
```

:::

### Для конкретного товара

:::code-group

```modx
[[msOptions? &product=`123` &options=`material,length`]]
```

```fenom
{'msOptions' | snippet : [
    'product' => 123,
    'options' => 'material,length'
]}
```

:::

### Некэшируемый вызов

:::code-group

```modx
[[!msOptions? &options=`material,length`]]
```

```fenom
{'!msOptions' | snippet : [
    'options' => 'material,length'
]}
```

:::

::: warning Префикс работает по-разному в двух синтаксисах
`[[!msOptions]]` — настоящий некэшируемый вызов: в кэше страницы остаётся тег, сниппет выполняется при каждом запросе.

В Fenom `{'!msOptions' | snippet}` исполнение не откладывается. Сниппет отрабатывает там же, где встретился, и в кэш страницы попадает готовый результат: при следующем запросе не выполняется ни шаблон, ни сниппет.

Чтобы вывод опций пересчитывался на каждый запрос, снимите у ресурса галочку «Кэшировать» — это работает при любом синтаксисе вызова.
:::

### Со своим чанком

:::code-group

```modx
[[msOptions? &options=`material,length` &tpl=`myOptionsChunk`]]
```

```fenom
{'msOptions' | snippet : [
    'options' => 'material,length',
    'tpl' => 'myOptionsChunk'
]}
```

:::

### С сортировкой значений

:::code-group

```modx
[[msOptions? &options=`material,length` &sortOptionValues=`length:SORT_ASC:SORT_NATURAL`]]
```

```fenom
{'msOptions' | snippet : [
    'options' => 'material,length',
    'sortOptionValues' => 'length:SORT_ASC:SORT_NATURAL'
]}
```

:::

## Сортировка значений опций

`sortOptionValues` сортирует значения внутри каждой опции. Формат:

```text
имя_опции:направление:тип:первое_значение
```

| Часть | Описание | Возможные значения |
| --- | --- | --- |
| имя_опции | Ключ опции для сортировки | ключ любой существующей опции |
| направление | Направление сортировки | `SORT_ASC`, `SORT_DESC` |
| тип | Тип сортировки | `SORT_STRING`, `SORT_NUMERIC`, `SORT_NATURAL` |
| первое_значение | Значение, которое поставить первым (необязательно) | любое значение из списка |

### Примеры сортировки

```fenom
{* По алфавиту *}
'sortOptionValues' => 'material:SORT_ASC:SORT_STRING'

{* По алфавиту, но «хлопок» первым *}
'sortOptionValues' => 'material:SORT_ASC:SORT_STRING:хлопок'

{* Несколько опций *}
'sortOptionValues' => 'length:SORT_ASC:SORT_NATURAL, material:SORT_DESC:SORT_STRING'
```

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
| --- | --- |
| `{$id}` | ID товара |
| `{$options}` | Массив опций с их значениями |

## Структура данных

Под ключом опции лежит массив её значений, а рядом — метаданные с точкой в имени:

```php
[
    'material'              => ['хлопок', 'лён'],
    'material.caption'      => 'Материал',
    'material.description'  => 'Состав ткани',
    'material.type'         => 'comboOptions',
    'material.measure_unit' => '',
    'material.group_name'   => 'Характеристики',
]
```

Метаданные доступны и в чанке, и напрямую у товара: `{$product['material.caption']}`. Их можно запросить явно, перечислив в `options` рядом с ключом опции: `material,material.caption`.

## Чанк по умолчанию

Стандартный чанк `tpl.msOptions` выводит каждую опцию как `<select>`:


```fenom
{* tpl.msOptions *}
{foreach $options as $name => $values}
    <div class="form-group row align-items-center mb-4">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label"
               for="option_{$name}">
            {('ms3_product_' ~ $name) | lexicon}:
        </label>
        <div class="col-6 col-md-9">
            <select name="options[{$name}]" class="form-select col-md-6" id="option_{$name}">
                {foreach $values as $value}
                    <option value="{$value}">{$value}</option>
                {/foreach}
            </select>
        </div>
    </div>
{/foreach}
```

## Альтернативный чанк

```fenom
{* tpl.myOptions *}
{if $options?}
    {foreach $options as $key => $values}
        <strong>{$key}:</strong>
        {* значения опции приходят массивом, метаданные — отдельными ключами *}
        {if $values is iterable}
            {$values | join : ', '}
        {else}
            {$values}
        {/if}
    {/foreach}
{/if}
```
