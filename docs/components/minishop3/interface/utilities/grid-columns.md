---
title: Колонки гридов
---
# Утилиты: Колонки гридов

Настройка отображения колонок в административных таблицах MiniShop3.

## Назначение

Основной инструмент настройки колонок в административных таблицах MiniShop3:

- Включать и отключать колонки
- Изменять порядок колонок
- Настраивать сортировку и фильтрацию
- Задавать ширину колонок
- Добавлять кастомные колонки
- Настраивать inline-редактирование (для грида `category-products`)

::: info Начиная с версии 1.7.0
Системная настройка `ms3_category_grid_fields` удалена. Настройка колонок таблицы товаров в категории выполняется только через этот интерфейс.
:::

## Доступные гриды

| Грид | Описание |
|------|----------|
| `customers` | Список покупателей |
| `orders` | Список заказов |
| `category-products` | Список товаров в категории |
| `order_products` | Товары в заказе |
| `vendors` | Список производителей |

## Интерфейс

### Выбор грида

В верхней части страницы выберите грид для настройки из выпадающего списка.

### Таблица колонок

Отображает текущую конфигурацию колонок:

| Колонка | Описание |
|---------|----------|
| Имя | Системное имя поля |
| Название | Отображаемый заголовок |
| Видимость | Показывать ли колонку |
| Сортировка | Можно ли сортировать |
| Фильтр | Можно ли фильтровать |
| Заморожена | Фиксация при горизонтальной прокрутке |
| Ширина | Ширина колонки в пикселях |

### Действия

- **Перетаскивание** — изменение порядка колонок
- **Редактирование** — клик на строку открывает диалог
- **Добавление** — кнопка для создания новой колонки

## Параметры колонки

### Основные

| Параметр | Описание |
|----------|----------|
| Имя поля | Имя поля из модели или алиас |
| Название | Заголовок колонки |
| Видимость | Отображать колонку |
| Сортировка | Разрешить сортировку по клику |
| Фильтрация | Показать поле фильтра |
| Заморожена | Фиксировать при прокрутке |

### Размеры

| Параметр | Описание |
|----------|----------|
| Ширина | Ширина в пикселях или % |
| Мин. ширина | Минимальная ширина при изменении размера |

### Тип колонки

| Тип | Описание |
|-----|----------|
| `model` | Поле из модели данных |
| `template` | Шаблонная колонка (HTML) |
| `relation` | Данные из связанной таблицы |
| `computed` | Вычисляемое значение |
| `image` | Отображение изображения |
| `boolean` | Флаг да/нет |
| `actions` | Колонка действий |

## Типы колонок

### Model (Поле модели)

Стандартная колонка, отображающая значение поля.

```
Тип: model
Имя поля: email
Название: Email
```

### Template (Шаблон)

Колонка с HTML-шаблоном для форматирования.

```
Тип: template
Шаблон: <a href="mailto:{email}">{email}</a>
```

Доступные переменные — поля текущей записи в фигурных скобках.

### Relation (Связь)

Данные из связанной таблицы.

**Параметры связи:**

| Параметр | Описание |
|----------|----------|
| Таблица | Имя связанной таблицы |
| Внешний ключ | Поле для связи |
| Отображаемое поле | Какое поле показывать |
| Агрегация | COUNT, SUM, AVG, MIN, MAX |

**Пример — количество заказов покупателя:**

```
Тип: relation
Таблица: msOrder
Внешний ключ: customer_id
Агрегация: COUNT
```

### Computed (Вычисляемое)

Значение вычисляется на сервере специальным классом.

```
Тип: computed
Класс: MyComponent\Columns\TotalSpentColumn
```

### Image (Изображение)

Отображение миниатюры изображения.

```
Тип: image
Имя поля: image
```

### Boolean (Логическое)

Отображение флага с иконкой.

```
Тип: boolean
Имя поля: active
```

### Actions (Действия)

Колонка с кнопками действий. Поддерживает встроенные и кастомные обработчики.

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
|----------|-----|----------|
| `name` | string | Уникальное имя действия |
| `handler` | string | Имя обработчика из реестра |
| `icon` | string | Иконка PrimeIcons (без `pi-` префикса) |
| `label` | string | Текст подсказки / ключ лексикона |
| `severity` | string | Стиль кнопки: `danger`, `success`, `secondary`, `info`, `warn` |
| `confirm` | boolean | Требовать подтверждение |
| `confirmMessage` | string | Текст подтверждения |
| `visible` | boolean | Видимость кнопки |
| `disabled` | boolean/function | Отключение кнопки |
| `disabledField` | string | Поле записи для проверки disabled |

**Встроенные обработчики:**

| Обработчик | Описание |
|------------|----------|
| `edit` | Открыть запись на редактирование |
| `delete` | Удалить запись |
| `view` | Просмотр записи |
| `addresses` | Управление адресами (для покупателей) |
| `refresh` | Обновить грид |

## Примеры настройки

### Скрыть колонку

1. Найдите колонку в списке
2. Снимите флаг "Видимость"
3. Нажмите "Сохранить"

### Добавить колонку "Сумма заказов"

1. Нажмите "Добавить колонку"
2. Заполните:
   - Имя: `total_spent`
   - Название: `Сумма заказов`
   - Тип: `relation`
   - Таблица: `msOrder`
   - Внешний ключ: `customer_id`
   - Отображаемое поле: `cost`
   - Агрегация: `SUM`
