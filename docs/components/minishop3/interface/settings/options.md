---
title: Опции товаров
---
# Опции товаров

Откройте **Extras → MiniShop3 → Настройки → Опции**.

::: info С v1.10.0-beta1
UI опций на Vue 3 + PrimeVue. Старые ExtJS-окна и процессоры `Processors/Settings/Option/*`, `Processors/Category/Option/*` удалены. Все операции идут через `/api/mgr/options/*` и `/api/mgr/categories/{id}/options/*`.
:::

## Назначение

Опции хранят характеристики товара (EAV): цвет, размер, материал, любые свои ключи. Таблицы ядра MODX под это не трогаете.

## Интерфейс

Две вкладки:

1. **Опции:** дерево категорий слева, грид опций справа.
2. **Группы опций:** CRUD и drag-and-drop сортировка `msOptionGroup` (с v1.11).

<!-- ![Справочник опций](/components/minishop3/screenshots/mgr-options.png) -->

<!-- ![Группы опций](/components/minishop3/screenshots/mgr-option-groups.png) -->

### Вкладка «Опции»

- **Слева:** дерево категорий MODX (`class_key = msCategory`). Чекбоксы независимые: галка на родителе не отмечает детей. Контекстное меню: обновить ветку, развернуть или свернуть, выделить или снять выделение по ветке. Есть поиск по названию.
- **Справа:** грид опций. Фильтры: выбранные категории и группа (`option_group_id`). Массовые действия: назначить опции категориям, удалить.

Диалог создания и правки: слева форма (ключ, название, описание, тип, группа `msOptionGroup`, единица измерения), справа дерево категорий для привязки. Для `combobox` / `comboMultiple` / `comboColors` есть редактор значений с drag-drop. У `comboColors` рядом с hex стоит `ColorPicker`.

### Вкладка «Группы опций»

Группы лежат в `ms3_option_groups` (`name`, `description`, `sort_order`). Это не `modCategory`: чужие категории других пакетов в списке больше не всплывают.

У опции поле `option_group_id` (nullable). Удалите группу: опции отвяжутся (`option_group_id = NULL`), сами записи опций останутся.

::: warning Breaking (v1.11)
Раньше группа шла через `msOption.modcategory_id` и `modCategory`. Миграция Phinx переносит данные в `msOptionGroup`. В чанках замените `{$option.category_name}` / `{$option.category}` на `{$option.group_name}`. Эндпоинт `/api/mgr/options/modcategories` удалён. Используйте `/api/mgr/option-groups`.
:::

## Поля опции

| Поле | Тип | Описание |
| --- | --- | --- |
| `key` | string | Уникальный ключ опции (латиница, цифры, `_`, `-`) |
| `caption` | string | Название для отображения |
| `description` | text | Описание опции |
| `measure_unit` | string | Единица измерения (шт, кг, см) |
| `option_group_id` | int / null | Группа `msOptionGroup`. Необязательно |
| `type` | string | Тип значения (см. ниже) |
| `properties` | JSON | Дополнительные настройки (для типов со списком значений) |

## Типы опций

Тип хранится в `msOption.type` в формате `lowerCamelCase`. Все 10 поддерживаемых типов:

| type | Описание | Редактор значений в настройках | UI в карточке товара |
| --- | --- | --- | --- |
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

`comboColors`: hex лежит в `name`, подпись для людей в `value`.

```json
{
  "values": [
    { "value": "Красный", "name": "#FF0000" },
    { "value": "Синий",   "name": "#0000FF" }
  ]
}
```

`comboOptions` не требует готового списка. На карточке товара вводите любой текст (Enter, запятая или клик вне поля создаёт чип). Автодополнение тянет значения того же ключа у **других товаров** через `/api/mgr/options/suggestions`.

## Привязка к категориям

Опция видна в товарах только привязанных категорий. Сделайте привязку так:

1. В диалоге опции отметьте категории в дереве справа.
2. В карточке категории на вкладке «Опции» добавьте опцию.
3. В гриде выделите несколько опций → «Назначить в категории».

### Per-category caption / description override

::: info С v1.10.0-beta1
У связи «опция ↔ категория» (`msCategoryOption`) есть свои `caption` и `description`.
:::

Если в этой категории нужно другое название, задайте override в гриде опций категории (inline-edit «Название (для категории)») или в диалоге «Добавить опцию». Пустое значение берёт глобальное. Непустое видно в админке на товаре этой категории и на витрине через `OptionLoaderService::loadForProduct` / `loadForProducts`.

**Несколько категорий у товара.** Если у родителя и у доп. категорий разные override, побеждает такой порядок:

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
| --- | --- | --- |
| `GET` | `/api/mgr/options` | Список. Параметры: `start`, `limit`, `option_group_id` (`0` = без группы), `category_id`, `categories[]` |
| `GET` | `/api/mgr/options/{id}` | Деталь + карта `categories` |
| `POST` | `/api/mgr/options` | Создать (`key`, `caption`, `type`, `option_group_id`, `properties`, `categories`, …) |
| `PUT` | `/api/mgr/options/{id}` | Обновить (partial) |
| `DELETE` | `/api/mgr/options/{id}` | Удалить опцию (cascade по значениям у товаров) |
| `DELETE` | `/api/mgr/options/bulk` | Массовое удаление (`ids[]`) |
| `POST` | `/api/mgr/options/bulk/assign` | Назначить `options[]` к `categories[]` |
| `GET` | `/api/mgr/options/types` | Список типов |
| `GET` | `/api/mgr/options/tree` | Дерево категорий `msCategory` (lazy по `parent`) |
| `GET` | `/api/mgr/options/suggestions` | Уникальные значения для `comboOptions` (`key`, `query`, `limit`) |
| `GET` | `/api/mgr/option-groups` | Список групп |
| `POST` | `/api/mgr/option-groups` | Создать группу |
| `GET` / `PUT` / `DELETE` | `/api/mgr/option-groups/{id}` | Чтение, правка, удаление |
| `PUT` | `/api/mgr/option-groups/positions` | Порядок после DnD |
| `DELETE` | `/api/mgr/option-groups/bulk` | Массовое удаление |

### Привязки категорий

| Метод | Путь | Описание |
| --- | --- | --- |
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
| --- | --- | --- | --- |
| Футболка | 1500 | Красный | L |
| Футболка | 1500 | Синий | M |

Опции `color` и `size` будут созданы автоматически, если не существуют. По умолчанию они создаются как `textfield` — тип можно поменять позже через UI.
