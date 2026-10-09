---
title: API опций
description: Программная работа с опциями товаров — создание, назначение категориям, чтение и запись значений
---

# API опций

Опции в MiniShop3 устроены по схеме EAV (Entity-Attribute-Value) и состоят из трёх моделей:

- **msOption** — определение опции (ключ, название, тип)
- **msCategoryOption** — привязка опции к категории (активность, обязательность, позиция)
- **msProductOption** — значение опции для конкретного товара

```
msOption (color, "Цвет", comboMultiple)
    ├── msCategoryOption (option → категория "Одежда", active=true)
    │       ├── msProductOption (product=10, key=color, value="Red")
    │       ├── msProductOption (product=10, key=color, value="Blue")
    │       └── msProductOption (product=11, key=color, value="Green")
    └── msCategoryOption (option → категория "Обувь", active=true)
            └── msProductOption (product=20, key=color, value="Black")
```

## OptionService (фасад)

Основной сервис для работы с опциями. Объединяет три суб-сервиса.

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

`loadOptionsForProduct` отдаёт значения вместе с метаданными — для Fenom-шаблонов:

```php
$options = $optionService->loadOptionsForProduct($productId);
// [
//     'color' => ['Red', 'Blue'],
//     'color.caption' => 'Цвет',
//     'color.type' => 'comboMultiple',
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

Для каталога используйте пакетную загрузку — она избавляет от N+1 запросов:

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

При сохранении значения очищаются: обрезаются пробелы по краям, убираются дубликаты и пустые строки.

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

```php
$loader = $optionService->getLoader();     // OptionLoaderService — чтение
$sync = $optionService->getSync();         // OptionSyncService — запись
$category = $optionService->getCategory(); // OptionCategoryService — категории
```

## Модель msOption

Определение опции хранится в таблице `ms3_options`.

### Поля msOption

| Поле | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `key` | varchar(191) | '' | Уникальный ключ (латиница, цифры, дефис, подчёркивание) |
| `caption` | varchar(191) | '' | Отображаемое название |
| `description` | text | null | Описание |
| `measure_unit` | tinytext | null | Единица измерения |
| `option_group_id` | integer \| null | null | ID группы опций (`msOptionGroup`); `null` — опция без группы |
| `type` | varchar(191) | '' | Тип опции (comboMultiple, textfield, numberfield и др.) |
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
$option->set('type', 'comboMultiple');
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
| --- | --- | --- | --- |
| `option_id` | integer | 0 | ID опции (часть PK) |
| `category_id` | integer | 0 | ID категории (часть PK) |
| `position` | integer | 0 | Порядок сортировки |
| `active` | boolean | false | Активна ли опция в категории |
| `required` | boolean | false | Обязательна ли опция |
| `caption` | string \| null | null | Название опции в этой категории; `null` — берётся общее из `msOption` |
| `description` | string \| null | null | Описание опции в этой категории; `null` — берётся общее из `msOption` |
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

Значение опции для конкретного товара. Таблица `ms3_product_options`. Одна запись — одно значение. Для множественных опций (comboMultiple) создаётся несколько записей с одним `key`.

### Поля msProductOption

| Поле | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `product_id` | integer | null | ID товара |
| `key` | varchar(191) | null | Ключ опции |
| `value` | text | '' | Значение |

::: warning Используйте OptionService
Для работы с опциями товара всегда используйте `OptionService`. Прямое создание `msProductOption` обходит логику синхронизации с JSON-полями `msProductData` (`tags`, `color`, `size`) и не учитывает каскадную логику категорий.
:::

## CategoryOptionService

Работает с опциями на стороне категории: в админке на нём построен список опций категории.

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

Все операции чтения опций.

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

Запись и синхронизация значений опций.

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

Связи опций с категориями.

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

## REST API

::: info Начиная с v1.10.0-beta1
Прежние процессоры `Processors/Settings/Option/*` и `Processors/Category/Option/*` удалены вместе с интерфейсом на ExtJS — 22 файла, ~2600 строк. Все операции идут через два REST-контроллера: `OptionsController` и `CategoryOptionsController`.
:::

### Управление опциями — `/api/mgr/options/*`

Контроллер `MiniShop3\Controllers\Api\Manager\OptionsController`, право `mssetting_save`.

| Метод | Путь | Описание |
| --- | --- | --- |
| `GET` | `/api/mgr/options` | Список опций с фильтрами: `query`, `option_group_id`, `category_id`, `categories[]`. `option_group_id=0` отбирает опции без группы |
| `GET` | `/api/mgr/options/{id}` | Одна опция + карта привязанных категорий |
| `POST` | `/api/mgr/options` | Создать: нормализует `key`, проверяет уникальность, привязывает к категориям |
| `PUT` | `/api/mgr/options/{id}` | Частичное обновление; при смене `key` пересинхронизирует `msProductOption` через `OptionSyncService::updateOptionKey` |
| `DELETE` | `/api/mgr/options/{id}` | Удалить. Каскад: `msOption::remove` → `msCategoryOption` → `msProductOption` |
| `DELETE` | `/api/mgr/options/bulk` | Массовое удаление: `ids[]` |
| `POST` | `/api/mgr/options/bulk/assign` | Назначить `options[]` к `categories[]` |
| `GET` | `/api/mgr/options/types` | Список типов с локализованными названиями |
| `GET` | `/api/mgr/options/tree` | Дерево ресурсов для привязки опции к категориям товаров, ленивая загрузка по `parent`. С 1.11.0 `msCategory` — выбираемые узлы, `modResource`/`modDocument`/`modWebLink` с `isfolder=1` — навигационные; у каждого узла в ответе есть флаг `selectable: bool`. Флаг `checked` — у категорий, где опция уже назначена (если передан `option_id`) |
| `GET` | `/api/mgr/options/suggestions` | Уникальные значения `msProductOption.value` по `key` для автодополнения `comboOptions` на карточке товара |

> С 1.11.0 метод `GET /api/mgr/options/modcategories` удалён. Группировка опций идёт через `msOptionGroup` — см. «Группы опций» ниже.

### Группы опций — `/api/mgr/option-groups/*`

Контроллер `MiniShop3\Controllers\Api\Manager\OptionGroupsController`, право `mssetting_save`. Появились в 1.11.0 — заменяют группировку через `modCategory`.

| Метод | Путь | Описание |
| --- | --- | --- |
| `GET` | (корень) | Список групп. Параметры: `start`, `limit` (`0` = всё), `query` (поиск по `name` / `description`). У каждой группы в ответе есть `options_count` — число опций в ней |
| `GET` | `/{id}` | Одна группа + `options_count` |
| `POST` | (корень) | Создать группу: `name` (обязательное), `description`, `sort_order` |
| `PUT` | `/{id}` | Обновить: `name`, `description`, `sort_order` |
| `DELETE` | `/{id}` | Удалить группу. Опции в ней не удаляются — у них обнуляется `option_group_id` (попадают в «Без группы») |
| `PUT` | `/positions` | Сохранить новый порядок: либо `positions: { id: position, ... }`, либо `ids: [id, id, ...]` (упорядоченный список) |
| `DELETE` | `/bulk` | Массовое удаление: `ids[]`. Опции отвязываются (не удаляются), затем группы удаляются |

### Опции категории — `/api/mgr/categories/{category_id}/options/*`

Контроллер `MiniShop3\Controllers\Api\Manager\CategoryOptionsController`, право `mscategory_save`.

| Метод | Путь | Описание |
| --- | --- | --- |
| `GET` | (корень) | Опции, привязанные к категории. Каждая строка отдаёт итоговый `caption`, а рядом — `global_caption`/`global_description` и переопределения `category_caption`/`category_description` |
| `POST` | (корень) | Привязать опцию к категории: `option_id`, `value`, `active`, `required`, `caption`, `description` |
| `PUT` | `/{option_id}` | Частичное обновление связки: `value`, `active`, `required`, `position`, `caption`, `description` |
| `DELETE` | `/{option_id}` | Удалить связку. Значения у товаров удаляются только если опция не активна ни в одной другой категории товара |
| `POST` | `/sort` | Сохранить новый порядок (`option_ids[]`) |
| `POST` | `/bulk` | Массовые действия: `activate` / `deactivate` / `require` / `unrequire` / `remove` для `option_ids[]` |
| `POST` | `/duplicate` | Скопировать связки из `category_from`; уже существующие в текущей категории пропускаются |

### Schema API — `msOptionType::getSchema()`

::: info Начиная с v1.10.0-beta1
:::

Каждый класс типа в `Controllers/Options/Types/` отдаёт декларативное описание своего поля вместо JS-строки для ExtJS:

```php
abstract class msOptionType
{
    abstract public function getField($field);        // legacy — возвращает JS-строку для ExtJS
    public function getSchema(array $field): array;   // новое — массив для Vue renderer
}
```

`OptionLoaderService::getFieldsForProduct()` добавляет `schema` в каждую строку `option_fields` — рядом с прежним `ext_field`. Карточка товара на Vue читает `schema`; `ext_field` остаётся для обратной совместимости, но в ядре больше не используется.
