---
title: Колонки гридов
---
# Утилиты: Колонки гридов

Настройка колонок в таблицах менеджера MiniShop3.

## Назначение

::: tip Cookbook
Пошаговые примеры badge-колонки в заказах и редактирование прямо в таблице: [Cookbook колонок грида](/components/minishop3/manager/grid-config/cookbook).
:::

- Включать и отключать колонки
- Изменять порядок колонок
- Настраивать сортировку и фильтрацию
- Задавать ширину колонок
- Добавлять свои колонки
- Настраивать редактирование прямо в таблице (для грида `category-products`)

::: info Начиная с версии 1.7.0
Системная настройка `ms3_category_grid_fields` удалена. Настройка колонок таблицы товаров в категории выполняется только через этот интерфейс.
:::

## Доступные гриды

| Грид | Описание |
| --- | --- |
| `customers` | Список покупателей |
| `orders` | Список заказов |
| `category-products` | Список товаров в категории |
| `order_products` | Товары в заказе |
| `vendors` | Список производителей |

## Интерфейс

### Выбор грида

Вверху страницы выберите грид из списка.

### Действия

- **Перетаскивание** — изменение порядка колонок
- **Редактирование** — клик на строку открывает диалог
- **Добавление** — кнопка для создания новой колонки

## Параметры колонки

### Основные

| Параметр | Описание |
| --- | --- |
| Имя поля | Имя поля из модели или алиас |
| Название | Заголовок колонки |
| Видимость | Отображать колонку |
| Сортировка | Разрешить сортировку по клику |
| Фильтрация | Показать поле фильтра |
| Заморожена | Фиксировать при прокрутке |

### Размеры

| Параметр | Описание |
| --- | --- |
| Ширина | Ширина в пикселях или % |
| Мин. ширина | Минимальная ширина при изменении размера |

### Тип колонки

| Тип | Описание |
| --- | --- |
| `model` | Поле из модели данных |
| `template` | Шаблонная колонка (HTML) |
| `relation` | Данные из связанной таблицы |
| `badge` | Цветная метка (`source_field`, `color_field`) |
| `option` | Значение опции товара (грид `category-products`) |
| `computed` | Вычисляемое значение |
| `image` | Отображение изображения |
| `boolean` | Флаг да/нет |
| `price` | Денежное значение (`displayConfig`: валюта, decimals) |
| `weight` | Вес (`displayConfig`: unit, decimals) |
| `datetime` | Дата и время (`displayConfig`: format) |
| `actions` | Колонка действий |

## Типы колонок

### Поле модели (`model`)

Стандартная колонка: значение поля.

```text
Тип: model
Имя поля: email
Название: Email
```

### Шаблон (`template`)

Колонка с HTML-шаблоном.

```text
Тип: template
Шаблон: <a href="mailto:{email}">{email}</a>
```

Доступные переменные — поля текущей записи в фигурных скобках.

### Цветная метка (`badge`)

Цветная метка по тексту и HEX-цвету из других полей строки. В гриде `orders` колонка `order_status` берёт подпись из `status_name` и цвет из `status_color`.

```text
Тип: badge
source_field: status_name
color_field: status_color
```

### Опция товара (`option`)

Колонка опции в гриде `category-products`. В конфиге укажите `option.key` (ключ опции из `msOption`).

```text
Тип: option
option.key: color
```

### Связь (`relation`)

Данные из связанной таблицы.

**Параметры связи:**

| Параметр | Описание |
| --- | --- |
| Таблица | Имя связанной таблицы |
| Внешний ключ | Поле для связи |
| Отображаемое поле | Какое поле показывать |
| Агрегация | COUNT, SUM, AVG, MIN, MAX |

**Пример — количество заказов покупателя:**

```text
Тип: relation
Таблица: msOrder
Внешний ключ: customer_id
Агрегация: COUNT
```

### Вычисляемое значение (`computed`)

Значение вычисляется на сервере. В JSON config обязателен ключ **`computed.className`** (класс реализует `ComputedFieldInterface`):

