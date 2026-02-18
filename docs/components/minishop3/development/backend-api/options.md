---
title: API опций
description: Программная работа с опциями товаров — создание, назначение категориям, чтение и запись значений
---

# API опций

Программный интерфейс для работы с системой опций MiniShop3 из PHP-кода.

Опции в MiniShop3 реализованы через EAV-паттерн (Entity-Attribute-Value) и состоят из трёх моделей:

- **msOption** — определение опции (ключ, название, тип)
- **msCategoryOption** — привязка опции к категории (активность, обязательность, позиция)
- **msProductOption** — значение опции для конкретного товара

```
msOption (color, "Цвет", combo-multiple)
    ├── msCategoryOption (option → категория "Одежда", active=true)
    │       ├── msProductOption (product=10, key=color, value="Red")
    │       ├── msProductOption (product=10, key=color, value="Blue")
    │       └── msProductOption (product=11, key=color, value="Green")
    └── msCategoryOption (option → категория "Обувь", active=true)
            └── msProductOption (product=20, key=color, value="Black")
```

## OptionService (фасад)

Основной сервис для работы с опциями. Объединяет три специализированных суб-сервиса.

```php
$optionService = $modx->services->get('ms3_option_service');
```

### Чтение опций товара

```php
// Все значения опций товара
$values = $optionService->getProductOptionValues($productId);
// ['color' => ['Red', 'Blue'], 'size' => ['L', 'XL']]

// Определённые опции
$values = $optionService->getProductOptionValues($productId, ['color']);
// ['color' => ['Red', 'Blue']]
```

### Загрузка для шаблонов

Метод `loadOptionsForProduct` возвращает данные с метаинформацией, подготовленные для Fenom-шаблонов:

```php
$options = $optionService->loadOptionsForProduct($productId);
// [
//     'color' => ['Red', 'Blue'],
//     'color.caption' => 'Цвет',
//     'color.type' => 'combo-multiple',
//     'color.description' => 'Выберите цвет',
//     'color.category_name' => 'Свойства товара',
//     'size' => ['L', 'XL'],
//     'size.caption' => 'Размер',
//     ...
// ]

// Без метаданных (только ключи и значения)
$options = $optionService->loadOptionsForProduct($productId, false);
```

### Пакетная загрузка

Для каталога используйте пакетную загрузку — она предотвращает N+1 запросов:

```php
$allOptions = $optionService->loadOptionsForProducts([1, 2, 3, 4, 5]);
// [
//     1 => ['color' => ['Red'], 'size' => ['L']],
//     2 => ['color' => ['Blue', 'Green']],
//     ...
// ]
```

### Сохранение опций

```php
// Сохранить опции (по умолчанию removeOther=true — удалит не указанные)
$optionService->saveProductOptions($productId, [
    'color' => ['Red', 'Blue'],
    'size' => ['L', 'XL'],
    'material' => ['Cotton'],
]);

// Добавить опции без удаления существующих
$optionService->saveProductOptions($productId, [
    'brand' => ['Nike'],
], false);  // removeOther = false
```

При сохранении значения автоматически очищаются: убираются пробелы, дубликаты и пустые строки.

### Доступные ключи опций

```php
// Какие опции доступны для товара (на основе его категорий)
$keys = $optionService->getAvailableOptionKeys($productId);
// ['color', 'size', 'material']
```

### Назначение опций категориям

```php
// Назначить опцию нескольким категориям
$assigned = $optionService->assignOptionToCategories($optionId, [5, 12, 18]);
// [5, 12, 18] — массив ID категорий, куда опция была назначена

// Назначить с параметрами
$optionService->addOptionToCategory(
    $optionId,
    $categoryId,
    '',       // значение по умолчанию
    true,     // active
    0         // position
);

// Удалить опцию из категории
$optionService->removeOptionFromCategory($optionId, $categoryId);

// Принудительное удаление (удалит значения даже если опция активна в других категориях)
$optionService->removeOptionFromCategory($optionId, $categoryId, true);
```

::: info Автоназначение товарам
При назначении опции категории она автоматически добавляется ко всем товарам этой категории (включая товары в дополнительных категориях). При удалении — значения сохраняются, если опция активна в другой категории товара.
:::

### Доступ к суб-сервисам

Для специализированных задач доступны суб-сервисы напрямую:

