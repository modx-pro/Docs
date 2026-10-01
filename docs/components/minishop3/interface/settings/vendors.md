---
title: Производители
---
# Производители

Откройте **Extras → MiniShop3 → Настройки → Производители**.

::: warning События msOnVendor*
CRUD в этом разделе идёт через Manager API (`VendorsController`), **без** вызова процессоров `Processors/Settings/Vendor/*`. Плагины на `msOnBeforeVendorCreate` и аналоги срабатывают только при legacy `runProcessor()`. Подробнее: [События производителей](/components/minishop3/development/events/vendor).
:::

## Назначение

В справочнике вы:

- связываете товары с брендами
- выводите данные производителя на странице товара
- фильтруете каталог по производителям
- делаете страницы брендов

## Поля производителя

| Поле | Тип | Описание |
| --- | --- | --- |
| `name` | string | Название производителя |
| `resource_id` | int | ID ресурса — страницы производителя |
| `country` | string | Страна производителя |
| `logo` | string | Путь к логотипу |
| `address` | string | Адрес |
| `phone` | string | Телефон |
| `email` | string | Email |
| `description` | text | Описание |
| `position` | int | Порядок сортировки |
| `properties` | JSON | Дополнительные свойства |

## Связь с ресурсом

Поле `resource_id` связывает производителя с ресурсом MODX:

- SEO-страницы брендов
- Каталог товаров этого производителя
- Подробный текст о бренде

Если `resource_id` задан, в сниппетах можно взять URL страницы производителя.

## Использование

### Назначение производителя товару

Производитель указывается в карточке товара в поле **Производитель**. Товар может иметь только одного производителя.

### Вывод в сниппетах

В сниппете `msProducts` доступны плейсхолдеры производителя:

```fenom
{if $vendor_name?}
<div class="product-vendor">
    {if $vendor_logo?}
        <img src="{$vendor_logo}" alt="{$vendor_name}">
    {/if}
    <span>{$vendor_name}</span>
    {if $vendor_country?}
        <span class="country">({$vendor_country})</span>
    {/if}
</div>
{/if}
```

### Фильтрация по производителю

```fenom
{$_modx->runSnippet('msProducts', [
    'parents' => 0,
    'vendors' => '1,2,3',  // ID производителей
    'tpl' => 'tpl.msProducts.row'
])}
```

### Список производителей

Список производителей — прямой запрос или свой сниппет:

```php
<?php
// Сниппет msVendors
$vendors = $modx->getCollection(\MiniShop3\Model\msVendor::class, [
    'position:>' => 0
]);

$output = '';
foreach ($vendors as $vendor) {
    $output .= $modx->getChunk('tpl.msVendor.row', $vendor->toArray());
}

return $output;
```

## Свои поля (Extra Fields) {#extra-fields}

::: info Начиная с v1.9.0
Производители поддерживают пользовательские поля, созданные через **Утилиты → Свои поля**.
:::

Для добавления своего поля к производителям:

1. Перейдите в **Extras → MiniShop3 → Утилиты → Свои поля**
2. В выпадающем списке выберите модель **msVendor**
3. Нажмите **Создать поле** и укажите ключ, тип (`textfield`, `numberfield`, `checkbox`, `textarea` и др.)

Поле появится в форме редактирования производителя. Поддерживаются все 13+ типов полей `DynamicField`, включая:

- `textfield` — текстовое поле
- `numberfield` — числовое поле
- `textarea` — многострочный текст
- `checkbox` — флажок
- `file` / `image` — выбор файла через FileBrowser
- `combobox` — выпадающий список

Значения extra fields сохраняются и отдаются через API вместе со стандартными полями производителя.

## Дополнительные свойства

Поле `properties` хранит произвольные данные в JSON:

```json
{
  "website": "https://vendor-site.com",
  "founded": 1985,
  "slogan": "Quality first",
  "social": {
    "facebook": "https://facebook.com/vendor",
    "instagram": "https://instagram.com/vendor"
  }
}
```

Доступ в чанке:

```fenom
{if $properties.website?}
    <a href="{$properties.website}" target="_blank">Сайт производителя</a>
{/if}
```

## Импорт производителей

При импорте товаров из CSV производители создаются сами, если указан столбец `vendor`. Система ищет производителя по имени и создаёт нового, если не находит.
