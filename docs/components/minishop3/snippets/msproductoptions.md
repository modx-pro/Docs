---
title: msProductOptions
---
# msProductOptions

Выводит все опции товара вместе с их метаданными — подписью, группой, типом поля. Если ключи опций известны заранее, берите [msOptions](msoptions): он отдаёт метаданные плоскими ключами вида `material.caption`.

::: warning Опция должна быть заведена и включена для категории
В вывод попадают только опции, включённые для категории, в которой лежит товар. На чистой установке опций нет вообще — компонент их не добавляет, поэтому первый вызов на новом сайте вернёт пустоту.

Имена полей товара для опций заняты: `color`, `size`, `weight`, `article`, `price`, `vendor`, `description`, `source`, `action` и прочие из правила `reserved` модели `msOption`. Опция с таким ключом молча затеняется полем товара.
:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **product** | текущий ресурс | ID товара |
| **tpl** | `tpl.msProductOptions` | Чанк оформления |
| **onlyOptions** | | Вывести только указанные опции (через запятую) |
| **ignoreOptions** | | Игнорировать указанные опции |
| **groups** | | Только опции из групп (`group_name` из msOptionGroup, через запятую) |
| **ignoreGroups** | | Исключить группы (`group_name`) |
| **sortOptions** | | Порядок сортировки опций (через запятую) |
| **sortGroups** | | Порядок сортировки групп (через запятую) |
| **sortOptionValues** | | Сортировка значений внутри опций (см. [msOptions](msoptions#сортировка-значений-опций)) |
| **return** | `tpl` | Формат вывода: `tpl`, `data`, `array`. В свойствах сниппета не объявлен ([#805](https://github.com/modx-pro/MiniShop3/issues/805)) |

Опция без сохранённых значений в вывод не попадает. Опция с сохранённой пустой строкой проходит фильтр и выводится пустой: проверка смотрит на массив значений, а не на их содержимое.

### Устаревшие параметры

| Параметр | Замена |
| --- | --- |
| `&input` | `&product` |

## Примеры

### Все опции товара

```fenom
{'msProductOptions' | snippet}
```

### Для конкретного товара

```fenom
{'msProductOptions' | snippet : [
    'product' => 15
]}
```

### Только определённые опции

```fenom
{'msProductOptions' | snippet : [
    'onlyOptions' => 'material,length,season'
]}
```

::: tip Автосортировка
Если указан `onlyOptions`, но не указан `sortOptions`, опции сортируются в порядке, указанном в `onlyOptions`.
:::

::: warning Лишняя запятая отключает `onlyOptions`
Значение вида `,material,length` — с запятой в начале — молча снимает фильтрацию, и выводятся все опции товара ([#842](https://github.com/modx-pro/MiniShop3/issues/842)). Проверьте список, если вместо выбранных опций видите весь набор.
:::

### Исключить опции

```fenom
{'msProductOptions' | snippet : [
    'ignoreOptions' => 'internal_code,supplier_id'
]}
```

### Только из определённых групп

```fenom
{'msProductOptions' | snippet : [
    'groups' => 'Основные,Габариты'
]}
```

::: warning Фильтры учитывают регистр, сортировки — нет
`groups`, `ignoreGroups`, `onlyOptions` и `ignoreOptions` сравнивают строки как есть: `Основные` и `основные` для них разные группы, и опечатка в регистре молча оставит вывод пустым.

А `sortGroups` и `sortOptions` приводят значения к нижнему регистру, поэтому работают при любом написании. Из-за этой разницы одно и то же имя группы в двух параметрах ведёт себя по-разному.
:::

### С сортировкой групп и опций

```fenom
{'msProductOptions' | snippet : [
    'sortGroups' => 'Основные,Габариты,Дополнительные',
    'sortOptions' => 'material,length,season'
]}
```

::: warning Два параметра сортировки не складываются в иерархию
Сначала выполняется `sortGroups`, потом `sortOptions` пересортировывает **весь** список заново. Опции из `sortOptions` уходят в начало независимо от того, в какой они группе, и порядок групп рассыпается.

Указывайте что-то одно: либо порядок групп, либо порядок опций.
:::

### Возврат данных для обработки

```fenom
{set $options = 'msProductOptions' | snippet : [
    'return' => 'data'
]}

{foreach $options as $key => $option}
    <div class="option">
        <strong>{$option.caption}:</strong>
        {$option.value | join : ', '}
    </div>
{/foreach}
```

::: info Ключ опции
Обходите массив через `{foreach $options as $key => $option}`: в `$key` попадёт имя опции. То же значение лежит в поле `{$option.key}`.
:::

## Структура данных

При `return=data` или `return=array` сниппет возвращает ассоциативный массив, ключ — имя опции:

```php
[
    'material' => [
        'caption' => 'Материал',
        'value' => ['хлопок', 'лён'],
        'group_name' => 'Основные характеристики',
        'type' => 'comboOptions',
        'properties' => '{"source":"manual"}',
    ],
    'length' => [
        'caption' => 'Длина',
        'value' => ['120 см'],
        'group_name' => 'Основные характеристики',
        'type' => 'textfield',
    ],
    'season' => [
        'caption' => 'Сезон',
        'value' => ['зима'],
        'group_name' => 'Характеристики',
        'type' => 'combobox',
    ],
]
```

::: warning `value` всегда массив, даже для одного значения
Значения складываются в массив при любом типе поля — отдельного пути для скалярного значения в коде нет. Поэтому ветка `{else}` в проверке `{if $option.value is iterable}` никогда не выполнится, а `{$option.value}` без обхода напечатает `Array`.
:::

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
| --- | --- |
| `{$options}` | Ассоциативный массив опций товара |

### Поля каждой опции

| Поле | Описание |
| --- | --- |
| `{$option.caption}` | Название опции (человекочитаемое) |
| `{$option.value}` | Значения опции — всегда массив |
| `{$option.group_name}` | Название группы |
| `{$option.type}` | Тип поля: `textfield`, `numberfield`, `textarea`, `checkbox`, `combobox`, `comboBoolean`, `comboColors`, `comboMultiple`, `comboOptions`, `datefield` |
| `{$option.measure_unit}` | Единица измерения |
| `{$option.description}` | Описание опции |
| `{$option.properties}` | Дополнительные свойства — строка JSON, а не массив |
| `{$option.key}` | Имя опции, то же что ключ массива |
| `{$option.option_group_id}` | ID группы опций |
| `{$option.id}` | ID самой опции |

::: tip Подпись и описание можно переопределить для категории
`caption` и `description` берутся из опции, но если для категории заданы свои — в выводе окажутся они. Так одна опция выглядит по-разному в разных разделах каталога.
:::

## Чанк по умолчанию

```fenom
{* tpl.msProductOptions *}
{foreach $options as $option}
    <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">
            {$option.caption}:
        </label>
        <div class="col-6 col-md-9">
            {$option.value | join : ', '}
        </div>
    </div>
{/foreach}
```

## Свои чанки

### Группировка по группам

```fenom
{* tpl.myProductOptions.grouped *}
{if $options?}
    {set $grouped = []}

    {* Группируем опции по категориям *}
    {foreach $options as $option}
        {set $cat = $option.group_name ?: 'Основные'}
        {set $grouped[$cat][] = $option}
    {/foreach}

    {* Выводим сгруппированные опции *}
    {foreach $grouped as $groupName => $groupOptions}
        <div class="options-group">
            <h4>{$groupName}</h4>
            <table>
                {foreach $groupOptions as $option}
                    <tr>
                        <th>{$option.caption}</th>
                        <td>
                            {$option.value | join : ', '}
                        </td>
                    </tr>
                {/foreach}
            </table>
        </div>
    {/foreach}
{/if}
```

## Выбор опций при добавлении в корзину

```fenom
<form method="post" class="ms3_form" data-ms3-form>
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="ms3_action" value="cart/add">

    {set $options = 'msProductOptions' | snippet : [
        'return' => 'data',
        'onlyOptions' => 'material,length'
    ]}

    {foreach $options as $key => $option}
        <div class="form-group">
            <label>{$option.caption}</label>
            <select name="options[{$key}]" required>
                <option value="">Выберите {$option.caption | lower}</option>
                {foreach $option.value as $val}
                    <option value="{$val}">{$val}</option>
                {/foreach}
            </select>
        </div>
    {/foreach}

    <button type="submit">В корзину</button>
</form>
```