```json
{
  "type": "computed",
  "computed": {
    "className": "MyComponent\\Columns\\TotalSpentColumn"
  }
}
```

### Изображение (`image`)

Миниатюра изображения.

```text
Тип: image
Имя поля: image
```

### Флаг (`boolean`)

Флаг с иконкой.

```text
Тип: boolean
Имя поля: active
```

### Цена (`price`)

Числовое поле как цена. Параметры в JSON **displayConfig**:

| Ключ | Описание |
| --- | --- |
| `decimals` | Знаков после запятой |
| `currency` | Символ валюты |
| `currency_position` | `before` или `after` |
| `thousands_separator` | Разделитель тысяч |
| `decimal_separator` | Разделитель дробной части (по умолчанию из настройки цены) |

```text
Тип: price
Имя поля: price
displayConfig: {"decimals":2,"currency":"₽","currency_position":"after","thousands_separator":" "}
```

### Вес (`weight`)

Вес отображается с единицей измерения:

```text
Тип: weight
Имя поля: weight
displayConfig: {"decimals":2,"unit":"кг","unit_position":"after"}
```

### Дата и время (`datetime`)

```text
Тип: datetime
Имя поля: createdon
displayConfig: {"format":"dd.MM.yyyy HH:mm"}
```

Формат — шаблон PrimeVue date formatter (`dd`, `MM`, `yyyy`, `HH`, `mm`).

### Действия (`actions`)

Колонка с кнопками действий. Встроенные и свои обработчики.

**Конфигурация действий:**

```json
[
  {
    "name": "edit",
    "handler": "edit",
    "icon": "pi-pencil",
    "label": "Редактировать",
    "severity": null
  },
  {
    "name": "delete",
    "handler": "delete",
    "icon": "pi-trash",
    "label": "Удалить",
    "severity": "danger",
    "confirm": true,
    "confirmMessage": "Вы уверены, что хотите удалить запись?"
  }
]
```

**Параметры действия:**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `name` | string | Уникальное имя действия |
| `handler` | string | Имя обработчика из реестра |
| `icon` | string | Полный класс PrimeIcons, например `pi-pencil` |
| `label` | string | Текст подсказки / ключ лексикона |
| `severity` | string | Стиль кнопки: `danger`, `success`, `secondary`, `info`, `warn` |
| `confirm` | boolean | Требовать подтверждение |
| `confirmMessage` | string | Текст подтверждения |
| `visible` | boolean | Видимость кнопки |
| `disabled` | boolean/function | Отключение кнопки |
| `disabledField` | string | Поле записи для проверки disabled |

**Встроенные обработчики:**

| Обработчик | Описание |
| --- | --- |
| `edit` | Открыть запись на редактирование |
| `delete` | Удалить запись |
| `view` | Просмотр записи |
| `addresses` | Управление адресами (для покупателей) |
| `refresh` | Обновить грид |

## Примеры настройки

### Добавить колонку «Сумма заказов»

1. Нажмите «Добавить колонку»
2. Заполните:
   - Имя: `total_spent`
   - Название: `Сумма заказов`
   - Тип: `relation`
   - Таблица: `msOrder`
   - Внешний ключ: `customer_id`
   - Отображаемое поле: `cost`
   - Агрегация: `SUM`
3. Сохраните

## API-эндпоинты

### Получение конфигурации грида

```http
GET /api/mgr/grid-config/{grid_name}
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "columns": [
      {
        "name": "id",
        "label": "ID",
        "visible": true,
        "sortable": true,
        "filterable": false,
        "frozen": true,
        "width": 60,
        "type": "model"
      }
    ],
    "direct_filter_keys": ["query", "status_id"],
    "editor_references": []
  }
}
```

Поле `editor_references` заполняется только для `grid_key=category-products`.

### Сохранение конфигурации

```http
PUT /api/mgr/grid-config/{grid_key}
```

**Тело запроса:**

