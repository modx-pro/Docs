---
title: Опции товаров
---
# Опции товаров

Управление опциями доступно через **Extras → MiniShop3 → Настройки → Опции**.

::: info Начиная с v1.10.0-beta1
Интерфейс управления опциями полностью переведён на Vue 3 + PrimeVue. ExtJS-версии окон
и гридов удалены вместе со всеми процессорами `Processors/Settings/Option/*` и
`Processors/Category/Option/*`. Все операции идут через REST API
`/api/mgr/options/*` и `/api/mgr/categories/{id}/options/*`.
:::

## Назначение

Опции — это система дополнительных характеристик товаров (EAV — Entity-Attribute-Value). Позволяют добавлять произвольные свойства без изменения структуры БД:

- Цвет, размер, материал
- Технические характеристики
- Комплектация
- Любые кастомные свойства

## Интерфейс

Страница разбита на две колонки:

- **Слева** — дерево категорий MODX (только ресурсы с `class_key = msCategory`). Чекбоксы выбора категории **независимые** (галка на родителе не каскадирует на детей и наоборот). Контекстное меню (правый клик по узлу): обновить ветку, развернуть / свернуть поддерево, «Выделить всё» / «Снять выделение» рекурсивно по ветке. Есть поиск по названию категории.
- **Справа** — грид опций (PrimeVue DataTable). Фильтры в тулбаре: выбранные в дереве категории + «Группа (modCategory)». Массовые действия — назначить выбранные опции нескольким категориям сразу, удалить.

Создание и редактирование опции открывается в диалоге: слева форма (ключ, название, описание, тип, группа, единица измерения), справа дерево категорий для привязки. Для типов `combobox` / `comboMultiple` / `comboColors` появляется редактор значений с drag-drop сортировкой; для `comboColors` — встроенный `ColorPicker` рядом с hex-полем.

## Поля опции

| Поле | Тип | Описание |
|------|-----|----------|
| `key` | string | Уникальный ключ опции (латиница, цифры, `_`, `-`) |
| `caption` | string | Название для отображения |
| `description` | text | Описание опции |
| `measure_unit` | string | Единица измерения (шт, кг, см) |
| `modcategory_id` | int | Группа (категория MODX), для визуальной группировки в UI. Необязательно |
| `type` | string | Тип значения (см. ниже) |
| `properties` | JSON | Дополнительные настройки (для типов со списком значений) |

## Типы опций

Тип хранится в `msOption.type` в формате `lowerCamelCase`. Все 10 поддерживаемых типов:

| type | Описание | Редактор значений в настройках | UI в карточке товара |
|------|----------|---------------------------------|-----------------------|
| `textfield` | Однострочное текстовое поле | — | InputText |
| `textarea` | Многострочный текст | — | Textarea |
| `numberfield` | Число | — | InputNumber |
| `datefield` | Дата | — | DatePicker (YYYY-MM-DD) |
| `checkbox` | Флажок (Да / Нет) | — | Checkbox |
| `comboBoolean` | Выпадающий Да / Нет | — | Select из двух значений |
| `combobox` | Одиночный выбор из списка | Список строк (drag-drop) | Select |
| `comboMultiple` | Множественный выбор из списка | Список строк (drag-drop) | MultiSelect |
| `comboColors` | Множественный выбор с цветами | Список `{value, name=hex}` + ColorPicker | MultiSelect с цветовыми квадратами |
| `comboOptions` | Свободный ввод тегов с автодополнением | — (значения накапливаются при сохранении товаров) | PrimeVue InputChips + список подсказок из ранее введённых значений |

### Структура `properties` для типов со списком

`combobox`, `comboMultiple`:

```json
{
  "values": ["S", "M", "L", "XL"]
}
```

`comboColors` (hex хранится в поле `name`, отображаемое название — в `value`):

```json
{
  "values": [
    { "value": "Красный", "name": "#FF0000" },
    { "value": "Синий",   "name": "#0000FF" }
  ]
}
```

`comboOptions` не требует предзаданного списка — пользователь на карточке товара вводит любой текст (Enter, запятая или клик вне поля → чип). Автодополнение тянет уже введённые значения того же ключа у **других товаров** через `/api/mgr/options/suggestions`.

## Привязка к категориям

Опции показываются только в тех товарах, которые лежат в привязанных категориях. Привязку можно сделать несколькими путями:

- **В диалоге редактирования опции** — отметить категории в дереве справа.
- **В карточке категории → вкладка Опции** — добавить опцию к этой категории.
- **Массовое назначение** — выделить несколько опций в гриде, нажать «Назначить в категории», выбрать категории.

### Per-category caption / description override

::: info Начиная с v1.10.0-beta1
У связи «опция ↔ категория» (`msCategoryOption`) появились собственные `caption` и `description`.
:::

Если в этой категории опция должна называться не так, как глобально — задайте override
в гриде опций категории (inline-edit по ячейке «Название (для категории)») или в диалоге
«Добавить опцию». Пустое значение означает «использовать глобальное». Не-пустое —
отображается и в админке (в форме товара этой категории), и на витрине через
`OptionLoaderService::loadForProduct` / `loadForProducts`.

**Разрешение конфликта при нескольких категориях у товара:** если товар лежит в нескольких
категориях и в каждой задан свой override, побеждает значение в таком порядке:

1. Категория-родитель товара (`msProduct.parent`)
2. Меньший `msCategoryOption.position`
3. Меньший `category_id` (стабильный tiebreak)

### Через PHP

