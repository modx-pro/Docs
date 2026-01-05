---
title: Категория
---
# Страница категории

Редактирование категории товаров в административной панели MiniShop3.

## Обзор

Страница редактирования категории (`msCategory`) расширяет стандартный функционал MODX возможностями управления товарами:

- Таблица товаров категории с drag-and-drop сортировкой
- Фильтрация и поиск товаров
- Массовые операции (публикация, удаление)
- Настраиваемые колонки и действия
- Управление опциями категории

## Структура вкладок

### Товары

Главная вкладка категории — таблица товаров с возможностями:

| Функция | Описание |
|---------|----------|
| Drag-and-drop | Сортировка товаров перетаскиванием |
| Фильтры | Поиск, публикация, кастомные фильтры |
| Массовые операции | Публикация, снятие с публикации, удаление |
| Настраиваемые колонки | Через [Утилиты → Колонки гридов](utilities/grid-columns) |
| Действия | Просмотр, редактирование, удаление, дублирование |

### Документ

Стандартная вкладка MODX с полями ресурса:

| Поле | Описание |
|------|----------|
| `pagetitle` | Название категории |
| `longtitle` | Расширенный заголовок |
| `description` | Meta description |
| `introtext` | Краткое описание |
| `content` | Полное описание |
| `alias` | URL-псевдоним |
| `parent` | Родительская категория |

### Настройки

Системные настройки ресурса:

- Шаблон
- Публикация (дата, статус)
- Индексация и кэширование
- **Опции категории** — настройка опций товаров в этой категории

### Группы ресурсов

Управление правами доступа к категории.

## Таблица товаров

### Технология

Таблица товаров реализована на Vue 3 + PrimeVue для современного UX:

- Виртуализация больших списков
- Динамическая загрузка данных
- Реактивные фильтры
- Плавная анимация drag-and-drop

### Системная настройка колонок

Колонки таблицы настраиваются через `ms3_category_grid_fields`:

```
id,pagetitle,article,price,weight,image
```

**Доступные поля:**

| Группа | Поля |
|--------|------|
| Ресурс | `id`, `pagetitle`, `longtitle`, `alias`, `menuindex`, `template`, `published`, `deleted` |
| Товар | `article`, `price`, `old_price`, `weight`, `image`, `thumb` |
| Флаги | `new`, `popular`, `favorite` |
| Производитель | `vendor_id`, `vendor_name`, `made_in` |
| Даты | `createdon`, `editedon`, `publishedon` |

## Настройка колонок таблицы

### Через интерфейс

1. Откройте **Утилиты → Колонки гридов**
2. Выберите грид **category-products**
3. Настройте видимость, порядок, ширину колонок
4. Сохраните

Подробнее: [Утилиты: Колонки гридов](utilities/grid-columns)

### Через PHP конфигурацию

Создайте файл кастомной конфигурации:

```php
// core/components/minishop3/custom/grids/category-products.php

return [
    [
        'name' => 'id',
        'label' => 'ID',
        'visible' => true,
        'sortable' => true,
        'width' => '60px',
        'isSystem' => true,
    ],
    [
        'name' => 'thumb',
        'label' => 'Изображение',
        'visible' => true,
        'type' => 'image',
        'width' => '60px',
    ],
    [
        'name' => 'pagetitle',
        'label' => 'Название',
        'visible' => true,
        'sortable' => true,
        'filterable' => true,
        'minWidth' => '200px',
        'type' => 'template',
        'template' => '<span class="product-id">({id})</span> <a href="?a=resource/update&id={id}">{pagetitle}</a>',
    ],
    [
        'name' => 'article',
        'label' => 'Артикул',
        'visible' => true,
        'sortable' => true,
        'filterable' => true,
        'width' => '100px',
    ],
    [
        'name' => 'price',
        'label' => 'Цена',
        'visible' => true,
        'sortable' => true,
        'type' => 'price',
        'width' => '100px',
    ],
    [
        'name' => 'actions',
        'label' => 'Действия',
        'visible' => true,
        'isSystem' => true,
        'frozen' => true,
        'width' => '140px',
        'type' => 'actions',
    ],
];
```

