---
title: События производителей
---
# События производителей

События для отслеживания операций с производителями (брендами).

## msOnBeforeVendorCreate

Вызывается **перед** созданием производителя.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msVendor` | `msVendor` | Объект производителя |
| `mode` | `string` | Режим: `new` |

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
|----------|-----|----------|
| `msVendor` | `msVendor` | Созданный объект производителя |
| `mode` | `string` | Режим: `new` |

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
|----------|-----|----------|
| `msVendor` | `msVendor` | Объект производителя |
| `mode` | `string` | Режим: `upd` |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeVendorUpdate':
        $vendor = $scriptProperties['msVendor'];

        // Сохранить старые значения для логирования
        $modx->eventData['vendor_before'] = [
            'name' => $vendor->getPrevious('name'),
            'logo' => $vendor->getPrevious('logo'),
        ];
        break;
}
```

---

## msOnVendorUpdate

Вызывается **после** обновления производителя.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msVendor` | `msVendor` | Обновлённый объект производителя |
| `mode` | `string` | Режим: `upd` |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnVendorUpdate':
        $vendor = $scriptProperties['msVendor'];

        $before = $modx->eventData['vendor_before'] ?? [];

        if ($before['name'] !== $vendor->get('name')) {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Vendor] Переименован: %s → %s',
                $before['name'],
                $vendor->get('name')
            ));
        }
        break;
}
```

---

## msOnBeforeVendorDelete

Вызывается **перед** удалением производителя.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msVendor` | `msVendor` | Объект производителя для удаления |

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
|----------|-----|----------|
| `msVendor` | `msVendor` | Удалённый объект производителя |

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