```php
$loader = $optionService->getLoader();     // OptionLoaderService — чтение
$sync = $optionService->getSync();         // OptionSyncService — запись
$category = $optionService->getCategory(); // OptionCategoryService — категории
```

## Модель msOption

Определение опции хранится в таблице `ms3_options`.

### Поля msOption

| Поле | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `key` | varchar(191) | '' | Уникальный ключ (латиница, цифры, дефис, подчёркивание) |
| `caption` | varchar(191) | '' | Отображаемое название |
| `description` | text | null | Описание |
| `measure_unit` | tinytext | null | Единица измерения |
| `modcategory_id` | integer | 0 | ID категории MODX (для группировки в админке) |
| `type` | varchar(191) | '' | Тип опции (combo-multiple, textfield, numberfield и др.) |
| `properties` | json | null | Дополнительные свойства |

### Валидация ключа

Ключ опции должен:
- Содержать только латинские буквы, цифры, дефис, подчёркивание
- Не начинаться с цифры или пробела
- Не совпадать с зарезервированными именами полей (`id`, `type`, `price`, `weight`, `image`, `published` и другие поля `modResource`)

### Программная работа

```php
use MiniShop3\Model\msOption;

// Создать опцию
$option = $modx->newObject(msOption::class);
$option->set('key', 'material');
$option->set('caption', 'Материал');
$option->set('type', 'combo-multiple');
$option->save();

// Получить опцию
$option = $modx->getObject(msOption::class, ['key' => 'color']);

// Назначить категориям
$assigned = $option->setCategories([5, 12, 18]);

// Получить все опции
$options = $modx->getIterator(msOption::class);
```

## Модель msCategoryOption

Связь опции с категорией. Таблица `ms3_category_options`.

### Поля msCategoryOption

| Поле | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `option_id` | integer | 0 | ID опции (часть PK) |
| `category_id` | integer | 0 | ID категории (часть PK) |
| `position` | integer | 0 | Порядок сортировки |
| `active` | boolean | false | Активна ли опция в категории |
| `required` | boolean | false | Обязательна ли опция |
| `value` | text | null | Значение по умолчанию |

::: info Составной первичный ключ
`msCategoryOption` использует составной PK из `option_id` + `category_id`.
:::

### Каскадное поведение

При **сохранении** `msCategoryOption` опция автоматически добавляется ко всем товарам категории, у которых её ещё нет.

При **удалении** `msCategoryOption` значения `msProductOption` удаляются только у тех товаров, где опция не активна ни в одной другой категории. Это предотвращает потерю данных, когда товар принадлежит нескольким категориям с одной и той же опцией.

### Программная работа

```php
use MiniShop3\Model\msCategoryOption;

// Назначить опцию категории
$link = $modx->newObject(msCategoryOption::class);
$link->set('option_id', $optionId);
$link->set('category_id', $categoryId);
$link->set('active', true);
$link->set('position', 0);
$link->save();
// При save() опция автоматически добавится ко всем товарам категории

// Получить опции категории
$categoryOptions = $modx->getIterator(msCategoryOption::class, [
    'category_id' => $categoryId,
    'active' => true,
]);

// Деактивировать опцию в категории
$link = $modx->getObject(msCategoryOption::class, [
    'option_id' => $optionId,
    'category_id' => $categoryId,
]);
$link->set('active', false);
$link->save();

// Удалить опцию из категории (каскадно удалит значения у товаров)
$link->remove();
```

## Модель msProductOption

Значение опции для конкретного товара. Таблица `ms3_product_options`. Одна запись — одно значение. Для множественных опций (combo-multiple) создаётся несколько записей с одним `key`.

### Поля msProductOption

| Поле | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `product_id` | integer | null | ID товара |
| `key` | varchar(191) | null | Ключ опции |
| `value` | text | '' | Значение |

::: warning Используйте OptionService
Для работы с опциями товара всегда используйте `OptionService`. Прямое создание `msProductOption` обходит логику синхронизации с JSON-полями `msProductData` (`tags`, `color`, `size`) и не учитывает каскадную логику категорий.
:::

## CategoryOptionService

Отдельный сервис для работы с опциями на стороне категории. Используется в админке для построения списка опций категории.

