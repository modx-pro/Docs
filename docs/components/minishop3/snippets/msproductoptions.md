---
title: msProductOptions
---
# msProductOptions

Расширенный сниппет для вывода всех или отфильтрованных опций товара с полной информацией о каждой (метаданные, категории, типы).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **product** | текущий ресурс | ID товара |
| **tpl** | `tpl.msProductOptions` | Чанк оформления |
| **onlyOptions** | | Вывести только указанные опции (через запятую) |
| **ignoreOptions** | | Игнорировать указанные опции |
| **groups** | | Вывести только опции из указанных групп |
| **ignoreGroups** | | Игнорировать указанные группы |
| **sortOptions** | | Порядок сортировки опций (через запятую) |
| **sortGroups** | | Порядок сортировки групп (через запятую) |
| **sortOptionValues** | | Сортировка значений внутри опций (см. [msOptions](msoptions#сортировка-значений-опций)) |
| **return** | `tpl` | Формат вывода: `tpl`, `data`, `array` |

::: tip Автосортировка
Если указан `onlyOptions`, но не указан `sortOptions`, то опции автоматически сортируются в порядке, указанном в `onlyOptions`.
:::

### Deprecated параметры

::: warning Обратная совместимость
Параметр `&input` устарел. Используйте `&product`.
:::

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
    'onlyOptions' => 'color,size,material,weight'
]}
```

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

### С сортировкой групп и опций

```fenom
{'msProductOptions' | snippet : [
    'sortGroups' => 'Основные,Габариты,Дополнительные',
    'sortOptions' => 'weight,dimensions,material,color'
]}
```

### Возврат данных для обработки

```fenom
{set $options = 'msProductOptions' | snippet : [
    'return' => 'data'
]}

{foreach $options as $key => $option}
    <div class="option">
        <strong>{$option.caption}:</strong>
        {if $option.value is array}
            {$option.value | join : ', '}
        {else}
            {$option.value}
        {/if}
    </div>
{/foreach}
```

## Структура данных

При `return=data` или `return=array` возвращается ассоциативный массив, где ключ — имя опции:

```php
[
    'color' => [
        'caption' => 'Цвет',
        'value' => ['Красный', 'Синий'],
        'category' => 'main',
        'category_name' => 'Основные характеристики',
        'type' => 'combo-options',
        'properties' => [...]
    ],
    'size' => [
        'caption' => 'Размер',
        'value' => 'M',
        'category' => 'main',
        'category_name' => 'Основные характеристики'
    ],
    'weight' => [
        'caption' => 'Вес',
        'value' => '250 г',
        'category' => 'specs',
        'category_name' => 'Характеристики'
    ]
]
```

::: info Ключ опции
Имя опции (`color`, `size`, `weight`) — это ключ массива, а не поле внутри опции. Для доступа к нему используйте синтаксис `{foreach $options as $key => $option}`.
:::

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `{$options}` | Ассоциативный массив опций товара |

### Поля каждой опции

| Поле | Описание |
|------|----------|
| `{$option.caption}` | Название опции (человекочитаемое) |
| `{$option.value}` | Значение (строка или массив) |
| `{$option.category}` | Ключ группы опций |
| `{$option.category_name}` | Название группы |
| `{$option.type}` | Тип поля (textfield, combo-options и т.д.) |
| `{$option.properties}` | Дополнительные свойства опции |

Для получения ключа опции используйте синтаксис foreach:

```fenom
{foreach $options as $key => $option}
    {* $key = 'color', 'size' и т.д. *}
    <div data-option="{$key}">{$option.caption}: {$option.value}</div>
{/foreach}
```

## Чанк по умолчанию

Стандартный чанк `tpl.msProductOptions` выводит опции в виде строк:

```fenom
{* tpl.msProductOptions *}
{foreach $options as $option}
    <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">
            {$option.caption}:
        </label>
        <div class="col-6 col-md-9">
            {if $option.value is array}
                {$option.value | join : ', '}
            {else}
                {$option.value}
            {/if}
        </div>
    </div>
{/foreach}
```

## Альтернативный чанк — таблица

```fenom
{* tpl.msProductOptions.table *}
{if $options?}
    <table class="product-options">
        <tbody>
            {foreach $options as $option}
                <tr>
                    <th>{$option.caption}</th>
                    <td>
                        {if $option.value is array}
                            {$option.value | join : ', '}
                        {else}
                            {$option.value}
                        {/if}
                    </td>
                </tr>
            {/foreach}
        </tbody>
    </table>
{/if}
```

## Группировка по категориям

```fenom
{* tpl.msProductOptions.grouped *}
{if $options?}
    {set $grouped = []}

    {* Группируем опции по категориям *}
    {foreach $options as $option}
        {set $cat = $option.category_name ?: 'Основные'}
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
                            {if $option.value is array}
                                {$option.value | join : ', '}
                            {else}
                                {$option.value}
                            {/if}
                        </td>
                    </tr>
                {/foreach}
            </table>
        </div>
    {/foreach}
{/if}
```

## Выбор опций при добавлении в корзину

Если опции можно выбирать (например, цвет и размер):

```fenom
<form class="product-form">
    {set $options = 'msProductOptions' | snippet : [
        'return' => 'data',
        'onlyOptions' => 'color,size'
    ]}

    {foreach $options as $key => $option}
        <div class="form-group">
            <label>{$option.caption}</label>
            <select name="options[{$key}]" required>
                <option value="">Выберите {$option.caption | lower}</option>
                {if $option.value is array}
                    {foreach $option.value as $val}
                        <option value="{$val}">{$val}</option>
                    {/foreach}
                {/if}
            </select>
        </div>
    {/foreach}

    <button type="button"
            data-ms-action="cart/add"
            data-id="{$_modx->resource.id}">
        В корзину
    </button>
</form>
```

## Когда использовать

| Подходит | Не подходит |
|----------|-------------|
| Нужны ВСЕ опции товара | Нужны только 2-3 конкретные опции |
| Требуются метаданные | Важна максимальная скорость |
| Нужна фильтрация по группам | Простой фиксированный список |
| Требуется гибкая сортировка | |
| Опции формируются динамически | |

Для простого вывода конкретных опций без метаданных используйте [msOptions](msoptions).
