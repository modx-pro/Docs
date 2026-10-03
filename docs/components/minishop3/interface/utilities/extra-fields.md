---
title: Дополнительные поля
---
# Утилиты: Дополнительные поля

Свои колонки к моделям MiniShop3 без правки ядра. Поле пишется в БД и появляется в формах менеджера.

::: tip Cookbook
Пошаговые кейсы (заказ, repeater, key-value): [Cookbook дополнительных полей](/components/minishop3/manager/extra-fields/cookbook). Примеры: [поле в заказе](/components/minishop3/manager/examples/order-custom-field), [оптовая цена у товара](/components/minishop3/manager/examples/product-extra-field).
:::

## Назначение

Создаёте ключ, тип виджета и тип колонки. После миграции колонки поле доступно в карточке модели и (для товара) в импорте CSV.

## Поддерживаемые модели

В интерфейсе выбираете короткое имя; в БД и POST сохраняется полное `MiniShop3\Model\...`.

| Короткое имя | Класс в API / БД | Описание |
| --- | --- | --- |
| `msProduct` | `MiniShop3\Model\msProduct` | Ресурс товара (в выпадающем списке интерфейса нет — только через API) |
| `msProductData` | `MiniShop3\Model\msProductData` | Данные товара |
| `msCategory` | `MiniShop3\Model\msCategory` | Категория (в выпадающем списке интерфейса нет — только через API) |
| `msVendor` | `MiniShop3\Model\msVendor` | Производитель |
| `msOption` | `MiniShop3\Model\msOption` | Опция |
| `msLink` | `MiniShop3\Model\msLink` | Тип связи |
| `msOrder` | `MiniShop3\Model\msOrder` | Заказ |
| `msOrderAddress` | `MiniShop3\Model\msOrderAddress` | Адрес доставки |
| `msOrderProduct` | `MiniShop3\Model\msOrderProduct` | Позиция заказа |
| `msOrderStatus` | `MiniShop3\Model\msOrderStatus` | Статус заказа |
| `msCustomer` | `MiniShop3\Model\msCustomer` | Покупатель |
| `msCustomerAddress` | `MiniShop3\Model\msCustomerAddress` | Адрес покупателя |
| `msDelivery` | `MiniShop3\Model\msDelivery` | Доставка |
| `msPayment` | `MiniShop3\Model\msPayment` | Оплата |

Чтение схемы (`GET /api/mgr/extra-fields`) доступно любому авторизованному менеджеру — формы заказа и товара получают её без отдельного права. `mssetting_save` требуется только на создание, правку и удаление полей.

## Создание поля

1. Выберите модель в списке вверху страницы.
2. Нажмите **«Добавить поле»** и заполните форму.

### Параметры поля

#### Основные

| Параметр | Описание | Обязательно |
| --- | --- | --- |
| Ключ (key) | Уникальное имя поля (латиница, snake_case) | Да |
| Название (label) | Отображаемое название | Да |
| Описание | Подсказка для пользователя | Нет |
| Активно | Поле используется | Да |

::: warning Ключ поля
Ключ должен быть уникальным в пределах модели. Используйте латиницу и подчёркивания. Например: `wholesale_price`, `external_id`, `custom_field`.
:::

#### Тип виджета (xtype)

| Тип | Описание | Применение |
| --- | --- | --- |
| `textfield` | Текстовое поле | Строки, артикулы |
| `numberfield` | Числовое поле | Цены, количества |
| `textarea` | Многострочное поле | Описания |
| `xcheckbox` | Флажок | Да/Нет |
| `ms3-combo-select` | Выпадающий список (фиксированный) | Статусы, типы доставки |
| `ms3-combo-vendor` | Выбор производителя | Связь с производителем |
| `ms3-combo-autocomplete` | Автодополнение | Выбор из списка |
| `ms3-combo-options` | Выбор опции | Варианты товара |
| `ms3-repeater` | Таблица строк (JSON) | Состав, характеристики списком |
| `ms3-key-value` | Ключ → значение (JSON) | Набор именованных свойств |
| `datefield` | Поле даты | Даты (обычно с `dbtype: date`) |

#### Repeater (`ms3-repeater`)

С v1.12. В `properties` / конфиге виджета задают `repeater_config`:

```json
{
  "columns": [
    { "key": "name", "label": "Название" },
    { "key": "qty", "label": "Кол-во", "type": "number" }
  ],
  "minRows": 0,
  "maxRows": 50,
  "sortable": true,
  "rankField": "rank"
}
```

В БД обычно колонка `json`. В CSV-импорт эти поля не попадают.

#### Key-value (`ms3-key-value`)

Конфиг `key_value_config`:

```json
{
  "mode": "fixed",
  "keys": [
    { "key": "width", "label": "Ширина", "valueType": "number", "required": false },
    { "key": "material", "label": "Материал", "valueType": "string", "required": true }
  ]
}
```

Режим `fixed` разрешает только заданные ключи, режим `free` — добавлять пары самостоятельно.