### Добавление кастомной колонки

**Пример: добавление колонки "Остаток":**

```php
[
    'name' => 'remains',
    'label' => 'Остаток',
    'visible' => true,
    'sortable' => true,
    'width' => '80px',
    'type' => 'number',
    // Редактирование в таблице
    'editable' => true,
    'editor' => [
        'xtype' => 'numberfield',
        'minValue' => 0,
    ],
]
```

### Типы колонок

| Тип | Описание | Пример |
|-----|----------|--------|
| `text` | Текст (по умолчанию) | Название, артикул |
| `number` | Число | Остаток |
| `price` | Цена с форматированием | 1 234,56 |
| `weight` | Вес с форматированием | 0,5 кг |
| `boolean` | Да/Нет тег | Опубликован |
| `image` | Миниатюра изображения | Фото товара |
| `template` | Кастомный HTML-шаблон | Ссылка на товар |
| `actions` | Кнопки действий | Редактировать, удалить |
| `relation` | Поле из связанной таблицы | Название статуса |
| `badge` | Цветная метка (Tag) | Статус заказа с цветом |

### Relation-поля (связи с другими таблицами)

Тип `relation` позволяет подтягивать данные из связанных таблиц (JOIN):

```php
[
    'name' => 'status_name',
    'label' => 'Статус',
    'type' => 'relation',
    'visible' => false,  // Скрытое поле-источник для badge
    'relation' => [
        'table' => 'msOrderStatus',       // Класс модели или таблица
        'foreignKey' => 'status_id',      // Поле связи в основной таблице
        'displayField' => 'name',         // Поле для отображения
    ],
]
```

**Параметры relation:**

| Параметр | Описание |
|----------|----------|
| `table` | Класс xPDO модели (например `msOrderStatus`) |
| `foreignKey` | Поле в основной таблице для связи |
| `displayField` | Поле из связанной таблицы для отображения |

::: info Оптимизация
При добавлении нескольких relation-полей к одной таблице система автоматически группирует их в один JOIN. Например, `status_name` и `status_color` используют один JOIN к `msOrderStatus`.
:::

### Badge-поля (цветные метки)

Тип `badge` отображает цветную метку (PrimeVue Tag), используя данные из других колонок:

```php
[
    'name' => 'status',
    'label' => 'Статус',
    'type' => 'badge',
    'visible' => true,
    'computed' => [
        'source_field' => 'status_name',   // Колонка-источник текста
        'color_field' => 'status_color',   // Колонка-источник цвета
    ],
]
```

**Пример: Статус заказа с цветом**

Для отображения статуса заказа с цветной меткой нужно создать 3 поля:

```php
// 1. Скрытое relation поле для названия статуса
[
    'name' => 'status_name',
    'type' => 'relation',
    'visible' => false,
    'relation' => [
        'table' => 'msOrderStatus',
        'foreignKey' => 'status_id',
        'displayField' => 'name',
    ],
],

// 2. Скрытое relation поле для цвета статуса
[
    'name' => 'status_color',
    'type' => 'relation',
    'visible' => false,
    'relation' => [
        'table' => 'msOrderStatus',
        'foreignKey' => 'status_id',
        'displayField' => 'color',
    ],
],

// 3. Видимое badge поле, использующее данные из relation полей
[
    'name' => 'status',
    'label' => 'Статус',
    'type' => 'badge',
    'visible' => true,
    'sortable' => true,
    'computed' => [
        'source_field' => 'status_name',
        'color_field' => 'status_color',
    ],
],
```

::: tip Цвета в базе данных
Цвета в таблице `msOrderStatus` хранятся в HEX формате без `#` (например `FF5733`). Система автоматически добавляет `#` при рендеринге.
:::

## Добавление действий в колонку

### Конфигурация действий

Действия настраиваются в колонке с типом `actions`:

