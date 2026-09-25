# Свой тип фильтра

Свой тип нужен, когда отбор не сводится к значению одного поля. Встроенные типы сравнивают опцию, TV или поле ресурса с выбранным значением, а условие вроде «старая цена больше текущей» так не записать. Рецепт — фильтр «Со скидкой».

## Задача

Добавить в форму фильтр «Со скидкой»: товары, у которых старая цена больше текущей. С числом таких товаров, пересчётом после выбора других фильтров и SEO-адресом.

## Решение

### 1. Класс типа

Файл `core/components/mysite/SaleFilterType.php`:

```php
<?php

namespace MySite;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class SaleFilterType extends AbstractFilterType
{
    public function getType(): string
    {
        return 'sale';
    }

    // Отбор: старая цена больше текущей
    public function buildQuery($query, string $filterKey, array $values, array $config)
    {
        // Таблицу товаров могли уже присоединить другие фильтры
        $joined = &$config['_joinedTables'];
        if (!isset($joined['ms_data'])) {
            $query->innerJoin('MiniShop3\\Model\\msProductData', 'Data', 'Data.id = modResource.id');
            $joined['ms_data'] = true;
        }
        $query->where('Data.old_price > Data.price');

        return $query;
    }

    // Одно значение и число товаров со скидкой среди товаров раздела
    public function getValues(string $filterKey, array $config, array $context = []): array
    {
        $ids = $context['filtered_ids']
            ?? $context['resource_ids']
            ?? $this->getProductIdsByParents($context['parents'] ?? [], $context['secondary_ids'] ?? []);

        $count = 0;
        if ($ids) {
            $query = $this->modx->newQuery('MiniShop3\\Model\\msProductData');
            $query->where(['id:IN' => $ids]);
            $query->where('old_price > price');
            $count = $this->modx->getCount('MiniShop3\\Model\\msProductData', $query);
        }

        return [
            ['value' => 'со скидкой', 'label' => 'Со скидкой', 'count' => $count],
        ];
    }
}
```

### 2. Регистрация

Плагин на событие `OnMFilterInit`:

```php
require_once MODX_CORE_PATH . 'components/mysite/SaleFilterType.php';

$mfilter->getFilterTypesRegistry()->register('sale', new \MySite\SaleFilterType($modx, $mfilter));
```

Переменная `$mfilter` приходит в плагин вместе с событием.

### 3. Фильтр в наборе

В наборе фильтров добавьте строку: ключ `sale`, тип `sale`, название «Скидка». Источник этот тип не читает — оставьте `option`.

В форме появится флажок «Со скидкой» с числом товаров. Выбор даст адрес `/catalog/sale--so-skidkoj/`, а в SEO-заголовок страницы добавится «со скидкой».

## Почему так

### Что mFilter вызывает у типа

| Метод | Когда | Что возвращает |
|---|---|---|
| `getType()` | Всегда | Имя типа — то же, что при регистрации |
| `buildQuery()` | Фильтр выбран: после выбора в форме и при переходе по адресу с фильтром | Запрос с условием. `$query` — запрос к `modResource`, в `$values` — выбранные значения |
| `getValues()` | При загрузке страницы и при пересчёте после каждого запроса | Список значений с полями `value`, `label`, `count` |

Остальные методы интерфейса реализует `AbstractFilterType`. Переопределять `formatValue()`, `parseSegment()` и `buildSegment()` бесполезно: mFilter их не вызывает.

### Откуда брать товары для подсчёта {#context-products}

`getValues()` вызывается с разными товарами в `$context`:

| Ключ | Когда приходит |
|---|---|
| `filtered_ids` | Пересчёт после запроса — товары с учётом остальных выбранных фильтров |
| `resource_ids` | Товары страницы: их передаёт форма фильтров в любом режиме |
| `parents` | Разделы — когда списка товаров нет |

Порядок именно такой, и проще не проверять их по очереди вручную, а спросить базовый класс:

```php
$scopeIds = $this->scopeIds($context);   // список товаров или null
```

`null` означает «по списку не ограничиваем» — тогда берите `parents`. Пустой список означает обратное: товаров нет, и значений у фильтра быть не должно. Для SQL удобнее `scopeCondition($context, 'd.id')` — он вернёт готовое условие, `1 = 0` для пустого списка или `null`.

Если читать только `parents`, фильтр покажет значения всего каталога вместо раздела. Если не читать `filtered_ids`, число товаров не будет меняться после выбора других фильтров.

### Значение — текст, а не `1`

SEO-заголовок и блок «Выбрано» выводят значение фильтра как есть. Со значением `1` в заголовке и блоке «Выбрано» стояло бы «1». Текст «со скидкой» читается в заголовке и сам превращается в адрес `sale--so-skidkoj`.

### Проверка `_joinedTables`

Таблицу товаров под именем `Data` присоединяют и другие части mFilter — например, вывод товаров в режиме без `&element`, чтобы получить цену и артикул. Отметка `ms_data` показывает, что таблица уже присоединена. Без проверки в одном запросе окажутся две `Data`, и MySQL ответит ошибкой.

## Если не работает

| Симптом | Причина |
|---------|---------|
| Типа `sale` нет в списке типов набора | Плагин не привязан к событию `OnMFilterInit` или путь в `require_once` неверный |
| Блок фильтра есть, а флажка в нём нет | `getValues()` вернул `count` 0: например, читает только `parents`, а `mFilter` вызван с `&element` |
| Число товаров у флажка не меняется после выбора других фильтров | `getValues()` не читает `filtered_ids` |
| В заголовке страницы и блоке «Выбрано» стоит `1` | Значение фильтра — число, а не текст |
| Ошибка MySQL «Not unique table/alias» | Таблица товаров присоединена без проверки `_joinedTables` |