#### Тип данных БД (dbtype)

| Тип | Описание | Пример значений |
| --- | --- | --- |
| `varchar` | Строка переменной длины | Текст до 255 символов |
| `text` | Длинный текст | Описания, HTML |
| `int` | Целое число | ID, количества |
| `decimal` | Десятичное число | Цены с копейками |
| `tinyint` | Малое целое (0-255) | Флаги, рейтинги |
| `date` | Дата без времени | 2024-01-15 |
| `datetime` | Дата и время | 2024-01-15 12:30:00 |
| `timestamp` | Временная метка | Unix timestamp |
| `json` | JSON-данные | Массивы, объекты |

#### Точность (precision)

Для типов `varchar` и `decimal`:

- `varchar`: максимальная длина строки (по умолчанию 255)
- `decimal`: формат `10,2` (10 цифр всего, 2 после запятой)

#### PHP-тип (phptype)

| Тип | Описание |
| --- | --- |
| `string` | Строка |
| `integer` | Целое число |
| `float` | Число с плавающей точкой |
| `boolean` | Логическое значение |
| `json` | JSON (автоматическое кодирование/декодирование) |
| `datetime` | Объект DateTime |
| `timestamp` | Unix timestamp |

#### Значение по умолчанию

| Тип | Описание |
| --- | --- |
| `NULL` | Пустое значение |
| `CURRENT_TIMESTAMP` | Текущее время (для datetime) |
| `USER_DEFINED` | Указать вручную |
| `NONE` | Без значения по умолчанию |

#### Индексирование

| Тип | Описание | Когда использовать |
| --- | --- | --- |
| `NONE` | Без индекса | Редко используемые поля |
| `INDEX` | Обычный индекс | Поля для поиска и сортировки |
| `UNIQUE` | Уникальный индекс | Поля с уникальными значениями |
| `FULLTEXT` | Полнотекстовый индекс | Поиск по тексту |

## Примеры полей

### Оптовая цена

```text
Ключ: wholesale_price
Название: Оптовая цена
xtype: numberfield
dbtype: decimal
Precision: 12,2
phptype: float
Default: NULL
Index: NONE
```

### Внешний ID (1С)

```text
Ключ: external_id
Название: ID в 1С
xtype: textfield
dbtype: varchar
Precision: 50
phptype: string
Default: NULL
Index: UNIQUE
```

### Срок доставки

```text
Ключ: delivery_days
Название: Срок доставки (дней)
xtype: numberfield
dbtype: int
phptype: integer
Default: USER_DEFINED → 3
Index: NONE
```

### Дополнительные характеристики (JSON)

```text
Ключ: extra_attributes
Название: Доп. характеристики
xtype: textarea
dbtype: json
phptype: json
Default: NULL
Index: NONE
```

## Редактирование поля

Кликните строку поля, откроется диалог редактирования.

::: warning Ограничения
Некоторые параметры нельзя изменить после создания:

- Ключ поля
- Тип данных БД (dbtype)

Для изменения этих параметров удалите поле и создайте заново.
:::

## Удаление поля

1. Кликните на иконку удаления в строке поля
2. Подтвердите действие в диалоговом окне

::: danger Внимание
Удаление поля необратимо — пропадают:

- Определение поля из схемы
- Колонку из таблицы БД
- Все данные этого поля для всех записей
:::

## Использование в коде

### Получение значения

```php
// Получить товар
$product = $modx->getObject(\MiniShop3\Model\msProduct::class, $id);

// Получить данные товара
$data = $product->getOne('Data');

// Получить значение дополнительного поля
$wholesalePrice = $data->get('wholesale_price');
```

### Сохранение значения

```php
$data = $product->getOne('Data');
$data->set('wholesale_price', 999.99);
$data->save();
```

### В сниппетах (Fenom)

```fenom
{$wholesale_price}
{if $wholesale_price > 0}
    <span class="wholesale">Оптом: {$wholesale_price | number_format : 0} руб.</span>
{/if}
```

## API-эндпоинты

### Список полей модели

```http
GET /api/mgr/extra-fields?class=MiniShop3\Model\msProductData
```

### Создание поля

```http
POST /api/mgr/extra-fields
```

**Тело запроса:**

```json
{
  "class": "MiniShop3\\Model\\msProductData",
  "key": "wholesale_price",
  "label": "Оптовая цена",
  "xtype": "numberfield",
  "dbtype": "decimal",
  "precision": "12,2",
  "phptype": "float",
  "null": true,
  "default": "NULL",
  "index_type": "NONE",
  "active": true
}
```

### Обновление поля

```http
PUT /api/mgr/extra-fields/{id}
```

### Удаление поля

```http
DELETE /api/mgr/extra-fields/{id}
```

## Миграции

При создании поля:

1. Создаётся запись в таблице конфигурации полей
2. Добавляется колонка в таблицу модели (ALTER TABLE)
3. Создаётся индекс (если указан)

При удалении поля:

1. Удаляется запись конфигурации
2. Удаляется колонка из таблицы БД