```php
[
    'name' => 'actions',
    'label' => 'Действия',
    'visible' => true,
    'type' => 'actions',
    'width' => '180px',
    'actions' => [
        [
            'name' => 'view',
            'handler' => 'view',
            'icon' => 'pi-eye',
            'label' => 'view',
        ],
        [
            'name' => 'edit',
            'handler' => 'edit',
            'icon' => 'pi-pencil',
            'label' => 'edit',
        ],
        [
            'name' => 'publish',
            'handler' => 'publish',
            'icon' => 'pi-check',
            'iconOff' => 'pi-times',
            'label' => 'publish',
            'labelOff' => 'unpublish',
            'toggleField' => 'published',
        ],
        [
            'name' => 'duplicate',
            'handler' => 'duplicate',
            'icon' => 'pi-copy',
            'label' => 'duplicate',
        ],
        [
            'name' => 'delete',
            'handler' => 'delete',
            'icon' => 'pi-trash',
            'label' => 'delete',
            'severity' => 'danger',
            'confirm' => true,
            'confirmMessage' => 'product_delete_confirm_message',
        ],
    ],
]
```

### Параметры действия

| Параметр | Тип | Описание |
|----------|-----|----------|
| `name` | string | Уникальный идентификатор |
| `handler` | string | Имя обработчика (view, edit, delete, publish, duplicate) |
| `icon` | string | Иконка PrimeIcons (pi-*) |
| `iconOff` | string | Иконка для выключенного состояния (toggle) |
| `label` | string | Ключ лексикона для tooltip |
| `labelOff` | string | Ключ лексикона для выключенного состояния |
| `severity` | string | Стиль кнопки (danger, success, warning) |
| `confirm` | bool | Требовать подтверждение |
| `confirmMessage` | string | Ключ лексикона сообщения подтверждения |
| `toggleField` | string | Поле для toggle-действий |
| `visible` | function | Условие видимости |

### Кастомные действия через JavaScript

Регистрация кастомного действия через `MS3ActionRegistry`:

```javascript
// Плагин: Добавление в избранное
document.addEventListener('DOMContentLoaded', () => {
  if (window.MS3ActionRegistry) {
    // Регистрация обработчика
    MS3ActionRegistry.register('addToFavorites', async (data, gridId) => {
      const response = await fetch('/assets/components/mycomponent/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addToFavorites',
          product_id: data.id
        })
      })

      const result = await response.json()

      if (result.success) {
        // Показать уведомление
        if (window.PrimeVue) {
          // Используем Toast из PrimeVue
        } else {
          alert('Товар добавлен в избранное')
        }
        return { success: true, refresh: true }
      }

      return { success: false, message: result.message }
    })
  }
})
```

Добавление действия в конфигурацию колонки:

```php
[
    'name' => 'addToFavorites',
    'handler' => 'addToFavorites',  // Имя зарегистрированного обработчика
    'icon' => 'pi-heart',
    'label' => 'Добавить в избранное',
]
```

### Хуки для стандартных действий

```javascript
// Хук перед удалением товара
MS3ActionRegistry.registerBeforeHook('delete', async (data, gridId) => {
  // Проверка условий
  if (data.orders_count > 0) {
    alert('Нельзя удалить товар с заказами!')
    return false  // Отменить действие
  }
  return true  // Продолжить
})

// Хук после публикации
MS3ActionRegistry.registerAfterHook('publish', async (data, result, gridId) => {
  console.log(`Товар ${data.id} опубликован:`, result)
  // Отправка уведомления, обновление кэша и т.д.
})
```

## Добавление фильтра

### Структура фильтров

Фильтры настраиваются через конфигурационные файлы:

- **Стандартные:** `core/components/minishop3/config/filters/category-products.php`
- **Кастомные:** `core/components/minishop3/custom/filters/category-products.php`

Кастомный файл переопределяет стандартный и не перезаписывается при обновлении компонента.

### Конфигурация фильтра

