---
title: Категория
---
# Страница категории

Откройте категорию (`msCategory`) в дереве ресурсов. Главная вкладка — таблица товаров.

## Структура вкладок

### Товары

| Функция | Описание |
| --- | --- |
| Drag-and-drop | Сортировка товаров перетаскиванием |
| Фильтры | Поиск, публикация, свои фильтры |
| Массовые операции | Публикация, снятие с публикации, удаление |
| Настраиваемые колонки | Через [Утилиты → Конфигурация гридов](utilities/grid-columns) |
| Действия | Просмотр, редактирование, удаление, дублирование |

### Документ

Стандартная вкладка MODX с полями ресурса:

| Поле | Описание |
| --- | --- |
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
- **Опции категории** — настройка опций товаров в этой категории (см. ниже)

### Опции категории

::: info Начиная с v1.10.0-beta1
Вкладка полностью на Vue (компонент `CategoryOptionsTab`). Прежний ExtJS-грид и процессоры `Processors/Category/Option/*` удалены.
:::

Грид опций, привязанных к этой категории:

- **Drag-and-drop сортировка** — порядок (`position`) сохраняется одним POST после отпускания (`/api/mgr/categories/{id}/options/sort`)
- **Inline-редактирование** по двойному клику:
  - `Значение по умолчанию` — подставится в форму товара
  - `Название (для категории)` — собственное значение вместо глобального `caption` (пусто = берётся глобальное)
- **Колонка «Глобально»** (только для чтения) — `caption` из `msOption` для сравнения со своим значением
- **Массовые действия** (выделение чекбоксами): Активировать / Деактивировать / Сделать обязательной / Снять обязательность / Удалить
- **Кнопка «Добавить опцию»** — диалог выбора опции: значение по умолчанию, active, required, свои `caption`/`description`
- **Кнопка «Копировать опции из категории»** — переносит все связки из другой категории (дубликаты пропускает). После копирования `msCategoryOption::save()` применит опции ко всем товарам текущей категории.

### Группы ресурсов

Управление правами доступа к категории.

## Таблица товаров

Большие списки грузятся порциями: на экране только видимые строки.

### Inline-редактирование

Двойной клик по ячейке правит значение прямо в таблице:

| Тип редактора | Поля |
| --- | --- |
| `text` | `pagetitle`, `longtitle`, `article`, `made_in` |
| `number` | `price`, `old_price`, `weight` |
| `select` | `published`, `new`, `popular`, `favorite` |

Флаги выводятся колонкой типа `boolean` (Да/Нет). Для inline-правки задайте им `editor_type` `select` или `text`: типа `boolean` среди редакторов нет.

Настройка в **Утилиты → Конфигурация гридов**, грид `category-products`: включите `editable`, задайте `editor_type` (`text`, `number`, `select`, `combo`), опционально `editor_options`. Право на запись ячейки: `msproduct_save` (`PUT /api/mgr/categories/{id}/products/{productId}/data`). Пошагово: [Cookbook колонок грида](/components/minishop3/manager/grid-config/cookbook).

## Настройка колонок таблицы

::: warning Устаревшая настройка
Системная настройка `ms3_category_grid_fields` удалена начиная с версии 1.7.0. Используйте интерфейс [Колонки гридов](utilities/grid-columns).
:::

### Через интерфейс

**Утилиты → Конфигурация гридов** → грид **category-products** (`grid_key=category-products`): настройте видимость, порядок и ширину колонок, сохраните.

### Через API и утилиту

В 1.13.x PHP-файла `core/components/minishop3/custom/grids/category-products.php` **нет**. Колонки хранятся в `ms3_grid_fields` и настраиваются через интерфейс гридов (см. выше) или Manager API `/api/mgr/grid-config/category-products` (см. [Cookbook колонок грида](/components/minishop3/manager/grid-config/cookbook)).

Пример добавления колонки через API:

```http
POST /api/mgr/grid-config/category-products/field
```

```json
{
  "field_name": "stock",
  "label": "Остаток",
  "type": "model",
  "visible": true,
  "sortable": true,
  "editable": true,
  "editor_type": "number",
  "config": {}
}
```

### Типы колонок

| Тип | Описание | Пример |
| --- | --- | --- |
| `model` | Поле модели | Название, артикул |
| `price` | Цена с `displayConfig` | 1 234,56 ₽ |
| `weight` | Вес с `displayConfig` | 0,5 кг |
| `boolean` | Да/Нет | Опубликован |
| `image` | Миниатюра | Фото товара |
| `template` | HTML-шаблон | Ссылка на товар |
| `actions` | Кнопки действий | Редактировать, удалить |
| `relation` | Связанная таблица | Название статуса |
| `badge` | Цветная метка | Статус с цветом |
| `option` | Опция товара | `option.key` |
| `computed` | PHP-класс колонки | `computed.className` |

Полный справочник: [Колонки гридов](utilities/grid-columns).

### Relation и badge

Для badge в гриде `orders` скрытые relation-колонки дают текст и HEX. Видимая колонка получает тип **`badge`** с полями на **верхнем уровне** config (не внутри `computed`):

```json
{
  "type": "badge",
  "source_field": "status_name",
  "color_field": "status_color"
}
```

В `category-products` агрегация для relation **не поддерживается**. Параметры relation и `computed.className` — в справочнике [Колонки гридов](utilities/grid-columns).