```json
{
  "fields": [
    {
      "name": "id",
      "label": "ID",
      "visible": true,
      "sortable": true,
      "filterable": false,
      "frozen": true,
      "width": 60,
      "type": "model"
    }
  ]
}
```

::: warning Права
`GET /api/mgr/grid-config/{grid_key}` требует `view_document`. Запись (`PUT`, `POST`, `DELETE` колонки) — `mssetting_save`.
:::

### Удаление колонки

```http
DELETE /api/mgr/grid-config/{grid_key}/{field_name}
```

Системные колонки (`is_system`) удалить нельзя.

## Системные колонки

Системные колонки ограничены:

- Нельзя удалить
- Нельзя изменить имя поля
- Можно только скрыть

Обычно это `id` и колонки действий.

## Свои действия

Глобальный реестр `MS3ActionRegistry` добавляет свои кнопки в колонку действий.

### Реестр действий

Реестр доступен как `window.MS3ActionRegistry`:

- регистрируете обработчики действий
- подключаете хуки до и после существующих действий
- переопределяете встроенные обработчики

### API реестра

#### register(name, handler, options)

Регистрирует обработчик действия.

**Параметры:**

| Параметр | Тип | Описание |
| --- | --- | --- |
| `name` | string | Имя действия |
| `handler` | function | Функция-обработчик `(data, context) => void` |
| `options.override` | boolean | Разрешить перезапись существующего обработчика |

**Параметры handler:**

- `data` — объект данных строки грида
- `context` — контекст выполнения:
  - `gridId` — идентификатор грида
  - `emit(event, data)` — отправка события
  - `refresh()` — обновление грида
  - `toast` — сервис уведомлений PrimeVue
  - `confirm` — сервис подтверждений PrimeVue
  - `_(key)` — функция локализации

#### registerBeforeHook(actionName, hook)

Регистрирует хук, выполняемый **перед** действием.

```javascript
MS3ActionRegistry.registerBeforeHook('delete', (data, context) => {
  // Вернуть false для отмены действия
  if (data.is_system) {
    context.toast.add({
      severity: 'warn',
      summary: 'Запрещено',
      detail: 'Нельзя удалить системную запись'
    })
    return false
  }
  return true
})
```

#### registerAfterHook(actionName, hook)

Регистрирует хук, выполняемый **после** действия.

```javascript
MS3ActionRegistry.registerAfterHook('delete', (data, context, result) => {
  console.log('Запись удалена:', data.id)
  // Можно отправить аналитику, логировать и т.д.
})
```

#### Другие методы

| Метод | Описание |
| --- | --- |
| `has(name)` | Проверить наличие обработчика |
| `get(name)` | Получить обработчик |
| `unregister(name)` | Удалить обработчик (кроме встроенных) |
| `getRegisteredActions()` | Получить список всех зарегистрированных действий |
| `execute(name, data, context)` | Выполнить действие программно |

### Примеры своих действий

#### Пример 1: Блокировка покупателя

**Шаг 1. Регистрация обработчика** (в плагине MODX или своём JS):

```javascript
// Файл: assets/components/mycomponent/js/customer-actions.js

document.addEventListener('DOMContentLoaded', () => {
  // Ждём загрузки реестра
  if (!window.MS3ActionRegistry) {
    console.error('MS3ActionRegistry not available')
    return
  }

  // Регистрируем действие "Заблокировать"
  MS3ActionRegistry.register('blockCustomer', async (data, context) => {
    try {
      const response = await fetch('/assets/components/minishop3/connector.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'MyComponent\\Processors\\Customer\\Block',
          id: data.id,
          HTTP_MODAUTH: MODx.siteId
        })
      })

      const result = await response.json()

      if (result.success) {
        context.toast.add({
          severity: 'success',
          summary: 'Успех',
          detail: `Покупатель ${data.email} заблокирован`,
          life: 3000
        })
        context.refresh() // Обновить грид
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      context.toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error.message,
        life: 5000
      })
    }
  })

  // Регистрируем действие "Разблокировать"
  MS3ActionRegistry.register('unblockCustomer', async (data, context) => {
    const response = await fetch('/assets/components/minishop3/connector.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        action: 'MyComponent\\Processors\\Customer\\Unblock',
        id: data.id,
        HTTP_MODAUTH: MODx.siteId
      })
    })

    const result = await response.json()
    if (result.success) {
      context.toast.add({
        severity: 'success',
        summary: 'Покупатель разблокирован',
        life: 3000
      })
      context.refresh()
    }
  })
})
```