```php
/** @var \MiniShop3\Model\msOption $option */
$option = $modx->getObject(\MiniShop3\Model\msOption::class, ['key' => 'color']);
$option->setCategories([5, 10, 15]); // ID категорий

// Через сервис (с поддержкой override caption/description):
$optionService = $modx->services->get('ms3_option_service');
$optionService->addOptionToCategory(
    optionId: $option->get('id'),
    categoryId: 5,
    defaultValue: 'Красный',
    active: true,
    position: 0,
    caption: 'Цвет обивки',       // override для этой категории
    description: null
);
```

## Значения опций товара

Значения хранятся в таблице `ms3_product_options` (`product_id`, `key`, `value`).
Для multi-value типов (`comboMultiple`, `comboColors`, `comboOptions`) — несколько строк
с одним `key` на товар.

### Добавление значения

```php
$modx->services->get('ms3_option_service')->saveProductOptions(
    productId: 123,
    options: [
        'color' => 'Красный',            // single value
        'size' => ['S', 'M', 'L'],       // multi value
    ],
    removeOther: true                     // удалить ключи, не упомянутые в $options
);
```

### Получение значений

Стандартный путь — через `OptionLoaderService`:

```php
$loader = $modx->services->get('ms3_option_service')->getLoader();

// Для одного товара (уже с применённым per-category caption override)
$data = $loader->loadForProduct(123);
// $data = [
//   'color'         => ['Красный'],
//   'color.caption' => 'Цвет обивки',  // override из msCategoryOption (если задан)
//   'size'          => ['S', 'M'],
//   ...
// ]

// Для каталога (batch, без N+1)
$byProduct = $loader->loadForProducts([123, 124, 125]);
```

## Вывод опций

### Сниппет msOptions

Выводит список опций для фильтрации:

```fenom
{'msOptions' | snippet : [
    'tpl' => 'tpl.msOptions.row',
    'parents' => 5
]}
```

### Сниппет msProductOptions

Выводит опции конкретного товара:

```fenom
{'msProductOptions' | snippet : [
    'product' => $id,
    'tpl' => 'tpl.msProductOptions.row'
]}
```

### В карточке товара

```fenom
{if $options?}
<div class="product-options">
    {foreach $options as $key => $value}
    <div class="option">
        <span class="option-name">{$key}:</span>
        <span class="option-value">{$value}</span>
    </div>
    {/foreach}
</div>
{/if}
```

## Опции в корзине

При добавлении товара в корзину можно передать выбранные опции:

### JavaScript (Web API)

```javascript
await ms3.cartAPI.add(123, 1, { color: 'Красный', size: 'L' })
```

### Отображение в корзине

Опции сохраняются в позиции корзины и доступны в чанке:

```fenom
{if $options?}
    {foreach $options as $key => $value}
        <small>{$key}: {$value}</small>
    {/foreach}
{/if}
```

## REST API

Все операции UI идут через эти эндпойнты (manager API, `/assets/components/minishop3/connector.php`, action `MiniShop3\Processors\Api\Router`). Permissions: `mssetting_save` для опций, `mscategory_save` для привязки к категории.

### Опции

| Метод | Путь | Описание |
|---|---|---|
| `GET` | `/api/mgr/options` | Список опций. Параметры: `start`, `limit`, `modcategory_id`, `category_id`, `categories[]` |
| `GET` | `/api/mgr/options/{id}` | Деталь + карта `categories` |
| `POST` | `/api/mgr/options` | Создать (`key`, `caption`, `type`, `properties`, `categories`, …) |
| `PUT` | `/api/mgr/options/{id}` | Обновить (partial) |
| `DELETE` | `/api/mgr/options/{id}` | Удалить опцию (cascade по значениям у товаров через модельный hook) |
| `DELETE` | `/api/mgr/options/bulk` | Массовое удаление (`ids[]`) |
| `POST` | `/api/mgr/options/bulk/assign` | Назначить `options[]` к `categories[]` |
| `GET` | `/api/mgr/options/types` | Список доступных типов (c локализованными названиями) |
| `GET` | `/api/mgr/options/tree` | Дерево категорий MODX (только `class_key = msCategory`). Лениво по `parent` |
| `GET` | `/api/mgr/options/modcategories` | Плоский список `modCategory` для фильтра «Группа» |
| `GET` | `/api/mgr/options/suggestions` | Список уникальных значений по `key` для `comboOptions` автодополнения (`key`, `query`, `limit`) |

### Привязки категорий

| Метод | Путь | Описание |
|---|---|---|
| `GET` | `/api/mgr/categories/{category_id}/options` | Опции, привязанные к категории (с `global_caption`/`global_description` + `category_caption`/`category_description` override) |
| `POST` | `/api/mgr/categories/{category_id}/options` | Добавить опцию к категории (`option_id`, `value`, `active`, `required`, `caption`, `description`) |
| `PUT` | `/api/mgr/categories/{category_id}/options/{option_id}` | Partial update связки (value / active / required / position / caption / description) |
| `DELETE` | `/api/mgr/categories/{category_id}/options/{option_id}` | Удалить связку |
| `POST` | `/api/mgr/categories/{category_id}/options/sort` | Сохранить новый порядок (`option_ids[]`) |
| `POST` | `/api/mgr/categories/{category_id}/options/bulk` | Массовые действия: `activate` / `deactivate` / `require` / `unrequire` / `remove` для `option_ids[]` |
| `POST` | `/api/mgr/categories/{category_id}/options/duplicate` | Скопировать все связки из другой категории (`category_from`), пропуская уже существующие |

## Импорт опций

При импорте товаров из CSV опции создаются автоматически из столбцов с префиксом `option_`:

| pagetitle | price | option_color | option_size |
|-----------|-------|--------------|-------------|
| Футболка  | 1500  | Красный      | L           |
| Футболка  | 1500  | Синий        | M           |

Опции `color` и `size` будут созданы автоматически, если не существуют. По умолчанию они создаются как `textfield` — тип можно поменять позже через UI.
