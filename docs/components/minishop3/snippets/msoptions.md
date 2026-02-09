---
title: msOptions
---
# msOptions

Простой сниппет для вывода конкретных опций товара. Когда заранее известно, какие опции нужны — используйте этот сниппет для максимальной производительности.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **product** | текущий ресурс | ID товара |
| **options** | | Список опций через запятую |
| **tpl** | `tpl.msOptions` | Чанк оформления |
| **sortOptionValues** | | Сортировка значений опций (см. ниже) |

### Deprecated параметры

::: warning Обратная совместимость
Следующие параметры устарели и будут удалены в будущих версиях:

- `&input` → используйте `&product`
- `&name` → используйте `&options`
:::

## Примеры

### Вывод цвета и размера текущего товара

```fenom
{'msOptions' | snippet : [
    'options' => 'color,size'
]}
```

### Для конкретного товара

```fenom
{'msOptions' | snippet : [
    'product' => 123,
    'options' => 'color,size,material'
]}
```

### Некэшируемый вызов

```fenom
{'!msOptions' | snippet : [
    'options' => 'color,size'
]}
```

### С кастомным чанком

```fenom
{'msOptions' | snippet : [
    'options' => 'color,size',
    'tpl' => 'myOptionsChunk'
]}
```

### С сортировкой значений

```fenom
{'msOptions' | snippet : [
    'options' => 'color,size',
    'sortOptionValues' => 'size:SORT_ASC:SORT_STRING:M'
]}
```

## Сортировка значений опций

Параметр `sortOptionValues` позволяет сортировать значения внутри каждой опции.

### Формат

```
имя_опции:направление:тип:первое_значение
```

| Часть | Описание | Возможные значения |
|-------|----------|-------------------|
| имя_опции | Ключ опции для сортировки | `color`, `size` и т.д. |
| направление | Направление сортировки | `SORT_ASC`, `SORT_DESC` |
| тип | Тип сортировки | `SORT_STRING`, `SORT_NUMERIC`, `SORT_NATURAL` |
| первое_значение | Значение, которое поставить первым (опционально) | Любое значение из списка |

### Примеры сортировки

```fenom
{* Размеры по алфавиту *}
'sortOptionValues' => 'size:SORT_ASC:SORT_STRING'

{* Размеры по алфавиту, но M первым *}
'sortOptionValues' => 'size:SORT_ASC:SORT_STRING:M'

{* Несколько опций *}
'sortOptionValues' => 'size:SORT_ASC:SORT_STRING, color:SORT_DESC:SORT_STRING'
```

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `{$id}` | ID товара |
| `{$options}` | Массив опций с их значениями |

## Структура данных

Возвращает массив значений опций **без метаданных**:

```php
[
    'color' => ['Красный', 'Синий'],
    'size' => ['S', 'M', 'L']
]
```

## Чанк по умолчанию

Стандартный чанк `tpl.msOptions` выводит опции как select-элементы:

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

Пример простого вывода списком:

```fenom
{* tpl.myOptions *}
{if $options?}
    <div class="product-options">
        {foreach $options as $key => $values}
            <div class="option">
                <strong>{$key}:</strong>
                {if $values is iterable}
                    {$values | join : ', '}
                {else}
                    {$values}
                {/if}
            </div>
        {/foreach}
    </div>
{/if}
```

## Когда использовать

| Подходит | Не подходит |
|----------|-------------|
| Нужны только конкретные опции | Нужны ВСЕ опции товара |
| Не требуются метаданные | Требуется фильтрация по группам |
| Нужна максимальная производительность | Нужны названия, категории опций |

## Сравнение с msProductOptions

| Критерий | msOptions | msProductOptions |
|----------|-----------|------------------|
| **Скорость** | Быстрее | Медленнее |
| **Фильтрация** | Только список опций | Группы, опции, сортировка |
| **Метаданные** | Нет | Полные (category, type) |
| **Гибкость** | Простой | Продвинутый |
| **Use case** | Фиксированный список | Динамический список |

Если нужны метаданные опций (категории, типы, описания) — используйте [msProductOptions](msproductoptions).
