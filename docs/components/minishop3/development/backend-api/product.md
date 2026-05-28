---
title: API товара
description: Программное создание, обновление товаров, работа с опциями, изображениями, категориями и связями
---

# API товара

Программный интерфейс для работы с товарами MiniShop3 из PHP-кода.

Товар в MiniShop3 состоит из двух моделей:

- **msProduct** — расширяет `modResource`, хранит стандартные поля ресурса (pagetitle, content, parent и др.)
- **msProductData** — расширяет `xPDOSimpleObject`, хранит торговые поля (price, article, stock и др.) в таблице `ms3_products`

Связь — один к одному по `id`.

## Вызов процессоров

Процессоры MiniShop3 — классы в namespace `MiniShop3\Processors\`. Их нужно вызывать **полным именем класса** (как параметр `action` в connector и vueManager), а не коротким путём вида `Gallery\Upload` с опцией `processors_path`.

```php
// Правильно — полное имя класса
$response = $modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', [
    'id' => $productId,
    'file' => '/path/to/image.jpg',
]);

// Неверно — короткий путь без namespace
$response = $modx->runProcessor('Gallery\\Upload', [...], [
    'processors_path' => $modx->getOption('core_path') . 'components/minishop3/src/Processors/',
]);
```

В таблицах ниже для краткости указан суффикс после `MiniShop3\Processors\` (например, `Product\Create` означает `MiniShop3\Processors\Product\Create`).

## Создание товара

### Через процессор

Рекомендуемый способ — процессор `MiniShop3\Processors\Product\Create`. Он создаёт и `msProduct`, и `msProductData`, устанавливает значения по умолчанию и вызывает системные события.

```php
$response = $modx->runProcessor('MiniShop3\\Processors\\Product\\Create', [
    'pagetitle' => 'Новый товар',
    'parent' => 5,          // ID категории (msCategory)
    'price' => 1500,
    'article' => 'ART-001',
    'published' => true,
    'stock' => 100,
    'weight' => 500,

    // Опции передаются с префиксом options-
    'options-color' => ['Red', 'Blue'],
    'options-size' => ['L', 'XL'],
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);

if ($response->isError()) {
    $modx->log(1, $response->getMessage());
} else {
    $productId = $response->getObject()['id'];
}
```

Процессор автоматически:

- Устанавливает `class_key = msProduct`, `show_in_tree`, `template` из системных настроек
- Создаёт связанный объект `msProductData`
- Если включена настройка `ms3_product_id_as_alias` — устанавливает alias равным ID товара
- Сохраняет опции (поля с префиксом `options-`)

### Через модель

Для простых случаев можно создать товар через xPDO API напрямую:

```php
use MiniShop3\Model\msProduct;

$product = $modx->newObject(msProduct::class);
$product->set('pagetitle', 'Новый товар');
$product->set('parent', 5);
$product->set('published', true);
$product->set('template', $modx->getOption('ms3_template_product_default'));

if ($product->save()) {
    // msProductData создаётся автоматически при сохранении msProduct
    $productData = $product->getOne('Data');
    $productData->set('price', 1500);
    $productData->set('article', 'ART-001');
    $productData->set('stock', 100);
    $productData->save();
}
```

::: warning Разница между подходами
Создание через модель не вызывает системные события (`OnBeforeDocFormSave`, `OnDocFormSave`), не устанавливает значения по умолчанию и не обновляет кеш ресурсов. Для полноценного создания товаров используйте процессор.
:::

## Получение и обновление

### Чтение данных товара

```php
use MiniShop3\Model\msProduct;
use MiniShop3\Model\msProductData;

// Через msProduct → связь Data
$product = $modx->getObject(msProduct::class, $productId);
$productData = $product->getOne('Data');
$price = $productData->get('price');
$article = $productData->get('article');

// Напрямую через msProductData
$productData = $modx->getObject(msProductData::class, $productId);
$price = $productData->get('price');
```

### Виртуальные поля msProductData

Метод `get()` у `msProductData` поддерживает виртуальные ключи, которые загружают связанные данные из БД:

| Ключ | Тип | Описание |
|------|-----|----------|
| `categories` | `array` | Массив ID дополнительных категорий |
| `options` | `array` | Опции: `['color' => ['Red'], 'size' => ['L']]` |
| `links` | `array` | Связи: `['master' => [...], 'slave' => [...]]` |

```php
$categories = $productData->get('categories');  // [5, 12, 18]
$options = $productData->get('options');          // ['color' => ['Red', 'Blue']]
$links = $productData->get('links');             // ['master' => [...], 'slave' => [...]]
```

### Обновление через процессор

```php
$response = $modx->runProcessor('MiniShop3\\Processors\\Product\\Update', [
    'id' => $productId,
    'price' => 2000,
    'old_price' => 2500,
    'popular' => true,
    'options-color' => ['Red', 'Green'],
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);
```

### Обновление через модель

```php
$productData = $modx->getObject(msProductData::class, $productId);
$productData->set('price', 2000);
$productData->set('old_price', 2500);
$productData->set('popular', true);
$productData->save();
```

### Обновление через сервис

`ProductDataService` предоставляет удобные методы для чтения и обновления:

```php
$service = $modx->services->get('ms3_product_data_service');

// Получение всех данных (msProduct + msProductData в одном массиве)
$data = $service->getProductData($productId);

// Обновление
$updated = $service->updateProductData($productId, [
    'price' => 2000,
    'old_price' => 2500,
]);
```

### Поля msProductData

| Поле | Тип в БД | PHP-тип | По умолчанию | Описание |
|------|----------|---------|--------------|----------|
| `article` | varchar(50) | string | null | Артикул |
| `price` | decimal(12,2) | float | 0.0 | Цена |
| `old_price` | decimal(12,2) | float | 0.0 | Старая цена |
| `stock` | decimal(13,3) | float | 0.0 | Остаток на складе |
| `weight` | decimal(13,3) | float | 0.0 | Вес |
| `image` | varchar(255) | string | null | Путь к главному изображению |
| `thumb` | varchar(255) | string | null | Путь к миниатюре |
| `vendor_id` | int unsigned | integer | 0 | ID производителя |
| `made_in` | varchar(100) | string | '' | Страна производства |
| `new` | tinyint(1) | boolean | false | Флаг «Новинка» |
| `popular` | tinyint(1) | boolean | false | Флаг «Популярный» |
| `favorite` | tinyint(1) | boolean | false | Флаг «Избранный» |
| `tags` | text | json | null | Теги (массив строк) |
| `color` | text | json | null | Цвета (массив строк) |
| `size` | text | json | null | Размеры (массив строк) |
| `source_id` | int unsigned | integer | 1 | ID медиа-источника |

::: info JSON-поля и опции
Поля `tags`, `color`, `size` хранятся в `msProductData` как JSON, но при сохранении автоматически дублируются в таблицу опций `ms3_product_options`. Это обеспечивает возможность фильтрации по этим полям через EAV-систему опций.
:::

### Модификация цены и веса через события

Методы `getPrice()` и `getWeight()` вызывают события, позволяющие плагинам модифицировать значения:

```php
// Получение цены с учётом плагинов
$price = $productData->getPrice();

// Получение веса с учётом плагинов
$weight = $productData->getWeight();

// Все поля с учётом плагинов
$fields = $productData->modifyFields();
```

Используемые события: `msOnGetProductPrice`, `msOnGetProductWeight`, `msOnGetProductFields`.

## Опции товара

Опции реализованы через EAV-паттерн (Entity-Attribute-Value) в таблице `ms3_product_options`. Каждая запись содержит `product_id`, `key` (имя опции) и `value` (значение).

### OptionService

Основной сервис для работы с опциями:

```php
$optionService = $modx->services->get('ms3_option_service');
```

### Сохранение опций

```php
$optionService->saveProductOptions($productId, [
    'color' => ['Red', 'Blue'],
    'size' => ['L', 'XL'],
    'material' => ['Cotton'],
]);

// По умолчанию removeOther=true — опции, не указанные в массиве, будут удалены.
// Чтобы добавить опции без удаления существующих:
$optionService->saveProductOptions($productId, [
    'brand' => ['Nike'],
], false);  // removeOther = false
```

### Чтение опций

```php
// Все опции товара
$options = $optionService->getProductOptionValues($productId);
// ['color' => ['Red', 'Blue'], 'size' => ['L', 'XL']]

// Определённые опции
$colors = $optionService->getProductOptionValues($productId, ['color']);
// ['color' => ['Red', 'Blue']]
```

### Загрузка опций для шаблона

Метод `loadOptionsForProduct` возвращает данные, подготовленные для Fenom-шаблонов:

```php
$options = $optionService->loadOptionsForProduct($productId);
// [
//     'color' => ['Red', 'Blue'],
//     'color.caption' => 'Цвет',
//     'color.type' => 'combo-multiple',
//     'size' => ['L', 'XL'],
//     'size.caption' => 'Размер',
//     'size.type' => 'combo-multiple',
// ]

// Пакетная загрузка (предотвращает N+1 запросов)
$allOptions = $optionService->loadOptionsForProducts([1, 2, 3]);
// [1 => [...], 2 => [...], 3 => [...]]
```

### Доступные ключи опций

```php
// Какие опции доступны для товара (на основе категорий)
$keys = $optionService->getAvailableOptionKeys($productId);
// ['color', 'size', 'material']
```

::: warning Не используйте модель msProductOption напрямую
Для работы с опциями всегда используйте `OptionService`. Прямое создание и сохранение объектов `msProductOption` обходит логику синхронизации с JSON-полями и категориями.
:::

## Изображения (галерея)

Изображения товара хранятся как объекты `msProductFile` в таблице `ms3_product_files`. Файлы загружаются в медиа-источник, настроенный для товара.

### Загрузка через процессор

Основной способ загрузки — процессор `MiniShop3\Processors\Gallery\Upload`:

```php
// Загрузка из URL
$response = $modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', [
    'id' => $productId,
    'file' => 'https://example.com/image.jpg',
    'description' => 'Фото товара',
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);

// Загрузка из локального файла
$response = $modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', [
    'id' => $productId,
    'file' => '/path/to/image.jpg',
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);
```

Для загрузки из `$_FILES` (multipart/form-data) файл передаётся штатным механизмом PHP — процессор автоматически его обнаружит.

Процессор автоматически:

- Проверяет расширение файла по списку разрешённых в медиа-источнике
- Вычисляет хеш для предотвращения дубликатов
- Генерирует миниатюры
- Обновляет поля `image` и `thumb` в `msProductData` (если загруженное изображение первое)

### ProductImageService

Сервис для программной работы с изображениями:

```php
$imageService = $modx->services->get('ms3_product_image');

