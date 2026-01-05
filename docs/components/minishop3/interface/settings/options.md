---
title: Опции товаров
---
# Опции товаров

Управление опциями доступно через **Extras → MiniShop3 → Настройки → Опции**.

## Назначение

Опции — это система дополнительных характеристик товаров (EAV — Entity-Attribute-Value). Позволяют добавлять произвольные свойства без изменения структуры БД:

- Цвет, размер, материал
- Технические характеристики
- Комплектация
- Любые кастомные свойства

## Поля опции

| Поле | Тип | Описание |
|------|-----|----------|
| `key` | string | Уникальный ключ опции (латиница) |
| `caption` | string | Название для отображения |
| `description` | text | Описание опции |
| `measure_unit` | string | Единица измерения (шт, кг, см) |
| `type` | string | Тип значения |
| `properties` | JSON | Дополнительные настройки |

## Типы опций

| type | Описание | Пример значения |
|------|----------|-----------------|
| `textfield` | Текстовое поле | "Красный" |
| `textarea` | Многострочный текст | Длинное описание |
| `number` | Числовое значение | 42 |
| `combo` | Выпадающий список | Выбор из вариантов |
| `checkbox` | Флажок | true/false |

## Привязка к категориям

Опции привязываются к категориям товаров. Это позволяет:

- Показывать только релевантные опции для товаров категории
- Организовать опции по группам
- Переиспользовать опции в разных категориях

### Через интерфейс

1. Откройте опцию для редактирования
2. В списке категорий отметьте нужные
3. Сохраните изменения

### Через PHP

```php
// Привязка опции к категориям
$option = $modx->getObject(\MiniShop3\Model\msOption::class, ['key' => 'color']);
$option->setCategories([5, 10, 15]); // ID категорий
```

## Значения опций товара

### Добавление значения

```php
// Добавление значения опции товару
$optionValue = $modx->newObject(\MiniShop3\Model\msProductOption::class);
$optionValue->fromArray([
    'product_id' => 123,
    'key' => 'color',
    'value' => 'Красный',
]);
$optionValue->save();
```

### Получение значений

```php
// Получить все опции товара
$options = $modx->getCollection(\MiniShop3\Model\msProductOption::class, [
    'product_id' => 123
]);

foreach ($options as $option) {
    echo $option->get('key') . ': ' . $option->get('value');
}
```

## Вывод опций

### Сниппет msOptions

Выводит список опций для фильтрации:

```fenom
{'msOptions' | snippet : [
    'tpl' => 'tpl.msOptions.row',
    'parents' => 5
]}
```

### Сниппет msProductOptions

Выводит опции конкретного товара:

```fenom
{'msProductOptions' | snippet : [
    'product' => $id,
    'tpl' => 'tpl.msProductOptions.row'
]}
```

### В карточке товара

```fenom
{* Вывод опций товара в msProducts *}
{if $options?}
<div class="product-options">
    {foreach $options as $key => $value}
    <div class="option">
        <span class="option-name">{$key}:</span>
        <span class="option-value">{$value}</span>
    </div>
    {/foreach}
</div>
{/if}
```

## Опции с выбором (combo)

Для опций типа `combo` настройте варианты в поле `properties`:

```json
{
  "values": [
    {"value": "S", "label": "Маленький"},
    {"value": "M", "label": "Средний"},
    {"value": "L", "label": "Большой"},
    {"value": "XL", "label": "Очень большой"}
  ]
}
```

### Вывод выбора размера

```fenom
{var $sizes = ['S', 'M', 'L', 'XL']}
<div class="size-selector">
    {foreach $sizes as $size}
        <label class="size-option">
            <input type="radio" name="options[size]" value="{$size}">
            <span>{$size}</span>
        </label>
    {/foreach}
</div>
```

## Опции в корзине

При добавлении товара в корзину можно передать выбранные опции:

### JavaScript (Web API)

```javascript
// Добавление товара с опциями
fetch('/assets/components/minishop3/api.php?route=/api/v1/cart/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'MS3TOKEN': token
    },
    body: JSON.stringify({
        id: 123,
        count: 1,
        options: {
            color: 'Красный',
            size: 'L'
        }
    })
});
```

### Отображение в корзине

Опции сохраняются в позиции корзины и отображаются в чанке:

```fenom
{* tpl.msCart.row *}
<tr>
    <td>{$pagetitle}</td>
    <td>
        {if $options?}
            {foreach $options as $key => $value}
                <small>{$key}: {$value}</small>
            {/foreach}
        {/if}
    </td>
    <td>{$count}</td>
    <td>{$price}</td>
</tr>
```

## Фильтрация по опциям

### Сниппет msProducts с фильтром

```fenom
{'msProducts' | snippet : [
    'parents' => 5,
    'options' => 'color==Красный,size==L',
    'tpl' => 'tpl.msProducts.row'
]}
```

### Динамическая фильтрация

Используйте GET параметры:

```
/catalog/?color=Красный&size=L
```

```fenom
{var $filters = []}
{if $_GET.color?}
    {$filters[] = 'color==' ~ $_GET.color}
{/if}
{if $_GET.size?}
    {$filters[] = 'size==' ~ $_GET.size}
{/if}

{'msProducts' | snippet : [
    'parents' => 5,
    'options' => $filters | join : ',',
    'tpl' => 'tpl.msProducts.row'
]}
```

## Индексация опций

Для быстрой фильтрации опции индексируются в отдельной таблице. При изменении значений опций товара индекс обновляется автоматически.

### Принудительное переиндексирование

```php
// Переиндексировать опции товара
$product = $modx->getObject(\MiniShop3\Model\msProduct::class, 123);
$optionService = $modx->services->get('ms3_option_service');
$optionService->reindexProduct($product);
```

## Импорт опций

При импорте товаров из CSV опции создаются автоматически из столбцов с префиксом `option_`:

| pagetitle | price | option_color | option_size |
|-----------|-------|--------------|-------------|
| Футболка  | 1500  | Красный      | L           |
| Футболка  | 1500  | Синий        | M           |

Опции `color` и `size` будут созданы автоматически, если не существуют.
