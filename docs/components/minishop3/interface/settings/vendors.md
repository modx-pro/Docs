---
title: Производители
---
# Производители

Управление производителями (брендами) доступно через **Extras → MiniShop3 → Настройки → Производители**.

## Назначение

Справочник производителей позволяет:

- Связывать товары с брендами
- Отображать информацию о производителе на странице товара
- Фильтровать каталог по производителям
- Создавать страницы брендов

## Поля производителя

| Поле | Тип | Описание |
|------|-----|----------|
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

Поле `resource_id` позволяет связать производителя с ресурсом MODX. Это полезно для:

- Создания SEO-страниц брендов
- Вывода каталога товаров конкретного производителя
- Добавления детальной информации о бренде

При указании `resource_id` в сниппетах можно получить URL страницы производителя.

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

Для вывода списка производителей используйте прямой запрос или кастомный сниппет:

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

## Дополнительные свойства

Поле `properties` позволяет хранить произвольные данные в JSON формате:

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

При импорте товаров из CSV производители создаются автоматически, если указан столбец `vendor`. Система ищет существующего производителя по имени и создаёт нового при отсутствии.