```php
use MiniShop3\Model\msCategory;

$categoryOptionService = $modx->services->get('ms3_category_option_service');

// Получить ключи опций категории
$category = $modx->getObject(msCategory::class, $categoryId);
$keys = $categoryOptionService->getOptionKeys($category);
// ['color', 'size', 'material']

// Получить полные конфигурации полей
$fields = $categoryOptionService->getOptionFields($category);

// Очистить кеш опций
$categoryOptionService->clearCache($categoryId);
// Или весь кеш
$categoryOptionService->clearCache();
```

## Суб-сервисы OptionService

### OptionLoaderService

Отвечает за все операции чтения опций.

```php
$loader = $optionService->getLoader();

// Загрузить опции для одного товара (с метаданными)
$data = $loader->loadForProduct($productId, true);

// Загрузить опции для нескольких товаров (без метаданных)
$data = $loader->loadForProducts([1, 2, 3], false);

// Получить конфигурации полей для админки
$fields = $loader->getFieldsForProduct($productId, $parentId);

// Получить только ключи
$keys = $loader->getOptionKeys($productId, $parentId);
```

### OptionSyncService

Отвечает за запись и синхронизацию значений опций.

```php
$sync = $optionService->getSync();

// Сохранить опции
$sync->saveProductOptions($productId, [
    'color' => ['Red', 'Blue'],
], true);

// Прочитать текущие значения
$values = $sync->getForProduct($productId);

// Переименовать ключ опции во всех товарах
$sync->updateOptionKey('old_key', 'new_key');
```

::: warning Переименование ключа
`updateOptionKey()` выполняет массовый `UPDATE` всех записей `ms3_product_options`. Используйте только при переименовании опции в настройках.
:::

### OptionCategoryService

Управляет связями опций и категорий.

```php
$categoryService = $optionService->getCategory();

// Назначить опцию категориям
$assigned = $categoryService->assignToCategories($optionId, [5, 12]);

// Добавить с параметрами
$categoryService->addToCategory($optionId, $categoryId, '', true, 0);

// Удалить из категории
$categoryService->removeFromCategory($optionId, $categoryId);

// Получить товары в категории
$productIds = $categoryService->getProductsInCategory($categoryId);

// Найти товары, у которых уже есть опция
$withOption = $categoryService->getProductsWithOption($productIds, 'color');

// Массовая вставка опции для товаров
$categoryService->batchInsertOptions($productIds, 'color', 'Red');

// Массовое удаление из категорий
$categoryService->removeFromCategories($optionId, [5, 12, 18]);
```

## Процессоры

### Управление опциями (Settings\Option)

| Процессор | Описание |
|-----------|----------|
| `Settings\Option\Create` | Создание опции. Нормализует ключ, проверяет уникальность |
| `Settings\Option\Get` | Получение опции с привязанными категориями |
| `Settings\Option\GetList` | Список опций с фильтрацией по ключу, названию, категории |
| `Settings\Option\Update` | Обновление. Поддерживает переименование ключа и пересинхронизацию категорий |
| `Settings\Option\Remove` | Удаление (каскадно удаляет msCategoryOption и msProductOption) |
| `Settings\Option\Assign` | Назначение опции одной категории |
| `Settings\Option\Duplicate` | Дублирование опции с опциональным копированием категорий и значений |
| `Settings\Option\GetCategories` | Список MODX-категорий, в которых есть опции |
| `Settings\Option\GetTypes` | Список доступных типов опций |
| `Settings\Option\GetNodes` | Дерево категорий с отметками назначения |
| `Settings\Option\Multiple` | Массовые операции |

### Опции в категории (Category\Option)

| Процессор | Описание |
|-----------|----------|
| `Category\Option\Add` | Добавление опции в категорию |
| `Category\Option\GetList` | Список опций категории с данными из msOption |
| `Category\Option\Update` | Обновление параметров привязки (active, required, value) |
| `Category\Option\UpdateFromGrid` | Inline-обновление из грида |
| `Category\Option\Activate` | Активация опции в категории |
| `Category\Option\Deactivate` | Деактивация |
| `Category\Option\Required` | Пометить как обязательную |
| `Category\Option\Unrequired` | Снять обязательность |
| `Category\Option\Remove` | Удаление из категории (с умным каскадом) |
| `Category\Option\Duplicate` | Копирование опций из одной категории в другую |
| `Category\Option\Multiple` | Массовые операции |

### Автодополнение значений

| Процессор | Описание |
|-----------|----------|
| `Product\GetOptions` | Автодополнение значений для конкретного ключа опции в форме товара |