```php
// core/components/minishop3/custom/filters/category-products.php

return [
    // Текстовый поиск
    'query' => [
        'type' => 'text',
        'label' => 'search',
        'placeholder' => 'search_by_title_article',
        'width' => '250px',
        'position' => 10,
    ],

    // Фильтр по публикации
    'published' => [
        'type' => 'select',
        'label' => 'published',
        'placeholder' => 'all',
        'source' => [
            'type' => 'static',
            'options' => [
                ['label' => 'ms3_yes', 'value' => 1],
                ['label' => 'ms3_no', 'value' => 0],
            ],
        ],
        'width' => '120px',
        'position' => 20,
    ],

    // Фильтр по производителю
    'vendor_id' => [
        'type' => 'select',
        'label' => 'vendor',
        'placeholder' => 'all',
        'source' => [
            'type' => 'model',
            'class' => 'MiniShop3\\Model\\msVendor',
            'valueField' => 'id',
            'labelField' => 'name',
            'where' => ['active' => 1],
            'sort' => ['name' => 'ASC'],
        ],
        'width' => '180px',
        'position' => 30,
    ],

    // Фильтр по флагу "Новинка"
    'new' => [
        'type' => 'select',
        'label' => 'new',
        'placeholder' => 'all',
        'source' => [
            'type' => 'static',
            'options' => [
                ['label' => 'ms3_yes', 'value' => 1],
                ['label' => 'ms3_no', 'value' => 0],
            ],
        ],
        'width' => '100px',
        'position' => 40,
    ],

    // Скрытый фильтр (по умолчанию не показывается)
    'deleted' => [
        'type' => 'select',
        'label' => 'deleted',
        'visible' => false,
        'position' => 100,
    ],
];
```

### Параметры фильтра

| Параметр | Тип | Описание |
|----------|-----|----------|
| `type` | string | Тип фильтра: `text`, `select`, `datepicker`, `daterange` |
| `label` | string | Ключ лексикона для подписи |
| `placeholder` | string | Ключ лексикона для placeholder |
| `width` | string | CSS ширина (`150px`, `20%`) |
| `position` | int | Порядок отображения (меньше = левее) |
| `visible` | bool | Показывать фильтр (по умолчанию `true`) |
| `source` | array | Конфигурация источника данных для `select` |

### Типы источников для select

#### Статические опции

```php
'source' => [
    'type' => 'static',
    'options' => [
        ['label' => 'Да', 'value' => 1],
        ['label' => 'Нет', 'value' => 0],
    ],
]
```

#### Из модели xPDO

```php
'source' => [
    'type' => 'model',
    'class' => 'MiniShop3\\Model\\msVendor',
    'valueField' => 'id',
    'labelField' => 'name',
    'where' => ['active' => 1],
    'sort' => ['name' => 'ASC'],
    'limit' => 500,
]
```

### Обработка фильтров на сервере

Фильтры автоматически применяются в `CategoryProductsController`:

```php
// core/components/minishop3/src/Controllers/Api/Manager/CategoryProductsController.php

// Boolean фильтры для полей msProduct
$productBooleanFields = ['published', 'deleted', 'hidemenu'];
foreach ($productBooleanFields as $field) {
    if (isset($params[$field]) && $params[$field] !== '') {
        $c->where(["msProduct.{$field}" => (int)$params[$field]]);
    }
}

// Boolean фильтры для полей msProductData
$dataBooleanFields = ['new', 'popular', 'favorite'];
foreach ($dataBooleanFields as $field) {
    if (isset($params[$field]) && $params[$field] !== '') {
        $c->where(["Data.{$field}" => (int)$params[$field]]);
    }
}

// Числовые фильтры
$dataNumericFields = ['price', 'vendor_id'];
foreach ($dataNumericFields as $field) {
    if (isset($params[$field]) && $params[$field] !== '') {
        $c->where(["Data.{$field}" => $params[$field]]);
    }
}
```

### Добавление кастомного фильтра

**Шаг 1: Добавьте фильтр в конфигурацию**

```php
// core/components/minishop3/custom/filters/category-products.php

return [
    // ... существующие фильтры ...

    'price_range' => [
        'type' => 'select',
        'label' => 'price_range',
        'placeholder' => 'all',
        'source' => [
            'type' => 'static',
            'options' => [
                ['label' => 'До 1000', 'value' => '0-1000'],
                ['label' => '1000-5000', 'value' => '1000-5000'],
                ['label' => '5000-10000', 'value' => '5000-10000'],
                ['label' => 'Более 10000', 'value' => '10000+'],
            ],
        ],
        'width' => '150px',
        'position' => 25,
    ],
];
```