::: tip Цвета статусов
В `msOrderStatus` цвет часто хранится HEX без `#`. Интерфейс добавляет `#` при отрисовке badge.
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
            'name' => 'publish',
            'handler' => 'publish',
            'icon' => 'pi-check',
            'iconOff' => 'pi-times',
            'label' => 'publish',
            'labelOff' => 'unpublish',
            'toggleField' => 'published',
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
| --- | --- | --- |
| `name` | string | Уникальный идентификатор |
| `handler` | string | Имя обработчика (view, edit, delete, publish, duplicate) |
| `icon` | string | Иконка PrimeIcons (pi-*) |
| `iconOff` | string | Иконка для выключенного состояния (toggle) |
| `label` | string | Ключ лексикона для tooltip |
| `labelOff` | string | Ключ лексикона для выключенного состояния |
| `severity` | string | Стиль кнопки: `secondary`, `success`, `info`, `warn`, `danger` |
| `confirm` | bool | Требовать подтверждение |
| `confirmMessage` | string | Ключ лексикона сообщения подтверждения |
| `toggleField` | string | Поле для toggle-действий |
| `visible` | function | Условие видимости |
| `disabled` | bool / function | Выключить кнопку: `true` или функция от строки (`(row) => …`) |
| `disabledField` | string | Выключить кнопку, пока истинно поле строки с этим именем |
| `isDisabled` | bool | Итоговое состояние выключения (вычисляется и используется UI) |

### Свои действия через JavaScript

Регистрация через `MS3ActionRegistry`. Второй аргумент — **`context`**, не `gridId`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (!window.MS3ActionRegistry) return

  MS3ActionRegistry.register('addToFavorites', async (data, context) => {
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
      return { success: true, refresh: true }
    }

    return { success: false, message: result.message }
  })
})
```

Действие добавьте в config колонки `actions` через **Утилиты → Конфигурация гридов** или PUT grid-config:

```json
{
  "name": "addToFavorites",
  "handler": "addToFavorites",
  "icon": "pi-heart",
  "label": "Добавить в избранное"
}
```

### Хуки для стандартных действий

```javascript
// Хук перед удалением товара
MS3ActionRegistry.registerBeforeHook('delete', async (data, context) => {
  if (data.orders_count > 0) {
    return false
  }
  return true
})

MS3ActionRegistry.registerAfterHook('publish', async (data, result, context) => {
  console.log(`Товар ${data.id} опубликован:`, result)
})
```

## Добавление фильтра

### Структура фильтров

Фильтры настраиваются через конфигурационные файлы:

- **Стандартные:** `core/components/minishop3/config/filters/category-products.php`
- **Свои:** `core/components/minishop3/custom/filters/category-products.php`

Свой файл переопределяет стандартный и не перезаписывается при обновлении компонента.

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
| --- | --- | --- |
| `type` | string | Тип фильтра: `text`, `select` — эти два выводит грид категории; `checkbox` заявлен в конфиге, но в вёрстке не выводится; `datepicker`/`daterange` используются в гриде заказов |
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

Фильтры автоматически применяются в `CategoryProductsListService`:

```php
// core/components/minishop3/src/Services/Category/CategoryProductsListService.php

$productBooleanFields = ['published', 'deleted', 'hidemenu', 'isfolder'];
$dataBooleanFields = ['new', 'popular', 'favorite'];
$dataNumericFields = ['price', 'old_price', 'weight', 'vendor_id'];
// Плюс текстовые поля msProduct и Data.article, Data.made_in, опции filter_* …
```

### Добавление своего фильтра

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

Ключ из query, которого нет в сервисе (например `price_range`), сервер сам не обработает. Логику фильтрации добавляйте в сервис списка или расширяйте `CategoryProductsListService` в своём пакете.

## Массовые операции

### Доступные операции

| Операция | Описание |
| --- | --- |
| Публикация | Опубликовать выбранные товары |
| Снятие с публикации | Снять с публикации выбранные товары |
| Удаление | Пометить как удалённые |
| Восстановление | Восстановить удалённые товары |

### API массовых операций

```http
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

Сортировка перетаскиванием доступна, когда:

1. Сортировка по `menuindex`
2. Не включён режим «Показать вложенные товары»

### API сортировки

```http
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
| --- | --- | --- |
| `ms3_category_show_nested_products` | Показывать вложенные товары | `true` |
| `ms3_category_show_options` | Показывать опции категории | `false` |

Системной настройки «Запоминать состояние таблицы» нет: номер и размер страницы хранятся в браузере (`localStorage`) и настройкой не управляются.

## События

### msOnManagerCustomCssJs

Добавляет CSS/JS на страницу категории:

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

## API-эндпоинты

### Товары категории

```http
GET /api/mgr/categories/{id}/products
```

**Параметры:**

| Параметр | Описание |
| --- | --- |
| `start` | Смещение (пагинация) |
| `limit` | Количество записей |
| `sort` | Поле сортировки |
| `dir` | Направление (ASC/DESC) |
| `query` | Поисковый запрос |
| `nested` | Показать вложенные (0/1) |
| `published` | Фильтр по публикации |
| `*` | Любые другие фильтры |

### Конфигурация фильтров

```http
GET /api/mgr/categories/{id}/products/filters
```

**Ответ:**

```json
{
  "success": true,
  "data": {
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

### Inline-редактирование данных товара

```http
PUT /api/mgr/categories/{id}/products/{productId}/data
```

Тело JSON — поля `msProductData` (цена, артикул и т.д.) из грида категории, без открытия карточки товара. Контроллер: `CategoryProductsController::updateProductData()`.

## Связанные страницы

- [Утилиты: Колонки гридов](utilities/grid-columns) — настройка колонок таблицы
- [Товар](product) — страница редактирования товара
- [Системные настройки](../settings) — все настройки компонента
