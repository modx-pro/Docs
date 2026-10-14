---
title: Товар
---
# Страница товара

Откройте товар в дереве ресурсов MODX. Карточка `msProduct` совмещает поля ресурса и данные магазина.

## Структура вкладок

### Документ

Стандартная вкладка MODX с полями ресурса:

| Поле | Описание |
| --- | --- |
| `pagetitle` | Название товара |
| `longtitle` | Расширенный заголовок |
| `description` | Meta description |
| `introtext` | Краткое описание |
| `content` | Полное описание |
| `alias` | URL-псевдоним |
| `parent` | Родительская категория |

### Свойства товара

Поля товара сгруппированы по секциям.

**Стандартные секции** (`section_key` из сида):

| Секция | Ключ | Поля по умолчанию |
| --- | --- | --- |
| Основные данные | `main` | `article`, `weight`, `color`, `size`, `vendor_id`, `made_in` |
| Цены и склад | `pricing` | `price`, `old_price`, `stock` |
| SEO | `seo` | (пустая, под ваши поля) |
| Дополнительно | `additional` | `tags`, `new`, `favorite`, `popular` |

::: tip Настройка
Секции и поля: [Утилиты → Поля товара (админка)](utilities/product-fields). Новое поле в БД: [Cookbook extra fields](/components/minishop3/manager/extra-fields/cookbook), пример [Оптовая цена](/components/minishop3/manager/examples/product-extra-field).
:::

### Галерея

- Загрузка через drag-and-drop
- Сортировка перетаскиванием
- Установка главного изображения
- Редактирование описания

Подробнее: [Галерея товара](gallery)

### Связи

Vue-вкладка `ProductLinksTab`. CRUD через Manager API (право `msproduct_save`):

| Метод | Путь |
| --- | --- |
| `GET` | `/api/mgr/product-data/{id}/links` |
| `POST` | `/api/mgr/product-data/{id}/links` — body `{ slave, link }` |
| `DELETE` | `/api/mgr/product-data/{id}/links` — body `{ link, master, slave }` (batch `ids[]` не поддерживается) |
| `GET` | `/api/mgr/references/link-types` |
| `GET` | `/api/mgr/references/products` |

Типы связей из справочника `msLink`: `one_to_many`, `many_to_one`, `one_to_one`, `many_to_many`. Настройка типов: [Настройки → Связи товаров](settings/links).

### Категории

Vue-вкладка `ProductCategoriesTab`. Дерево: `GET /api/mgr/product-data/{id}/categories/tree` (сервис `ms3_product_category_tree`). Выбранные id уходят в resource POST как hidden `name="categories"` (JSON). Родительская категория (`parent`) в дереве заблокирована. Товар может состоять в нескольких доп. категориях через `msCategoryMember`.

### Опции товара

Значения опций товара (настроенных в [Настройки → Свойства товаров](settings/options)).

::: info Начиная с v1.10.0-beta1
Вкладка полностью на Vue. Компонент `ProductOptionField` поддерживает все 10 типов опций: `textfield`, `numberfield`, `textarea`, `checkbox`, `comboBoolean`, `combobox`, `comboMultiple`, `comboColors`, `comboOptions`, `datefield`. Рядом со значением `comboColors` рисуется цветовой квадрат, `comboOptions` — это PrimeVue `InputChips`: ввод произвольных тегов с подсказками из ранее использованных значений.
:::

Интерфейс группирует опции по `option_group_id` (`msOptionGroup`) и показывает их в вертикальных табах слева. Если группа одна — таб не показывается, поля идут списком.