**Шаг 2: Обработайте фильтр на сервере**

Создайте плагин для обработки кастомного фильтра:

```php
<?php
// Плагин: CustomCategoryFilters
// События: msOnBeforeCategoryProductsQuery

if ($modx->event->name !== 'msOnBeforeCategoryProductsQuery') return;

$params = $modx->event->params['params'] ?? [];
$query = $modx->event->params['query'];

// Обработка фильтра диапазона цен
if (!empty($params['price_range'])) {
    $range = $params['price_range'];

    if ($range === '10000+') {
        $query->where(['Data.price:>=' => 10000]);
    } else {
        [$min, $max] = explode('-', $range);
        $query->where([
            'Data.price:>=' => (int)$min,
            'Data.price:<=' => (int)$max,
        ]);
    }
}
```

## Массовые операции

### Доступные операции

| Операция | Описание |
|----------|----------|
| Публикация | Опубликовать выбранные товары |
| Снятие с публикации | Снять с публикации выбранные товары |
| Удаление | Пометить как удалённые |
| Восстановление | Восстановить удалённые товары |

### API массовых операций

```
POST /api/mgr/categories/{id}/products/multiple
```

**Параметры:**

```json
{
  "method": "publish",
  "ids": [1, 2, 3]
}
```

**Доступные методы:** `publish`, `unpublish`, `delete`, `undelete`, `show`, `hide`

## Drag-and-drop сортировка

### Условия работы

Сортировка перетаскиванием доступна когда:

1. Сортировка по `menuindex`
2. Не включён режим "Показать вложенные товары"
3. Нет активных фильтров

### API сортировки

```
POST /api/mgr/categories/{id}/products/sort
```

**Параметры:**

```json
{
  "items": [
    {"id": 5, "menuindex": 0},
    {"id": 3, "menuindex": 1},
    {"id": 8, "menuindex": 2}
  ]
}
```

## Системные настройки

| Настройка | Описание | По умолчанию |
|-----------|----------|--------------|
| `ms3_category_grid_fields` | Видимые колонки таблицы | `id,pagetitle,article,price,weight,image` |
| `ms3_category_show_nested_products` | Показывать вложенные товары | `false` |
| `ms3_category_show_options` | Показывать опции категории | `true` |
| `ms3_category_remember_tabs` | Запоминать активную вкладку | `true` |
| `ms3_category_remember_grid` | Запоминать состояние таблицы | `true` |

## События

### msOnManagerCustomCssJs

Добавление CSS/JS на страницу категории:

```php
<?php
// Плагин: MyCategoryExtension
// События: msOnManagerCustomCssJs

if ($modx->event->name !== 'msOnManagerCustomCssJs') return;

$page = $modx->event->params['page'] ?? '';

if ($page === 'category_update' || $page === 'category_create') {
    $modx->regClientCSS('/assets/components/mycomponent/css/category.css');
    $modx->regClientStartupScript('/assets/components/mycomponent/js/category.js');
}
```

## API Endpoints

### Товары категории

```
GET /api/mgr/categories/{id}/products
```

**Параметры:**

| Параметр | Описание |
|----------|----------|
| `start` | Смещение (пагинация) |
| `limit` | Количество записей |
| `sort` | Поле сортировки |
| `dir` | Направление (ASC/DESC) |
| `query` | Поисковый запрос |
| `nested` | Показать вложенные (0/1) |
| `published` | Фильтр по публикации |
| `*` | Любые другие фильтры |

### Конфигурация фильтров

```
GET /api/mgr/categories/{id}/products/filters
```

**Ответ:**

```json
{
  "success": true,
  "object": {
    "filters": {
      "query": {
        "type": "text",
        "label": "search",
        "position": 10
      },
      "published": {
        "type": "select",
        "label": "published",
        "options": [
          {"label": "Да", "value": 1},
          {"label": "Нет", "value": 0}
        ],
        "position": 20
      }
    }
  }
}
```

## Связанные страницы

- [Утилиты: Колонки гридов](utilities/grid-columns) — настройка колонок таблицы
- [Товар](product) — страница редактирования товара
- [Системные настройки](../settings) — все настройки компонента