**Шаг 2. Подключение скрипта** через плагин MODX:

```php
<?php
// Плагин: MyCustomerActions
// События: OnManagerPageBeforeRender

if ($modx->event->name !== 'OnManagerPageBeforeRender') return;

// Только на странице покупателей
$controller = $modx->controller ?? null;
if (!$controller || strpos(get_class($controller), 'Customers') === false) return;

$modx->regClientStartupScript(
    MODX_ASSETS_URL . 'components/mycomponent/js/customer-actions.js'
);
```

**Шаг 3. Настройка колонки действий** через интерфейс:

1. Откройте **Утилиты → Конфигурация гридов**
2. Выберите грид `customers`
3. Найдите колонку `actions` и откройте редактор
4. Добавьте новое действие:
   - Имя: `blockCustomer`
   - Обработчик: `blockCustomer`
   - Иконка: `pi-ban`
   - Стиль: `danger`
   - Подтверждение: Да
   - Сообщение: `Заблокировать покупателя {email}?`

#### Пример 2: Копирование товара

Штатного процессора дублирования в MiniShop3 нет — вызываем ядерный MODX `resource/duplicate` (`msProduct` наследует ресурс):

```javascript
MS3ActionRegistry.register('duplicateProduct', async (data, context) => {
  const response = await fetch('/assets/components/minishop3/connector.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      action: 'resource/duplicate',
      id: data.id,
      HTTP_MODAUTH: MODx.siteId
    })
  })

  const result = await response.json()

  if (result.success) {
    context.toast.add({
      severity: 'success',
      summary: 'Товар скопирован',
      detail: `Создан товар ID: ${result.object.id}`,
      life: 3000
    })
    context.refresh()
  }
})
```

**Конфигурация действия:**

```json
{
  "name": "duplicate",
  "handler": "duplicateProduct",
  "icon": "pi-copy",
  "label": "Копировать",
  "severity": "secondary",
  "confirm": false
}
```

#### Пример 3: Отправка уведомления

Штатного процессора отправки уведомления нет — REST-роуты `/api/mgr/notifications` отдают только CRUD конфигураций. Для кнопки «Отправить» реализуйте свой эндпоинт (внутри — `NotificationManager` или `StatusChangedNotification`) и вызовите его из обработчика:

```javascript
MS3ActionRegistry.register('sendNotification', async (data, context) => {
  const response = await fetch('/assets/components/mycomponent/notify.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer_id: data.id })
  })

  const result = await response.json()

  if (result.success) {
    context.toast.add({
      severity: 'success',
      summary: 'Уведомление отправлено',
      detail: `Email: ${data.email}`,
      life: 3000
    })
  }
})
```

#### Пример 4: Условная видимость кнопки

Кнопку отключают полем записи `disabledField`:

```javascript
// В конфигурации колонки
{
  "name": "unblock",
  "handler": "unblockCustomer",
  "icon": "pi-unlock",
  "label": "Разблокировать",
  "severity": "success",
  // Кнопка неактивна, если покупатель не заблокирован
  "disabledField": "active"  // disabled когда active = true
}
```

### Доступные иконки

Иконки — [PrimeIcons](https://primevue.org/icons): `pi-pencil`, `pi-trash`, `pi-eye`, `pi-copy`, `pi-download`, `pi-send`, `pi-lock`, `pi-unlock`, `pi-ban`, `pi-check`, `pi-times`, `pi-refresh`, `pi-cog`.