**Свой caption / description для категории.** Если у связки «опция ↔ категория» задан свой `caption` (см. [Настройки → Свойства товаров](settings/options#per-category-caption-description-override)), в форме товара отображается именно он. Это то же значение, которое уходит на витрину.

**Сохранение.** Значения попадают в POST как `options-{key}` (single) или `options-{key}` с JSON-массивом (multi). Процессор `MiniShop3\Processors\Product\Update` в `beforeSet` собирает всё в ключ `options`. `Utils::decodeOptionValue()` разворачивает JSON-массив. `afterSave` вызывает `OptionSyncService::saveProductOptions($productId, $options, removeOther: true)`. Ключи, отсутствующие в POST, из `msProductOption` удаляются.

## Архитектура секций и полей

### Хранение данных

| Таблица | Описание |
| --- | --- |
| `ms3_page_sections` | Секции (разделы) страницы |
| `ms3_product_fields` | Поля товара с настройками |

### Модель msPageSection

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | int | ID секции |
| `page_key` | string | Ключ страницы (`product_data`) |
| `section_key` | string | Уникальный ключ секции |
| `hidden` | bool | Скрыта ли секция |
| `sort_order` | int | Порядок сортировки |
| `config` | json | JSON, часто `{"lexicon_key":"ms3_section_main"}` |
| `is_default` | bool | Секция по умолчанию |

### Модель msProductField

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | int | ID поля |
| `name` | string | Системное имя поля |
| `label` | string | Отображаемое название |
| `description` | string | Подсказка |
| `xtype` | string | Тип виджета |
| `section` | int | ID секции |
| `visible` | bool | Видимость |
| `required` | bool | Обязательность |
| `sort_order` | int | Порядок в секции |
| `width` | int | Ширина в 12-колоночной сетке (1–12, по умолчанию 4) |
| `config` | json | Дополнительные настройки |
| `is_system` | bool | Системное поле |
| `is_default` | bool | Поле по умолчанию |

## Управление секциями

### Создание секции

**Через интерфейс:**

1. Откройте **Утилиты → Поля товара (админка)**
2. Нажмите **«Добавить секцию»**
3. Заполните:
   - **Ключ секции** — уникальный идентификатор (латиница, например `seo`)
   - **Ключ лексикона** — для многоязычных названий (например `ms3_section_seo`)
   - **Название** — отображаемое название
4. Сохраните

**Через API** (в 1.13.x отдельного POST нет: интерфейс добавляет секцию локально и сохраняет список):

```http
PUT /api/mgr/config/sections/product_data
```

```json
{
  "sections": [
    {
      "section_key": "seo",
      "lexicon_key": "ms3_section_seo",
      "hidden": false
    }
  ]
}
```

Из тела читаются `hidden`, `is_default`, `lexicon_key` и `label` (на верхнем уровне объекта секции). Порядок задаётся позицией элемента в массиве — присланный `sort_order` и вложенный `config` не обрабатываются.

Право записи: `mssetting_save`.

### Редактирование секции

Кликните иконку редактирования рядом с секцией, измените параметры и сохраните.

### Удаление секции

::: warning Внимание
При удалении секции все её поля перемещаются в раздел «Без секции» (section = 0).
:::

### Сортировка секций

Перетащите секции в нужном порядке в левой панели.

## Управление полями

### Добавление нового поля

Новые поля добавляются через [Утилиты → Свои поля](utilities/extra-fields). Это создаёт:

1. Колонку в таблице `ms3_product_data`
2. Запись в `ms3_product_fields`

### Настройка существующего поля

**Через интерфейс:**

1. Откройте **Утилиты → Поля товара (админка)**
2. Выберите секцию и кликните поле
3. Настройте подпись, описание, секцию, виджет и видимость: ширина задаётся колонками сетки 1–12 (6 = половина строки, 12 = вся строка)
4. Сохраните

**Через API** (тело только с обёрткой `fields`):

```http
PUT /api/mgr/config/page-fields/product_data
```

```json
{
  "fields": [
    {
      "name": "article",
      "label": "Артикул товара",
      "section": 1,
      "visible": true,
      "sort_order": 0,
      "width": 6
    }
  ]
}
```

### Перемещение поля между секциями

Выберите новую секцию в выпадающем списке редактирования поля или измените `section` через API.

### Сортировка полей

Перетащите поля в нужном порядке внутри секции.

### Скрытие поля

Снимите в редактировании поля флаг «Видимость» и сохраните. Поле останется в базе данных, но не будет отображаться в карточке товара.

## Типы виджетов (xtype)

### Стандартные

| Тип | Описание | Использование |
| --- | --- | --- |
| `textfield` | Однострочное текстовое поле | Артикул, название |
| `numberfield` | Числовое поле | Цена, вес |
| `textarea` | Многострочное поле | Описание |
| `xcheckbox` / `checkbox` | Флажок | new, popular, favorite |
| `switch` | Переключатель (ToggleSwitch) | Да/нет-переключатели |
| `combobox` | Выпадающий список с поиском | Выбор из списка значений |
| `colorpicker` | Выбор цвета | Цвет товара |
| `datefield` | Выбор даты | Дата |

### Комбобоксы MiniShop3

| Тип | Описание |
| --- | --- |
| `ms3-combo-vendor` | Выбор производителя |
| `ms3-combo-category` | Выбор категории |
| `ms3-combo-autocomplete` | Автодополнение из списка |
| `ms3-combo-options` | Выбор из значений опций |
| `ms3-combo-select` | Выпадающий список (Vue) |
| `ms3-combo-user` | Выбор пользователя |
| `ms3-combo-customer` | Выбор клиента |
| `ms3-combo-source` | Выбор Media Source |

### Файлы и расширенные

| Тип | Описание |
| --- | --- |
| `filebrowser` | Выбор файла через Media Browser |
| `imagebrowser` | Выбор изображения через Media Browser |
| `file` | Загрузка файла |
| `image` | Загрузка изображения |
| `ms3-repeater` | Повторяемые поля |
| `ms3-key-value` | Пары ключ–значение |

## Системные настройки

| Настройка | Описание | По умолчанию |
| --- | --- | --- |
| `ms3_product_tab_extra` | Показывать вкладку «Свойства товара» | `true` |
| `ms3_product_tab_gallery` | Показывать вкладку галереи | `true` |
| `ms3_product_tab_links` | Показывать вкладку связей | `true` |
| `ms3_product_tab_options` | Показывать вкладку опций | `true` |
| `ms3_product_tab_categories` | Показывать вкладку категорий | `true` |
| `ms3_product_remember_tabs` | Запоминать активную вкладку | `true` |
| `ms3_product_main_fields` | Поля вкладки «Документ» | pagetitle, longtitle, ... |
| `ms3_product_extra_fields` | Дополнительные поля | price, article, ... |

## API-эндпоинты

### Конфигурация полей

**Получить все поля:**

```http
GET /api/mgr/config/page-fields/product_data
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "fields": [
      {
        "name": "article",
        "label": "Артикул",
        "xtype": "textfield",
        "section": 1,
        "visible": true,
        "sort_order": 0,
        "width": 6
      }
    ],
    "sections": {
      "1": {
        "id": 1,
        "section_key": "main",
        "label": "Основные данные",
        "sort_order": 0
      }
    }
  }
}
```

Сохранение полей: `PUT /api/mgr/config/page-fields/product_data`, тело — массив `fields` (см. выше).

### Секции

```http
GET /api/mgr/config/sections/product_data
```

Создание, правка и порядок — через bulk PUT, см. раздел «Управление секциями».

**Удалить секцию** (по `section_key`, не по id):

```http
DELETE /api/mgr/config/sections/product_data/{section_key}
```

### Данные товара

```http
GET /api/mgr/product-data/{product_id}
```

```http
PUT /api/mgr/product-data/{product_id}
```

## Примеры настройки

### Секция SEO

Секция `seo` уже в сиде и по умолчанию без полей. Перенесите в неё нужные поля из `main` / `additional` или extra fields модели `msProductData`.

`longtitle` и `description` живут на вкладке «Документ» (`ms3_product_main_fields`), не в `product_data`.

### Добавление своего поля

1. Откройте **Утилиты → Свои поля**
2. Выберите модель `msProductData`
3. Создайте поле:
   - Имя: `warranty_months`
   - Тип: `INT`
   - xtype: `numberfield`
4. Сохраните (создастся колонка в БД)
5. Откройте **Утилиты → Поля товара (админка)**
6. Переместите поле в нужную секцию
7. Настройте label и описание

## Расширение через плагины

Событие `msOnManagerCustomCssJs` добавляет свой CSS/JS на страницу товара:

```php
<?php
// Плагин: MyProductExtension
// События: msOnManagerCustomCssJs

if ($modx->event->name !== 'msOnManagerCustomCssJs') return;

$page = $modx->event->params['page'] ?? '';

if ($page === 'product_update' || $page === 'product_create') {
    $modx->regClientCSS('/assets/components/mycomponent/css/product.css');
    $modx->regClientStartupScript('/assets/components/mycomponent/js/product.js');
}
```

## Связанные страницы

- [Утилиты: Поля товара](utilities/product-fields) — настройка отображения полей
- [Утилиты: Дополнительные поля](utilities/extra-fields) — создание новых полей
- [Утилиты: Поля модели](utilities/model-fields) — управление полями из БД
- [Галерея товара](gallery) — система изображений
- [Системные настройки](../settings) — все настройки компонента
