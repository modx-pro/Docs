---
title: События производителей
---
# События производителей

События для отслеживания операций с производителями (брендами).

::: warning Vue-настройки vs процессоры
CRUD производителей в админке (**Extras → MiniShop3 → Производители**) идёт через `VendorsController` (Manager API) **без** `$modx->invokeEvent`. События ниже срабатывают только при вызове legacy-процессоров `MiniShop3\Processors\Settings\Vendor\*` (`runProcessor`, старый connector). Для перехвата изменений из Vue используйте хуки после сохранения через собственный REST middleware или модификацию контроллера в дополнении.
:::

## msOnBeforeVendorCreate

Вызывается **перед** созданием производителя.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msVendor` | `msVendor` | Объект производителя |
| `object` | `msVendor` | Та же ссылка, что и `msVendor` (MS2-style алиас) |
| `mode` | `string` | Режим: `new` |
| `data` | `array` | Поля производителя на момент вызова (`$object->toArray()`) |
| `id` | `int` | ID производителя (`0` — ещё не создан) |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeVendorCreate':
        /** @var \MiniShop3\Model\msVendor $vendor */
        $vendor = $scriptProperties['msVendor'];

        // Проверка уникальности названия
        $existing = $modx->getObject(\MiniShop3\Model\msVendor::class, [
            'name' => $vendor->get('name'),
        ]);

        if ($existing) {
            $modx->event->output('Производитель с таким названием уже существует');
            return;
        }
        break;
}
```

---

## msOnVendorCreate

Вызывается **после** создания производителя.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msVendor` | `msVendor` | Созданный объект производителя |
| `object` | `msVendor` | Та же ссылка, что и `msVendor` (MS2-style алиас) |
| `mode` | `string` | Режим: `new` |
| `id` | `int` | ID созданного производителя |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnVendorCreate':
        $vendor = $scriptProperties['msVendor'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Vendor] Создан производитель: %s (ID: %d)',
            $vendor->get('name'),
            $vendor->get('id')
        ));

        // Создание страницы для производителя
        // $page = $modx->newObject('modResource', [...]);
        break;
}
```

---

## msOnBeforeVendorUpdate

Вызывается **перед** обновлением производителя.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msVendor` | `msVendor` | Объект производителя (поля уже несут НОВЫЕ значения — старый снимок недоступен) |
| `object` | `msVendor` | Та же ссылка, что и `msVendor` (MS2-style алиас) |
| `mode` | `string` | Режим: `upd` |
| `data` | `array` | Поля производителя на момент вызова — уже новые значения (`$object->toArray()`) |
| `id` | `int` | ID обновляемого производителя |

::: warning Старых значений полей нет
К моменту вызова этого события `msVendor` уже содержит новые значения (MODX применяет их до срабатывания `beforeSaveEvent`). Метода вроде `getPrevious()` у объекта не существует — если нужен снимок «до», получайте его заранее (например, в контроллере, до `runProcessor`).
:::

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeVendorUpdate':
        $vendor = $scriptProperties['msVendor'];

        // Запретить пустое название
        if (trim((string) $vendor->get('name')) === '') {
            $modx->event->output('Название производителя не может быть пустым');
            return;
        }
        break;
}
```

---

## msOnVendorUpdate

Вызывается **после** обновления производителя.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msVendor` | `msVendor` | Обновлённый объект производителя |
| `object` | `msVendor` | Та же ссылка, что и `msVendor` (MS2-style алиас) |
| `mode` | `string` | Режим: `upd` |
| `id` | `int` | ID обновлённого производителя |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnVendorUpdate':
        $vendor = $scriptProperties['msVendor'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Vendor] Обновлён производитель: %s (ID: %d)',
            $vendor->get('name'),
            $vendor->get('id')
        ));
        break;
}
```

---

## msOnBeforeVendorDelete

Вызывается **перед** удалением производителя.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msVendor` | `msVendor` | Объект производителя для удаления |
| `object` | `msVendor` | Та же ссылка, что и `msVendor` (MS2-style алиас) |
| `id` | `int` | ID удаляемого производителя |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeVendorDelete':
        $vendor = $scriptProperties['msVendor'];

        // Запретить удаление, если есть товары
        $productCount = $modx->getCount(\MiniShop3\Model\msProductData::class, [
            'vendor_id' => $vendor->get('id'),
        ]);

        if ($productCount > 0) {
            $modx->event->output(sprintf(
                'Нельзя удалить производителя: %d товаров привязано',
                $productCount
            ));
            return;
        }
        break;
}
```

---

## msOnVendorDelete

Вызывается **после** удаления производителя.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msVendor` | `msVendor` | Удалённый объект производителя |
| `object` | `msVendor` | Та же ссылка, что и `msVendor` (MS2-style алиас) |
| `id` | `int` | ID удалённого производителя |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnVendorDelete':
        $vendor = $scriptProperties['msVendor'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Vendor] Удалён производитель: %s (ID: %d)',
            $vendor->get('name'),
            $vendor->get('id')
        ));

        // Очистка кэша
        $modx->cacheManager->delete('vendors_list');
        break;
}
```

---

## Полный пример: синхронизация с каталогом

```php
<?php
/**
 * Плагин: Синхронизация производителей
 * События: msOnVendorCreate, msOnVendorUpdate, msOnVendorDelete
 */

switch ($modx->event->name) {

    case 'msOnVendorCreate':
        $vendor = $scriptProperties['msVendor'];

        // Создать страницу бренда в каталоге
        $brandsParent = $modx->getOption('brands_resource_id', null, 0);
        if ($brandsParent) {
            $page = $modx->newObject('modResource', [
                'pagetitle' => $vendor->get('name'),
                'alias' => $modx->filterPathSegment($vendor->get('name')),
                'parent' => $brandsParent,
                'template' => $modx->getOption('brands_template_id', null, 0),
                'published' => 1,
                'content' => $vendor->get('description'),
            ]);
            $page->setTVValue('vendor_id', $vendor->get('id'));
            $page->save();

            // Сохранить связь
            $vendor->set('resource_id', $page->get('id'));
            $vendor->save();
        }
        break;

    case 'msOnVendorUpdate':
        $vendor = $scriptProperties['msVendor'];

        // Обновить страницу бренда
        $resourceId = $vendor->get('resource_id');
        if ($resourceId) {
            $page = $modx->getObject('modResource', $resourceId);
            if ($page) {
                $page->set('pagetitle', $vendor->get('name'));
                $page->set('content', $vendor->get('description'));
                $page->save();
            }
        }
        break;

    case 'msOnVendorDelete':
        $vendor = $scriptProperties['msVendor'];

        // Удалить страницу бренда
        $resourceId = $vendor->get('resource_id');
        if ($resourceId) {
            $page = $modx->getObject('modResource', $resourceId);
            if ($page) {
                $page->remove();
            }
        }
        break;
}
```