3. Сохраните

### Изменить порядок колонок

Перетащите колонки в нужном порядке, используя drag-and-drop.

### Добавить ссылку в email

1. Найдите колонку `email`
2. Измените тип на `template`
3. Укажите шаблон: `<a href="mailto:{email}">{email}</a>`
4. Сохраните

## API Endpoints

### Получение конфигурации грида

```
GET /api/mgr/grid-config/{grid_name}
```

**Ответ:**

```json
{
  "success": true,
  "object": {
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
    ]
  }
}
```

### Сохранение конфигурации

```
PUT /api/mgr/grid-config/{grid_name}
```

**Тело запроса:**

```json
{
  "columns": [
    {
      "name": "id",
      "label": "ID",
      "visible": true,
      "sortable": true,
      "filterable": false,
      "frozen": true,
      "width": 60,
      "sort_order": 0
    }
  ]
}
```

### Сброс к умолчаниям

```
DELETE /api/mgr/grid-config/{grid_name}
```

## Системные колонки

Некоторые колонки помечены как системные и имеют ограничения:

- Нельзя удалить
- Нельзя изменить имя поля
- Можно только скрыть

Системные колонки обычно включают `id` и колонки действий.

## Кастомные действия

MiniShop3 предоставляет глобальный реестр действий `MS3ActionRegistry` для добавления собственных кнопок в колонку действий.

### Реестр действий

Реестр доступен глобально через `window.MS3ActionRegistry` и позволяет:

- Регистрировать новые обработчики действий
- Добавлять хуки before/after для существующих действий
- Переопределять встроенные обработчики

### API реестра

#### register(name, handler, options)

Регистрирует новый обработчик действия.

**Параметры:**

| Параметр | Тип | Описание |
|----------|-----|----------|
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
|-------|----------|
| `has(name)` | Проверить наличие обработчика |
| `get(name)` | Получить обработчик |
| `unregister(name)` | Удалить обработчик (кроме встроенных) |
| `getRegisteredActions()` | Получить список всех зарегистрированных действий |
| `execute(name, data, context)` | Выполнить действие программно |

### Примеры кастомных действий

#### Пример 1: Блокировка покупателя

**Шаг 1. Регистрация обработчика** (в плагине MODX или кастомном JS):

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

1. Откройте **Утилиты → Колонки гридов**
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

```javascript
MS3ActionRegistry.register('duplicateProduct', async (data, context) => {
  const response = await fetch('/assets/components/minishop3/connector.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      action: 'MiniShop3\\Processors\\Product\\Duplicate',
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

```javascript
MS3ActionRegistry.register('sendNotification', async (data, context) => {
  // Показать диалог выбора шаблона
  const template = prompt('Введите имя шаблона уведомления:')
  if (!template) return

  const response = await fetch('/assets/components/minishop3/connector.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      action: 'MiniShop3\\Processors\\Notification\\Send',
      customer_id: data.id,
      template: template,
      HTTP_MODAUTH: MODx.siteId
    })
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

Используйте функцию для `disabled`:

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

Или проверка через поле данных:

```json
{
  "name": "block",
  "handler": "blockCustomer",
  "icon": "pi-ban",
  "label": "Заблокировать",
  "severity": "danger",
  "disabledField": "blocked"  // disabled когда blocked = true
}
```

### Хуки для встроенных действий

#### Логирование удалений

```javascript
MS3ActionRegistry.registerAfterHook('delete', async (data, context, result) => {
  // Отправка в систему аудита
  await fetch('/api/audit/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'delete',
      entity: context.gridId,
      entityId: data.id,
      user: MODx.user?.id,
      timestamp: new Date().toISOString()
    })
  })
})
```

#### Предотвращение удаления

```javascript
MS3ActionRegistry.registerBeforeHook('delete', (data, context) => {
  // Запретить удаление записей со статусом "оплачен"
  if (context.gridId === 'orders' && data.status === 2) {
    context.toast.add({
      severity: 'error',
      summary: 'Запрещено',
      detail: 'Нельзя удалить оплаченный заказ',
      life: 5000
    })
    return false // Отменить действие
  }
  return true // Продолжить
})
```

### Доступные иконки

Используются иконки [PrimeIcons](https://primevue.org/icons). Популярные:

| Иконка | Класс | Назначение |
|--------|-------|------------|
| ✏️ | `pi-pencil` | Редактирование |
| 🗑️ | `pi-trash` | Удаление |
| 👁️ | `pi-eye` | Просмотр |
| 📋 | `pi-copy` | Копирование |
| ⬇️ | `pi-download` | Скачивание |
| 📤 | `pi-send` | Отправка |
| 🔒 | `pi-lock` | Блокировка |
| 🔓 | `pi-unlock` | Разблокировка |
| 🚫 | `pi-ban` | Запрет |
| ✅ | `pi-check` | Подтверждение |
| ❌ | `pi-times` | Отмена |
| 🔄 | `pi-refresh` | Обновление |
| ⚙️ | `pi-cog` | Настройки |
| 🖨️ | `pi-print` | Печать |
| 🔗 | `pi-external-link` | Внешняя ссылка |