// Обновить главное изображение товара (из первого файла галереи)
$imageService->updateProductImage($productData);

// Сгенерировать миниатюры для всех изображений
$imageService->generateAllThumbnails($productData);

// Изменить порядок изображений
$imageService->rankProductImages($productData, [
    $fileId1 => 0,  // первое
    $fileId2 => 1,  // второе
    $fileId3 => 2,  // третье
]);

// Удалить папку товара из медиа-источника
$imageService->removeProductCatalog($productData);
```

### Процессоры галереи

| Процессор | Описание |
|-----------|----------|
| `MiniShop3\Processors\Gallery\Upload` | Загрузка изображения (файл, URL, путь) |
| `MiniShop3\Processors\Gallery\GetList` | Список изображений товара |
| `MiniShop3\Processors\Gallery\Update` | Обновление описания изображения |
| `MiniShop3\Processors\Gallery\Remove` | Удаление одного изображения |
| `MiniShop3\Processors\Gallery\RemoveAll` | Удаление всех изображений товара |
| `MiniShop3\Processors\Gallery\Sort` | Сортировка изображений |
| `MiniShop3\Processors\Gallery\Multiple` | Массовые операции (удаление нескольких) |
| `MiniShop3\Processors\Gallery\Generate` | Генерация миниатюр для одного изображения |
| `MiniShop3\Processors\Gallery\GenerateAll` | Генерация миниатюр для всех изображений товара |

## Дополнительные категории

Товар может принадлежать нескольким категориям. Основная категория — поле `parent` в `msProduct`. Дополнительные хранятся в таблице `ms3_product_categories` через модель `msCategoryMember`.

### Программное управление

```php
use MiniShop3\Model\msCategoryMember;

// Добавить товар в дополнительную категорию
$member = $modx->newObject(msCategoryMember::class);
$member->set('product_id', $productId);
$member->set('category_id', $categoryId);
$member->save();

// Получить дополнительные категории товара
$categories = $modx->getIterator(msCategoryMember::class, [
    'product_id' => $productId,
]);
foreach ($categories as $member) {
    echo $member->get('category_id');
}

// Удалить из дополнительной категории
$member = $modx->getObject(msCategoryMember::class, [
    'product_id' => $productId,
    'category_id' => $categoryId,
]);
if ($member) {
    $member->remove();
}
```

### Через msProductData

При сохранении `msProductData` можно передать массив категорий — сервис автоматически синхронизирует таблицу:

```php
$productData = $modx->getObject(msProductData::class, $productId);

// Метод fromArray + save заменит все дополнительные категории
$productData->fromArray(['categories' => [5, 12, 18]]);
$productData->save();
// В save() вызывается saveCategories(), который удалит старые и создаст новые записи
```

::: info Составной первичный ключ
`msCategoryMember` использует составной PK из `product_id` + `category_id`. Для получения объекта передавайте оба поля в критерии.
:::

## Связи товаров

Связи позволяют объединять товары (например, «Похожие», «С этим покупают»). Используются две модели:

- **msLink** — тип связи (id, type, name)
- **msProductLink** — конкретная связь между товарами (link, master, slave)

### Типы связей (msLink)

```php
use MiniShop3\Model\msLink;

// Получить все типы связей
$links = $modx->getIterator(msLink::class);
foreach ($links as $link) {
    echo $link->get('name');  // "Похожие товары"
    echo $link->get('type');  // "similar"
}
```

Типы связей управляются через процессоры `MiniShop3\Processors\Settings\Link\*` или интерфейс администратора.

### Программное управление связями

```php
use MiniShop3\Model\msProductLink;

// Создать связь между товарами
$productLink = $modx->newObject(msProductLink::class);
$productLink->set('link', $linkTypeId);   // ID типа связи (msLink)
$productLink->set('master', $productId);  // ID основного товара
$productLink->set('slave', $relatedId);   // ID связанного товара
$productLink->save();

// Получить связанные товары
$related = $modx->getIterator(msProductLink::class, [
    'master' => $productId,
    'link' => $linkTypeId,
]);
foreach ($related as $rel) {
    echo $rel->get('slave');  // ID связанного товара
}

// Удалить связь
$link = $modx->getObject(msProductLink::class, [
    'link' => $linkTypeId,
    'master' => $productId,
    'slave' => $relatedId,
]);
if ($link) {
    $link->remove();
}
```

### Через процессоры

```php
// Создание связи
$response = $modx->runProcessor('MiniShop3\\Processors\\Product\\ProductLink\\Create', [
    'link' => $linkTypeId,
    'master' => $productId,
    'slave' => $relatedId,
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);

// Удаление связи
$response = $modx->runProcessor('MiniShop3\\Processors\\Product\\ProductLink\\Remove', [
    'link' => $linkTypeId,
    'master' => $productId,
    'slave' => $relatedId,
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);
```

::: info Составной первичный ключ
`msProductLink` использует составной PK из `link` + `master` + `slave`. Для получения или удаления объекта передавайте все три поля.
:::

### Через msProductData

Связи также доступны через виртуальное поле `links`:

```php
$links = $productData->get('links');
// [
//     'master' => [linkTypeId => [slaveId1, slaveId2, ...]],
//     'slave' => [linkTypeId => [masterId1, ...]],
// ]
```

## Производители

Производители хранятся в модели `msVendor` (таблица `ms3_vendors`). Привязка к товару — через поле `vendor_id` в `msProductData`.

### Поля msVendor

| Поле | Тип | Описание |
|------|-----|----------|
| `name` | varchar(100) | Название |
| `resource_id` | int | ID связанного ресурса (страница производителя) |
| `country` | varchar(100) | Страна |
| `logo` | varchar(255) | Путь к логотипу |
| `address` | text | Адрес |
| `phone` | varchar(20) | Телефон |
| `email` | varchar(255) | Email |
| `description` | text | Описание |
| `position` | int | Позиция сортировки |
| `properties` | json | Дополнительные свойства |

### Привязка производителя к товару

```php
use MiniShop3\Model\msVendor;
use MiniShop3\Model\msProductData;

// Создать производителя
$vendor = $modx->newObject(msVendor::class);
$vendor->set('name', 'Samsung');
$vendor->set('country', 'Южная Корея');
$vendor->save();

// Привязать к товару
$productData = $modx->getObject(msProductData::class, $productId);
$productData->set('vendor_id', $vendor->get('id'));
$productData->save();

// Получить производителя товара
$vendor = $productData->getOne('Vendor');
echo $vendor->get('name');  // "Samsung"
```

### Процессоры производителей

Управление производителями через процессоры `MiniShop3\Processors\Settings\Vendor\*`:

| Процессор | Описание |
|-----------|----------|
| `MiniShop3\Processors\Settings\Vendor\Create` | Создание |
| `MiniShop3\Processors\Settings\Vendor\Get` | Получение |
| `MiniShop3\Processors\Settings\Vendor\GetList` | Список |
| `MiniShop3\Processors\Settings\Vendor\Update` | Обновление |
| `MiniShop3\Processors\Settings\Vendor\Remove` | Удаление |
| `MiniShop3\Processors\Settings\Vendor\Multiple` | Массовые операции |

## Процессоры товара

Полный список процессоров для работы с товарами (каталог `core/components/minishop3/src/Processors/Product/`):

| Процессор | Описание |
|-----------|----------|
| `MiniShop3\Processors\Product\Create` | Создание товара |
| `MiniShop3\Processors\Product\Update` | Обновление товара |
| `MiniShop3\Processors\Product\UpdateFromGrid` | Обновление из таблицы (inline-редактирование) |
| `MiniShop3\Processors\Product\Delete` | Пометка на удаление |
| `MiniShop3\Processors\Product\Undelete` | Снятие пометки удаления |
| `MiniShop3\Processors\Product\Get` | Получение товара |
| `MiniShop3\Processors\Product\GetList` | Список товаров |
| `MiniShop3\Processors\Product\GetOptions` | Получение опций товара |
| `MiniShop3\Processors\Product\Publish` | Публикация |
| `MiniShop3\Processors\Product\Unpublish` | Снятие с публикации |
| `MiniShop3\Processors\Product\Show` | Показать в дереве |
| `MiniShop3\Processors\Product\Hide` | Скрыть из дерева |
| `MiniShop3\Processors\Product\Sort` | Сортировка |
| `MiniShop3\Processors\Product\Multiple` | Массовые операции |
| `MiniShop3\Processors\Product\Autocomplete` | Автодополнение (поиск товаров) |
| `MiniShop3\Processors\Product\Category` | Работа с категориями товара |
| `MiniShop3\Processors\Product\UpdateSource` | Смена медиа-источника товара |

### Пример вызова из PHP

```php
$response = $modx->runProcessor('MiniShop3\\Processors\\Product\\GetList', [
    'parent' => 5,
    'limit' => 20,
    'sort' => 'price',
    'dir' => 'ASC',
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);

if (!$response->isError()) {
    $products = json_decode($response->getResponse(), true);
}
```
