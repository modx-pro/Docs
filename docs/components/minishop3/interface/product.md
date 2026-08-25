---
title: Товар
---
# Страница товара

Редактирование товара в административной панели MiniShop3.

## Обзор

Страница редактирования товара (`msProduct`) объединяет стандартный функционал MODX с расширенными возможностями для e-commerce:

- Редактируемые секции с полями товара
- Галерея изображений с drag-and-drop загрузкой
- Связи между товарами
- Опции и характеристики
- Дополнительные категории

## Структура вкладок

### Документ

Стандартная вкладка MODX с основными полями ресурса:

| Поле | Описание |
| --- | --- |
| `pagetitle` | Название товара |
| `longtitle` | Расширенный заголовок |
| `description` | Meta description |
| `introtext` | Краткое описание |
| `content` | Полное описание |
| `alias` | URL-псевдоним |
| `parent` | Родительская категория |

### Данные товара

Вкладка с полями товара, сгруппированными по секциям. Использует Vue 3 компонент для гибкого отображения.

**Стандартные секции:**

| Секция | Поля |
| --- | --- |
| Основные данные | `article`, `price`, `old_price`, `weight` |
| Наличие | `stock`, `new`, `popular`, `favorite` |
| Характеристики | `color`, `size`, `vendor`, `made_in`, `tags` |

::: tip Настройка
Секции и поля: [Утилиты → Поля товара](utilities/product-fields). Новое поле в БД: [Cookbook extra fields](/components/minishop3/manager/extra-fields/cookbook), пример [Оптовая цена](/components/minishop3/manager/examples/product-extra-field).
:::

### Галерея

Управление изображениями товара:

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

Типы связей из справочника `msLink`: `one_to_many`, `many_to_one`, `one_to_one`, `many_to_many`. Настройка типов: [Настройки → Связи](settings/links).

### Категории

<!-- ![Вкладка «Категории» на карточке товара](/components/minishop3/screenshots/mgr-product-categories.png) -->

Vue-вкладка `ProductCategoriesTab`. Дерево: `GET /api/mgr/product-data/{id}/categories/tree` (сервис `ms3_product_category_tree`). Выбранные id уходят в resource POST как hidden `name="categories"` (JSON). Родительская категория (`parent`) в дереве заблокирована. Товар может состоять в нескольких доп. категориях через `msCategoryMember`.

### Опции товара

Значения опций товара (настроенных в [Настройки → Опции](settings/options)).

::: info Начиная с v1.10.0-beta1
Вкладка полностью на Vue. Универсальный компонент `ProductOptionField` поддерживает все 10 типов опций: `textfield`, `numberfield`, `textarea`, `checkbox`, `comboBoolean`, `combobox`, `comboMultiple`, `comboColors` (+ цветовой квадрат рядом с значением), `comboOptions` (PrimeVue `InputChips` — ввод произвольных тегов с подсказками из ранее использованных значений), `datefield`.
:::

Опции группируются по `option_group_id` (`msOptionGroup`) и показываются в вертикальных табах слева. Если группа одна — таб не показывается, поля идут списком.

**Per-category caption / description.** Если у связки «опция ↔ категория» задан свой `caption` (см. [Настройки → Опции](settings/options#per-category-caption-description-override)), в форме товара отображается именно он — это тот же override, что уходит на витрину.

**Сохранение.** Значения попадают в POST как `options-{key}` (single) или `options-{key}` с JSON-массивом (multi). Процессор `MiniShop3\Processors\Product\Update` в `beforeSet` собирает всё в ключ `options`, `Utils::decodeOptionValue()` разворачивает JSON-массив, `afterSave` вызывает `OptionSyncService::saveProductOptions($productId, $options, removeOther: true)` — ключи, отсутствующие в POST, из `msProductOption` удаляются.

## Архитектура секций и полей

### Хранение данных

Конфигурация полей хранится в базе данных:

| Таблица | Описание |
| --- | --- |
| `ms3_page_sections` | Секции (разделы) страницы |
| `ms3_product_fields` | Поля товара с настройками |

### Модель msPageSection

Секция — это контейнер для группировки полей.

**Поля модели:**

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | int | ID секции |
| `page_key` | string | Ключ страницы (`product_data`) |
| `section_key` | string | Уникальный ключ секции |
| `lexicon_key` | string | Ключ лексикона для названия |
| `label` | string | Название (если без лексикона) |
| `hidden` | bool | Скрыта ли секция |
| `sort_order` | int | Порядок сортировки |

### Модель msProductField

Поле товара с настройками отображения.

**Поля модели:**

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
| `width` | int | Ширина в процентах |
| `config` | json | Дополнительные настройки |
| `is_system` | bool | Системное поле |
| `is_default` | bool | Поле по умолчанию |

## Управление секциями

### Создание секции

**Через интерфейс:**

1. Откройте **Утилиты → Поля товара**
2. Нажмите **"Добавить секцию"**
3. Заполните:
   - **Ключ секции** — уникальный идентификатор (латиница, например `seo`)
   - **Ключ лексикона** — для многоязычных названий (например `ms3_section_seo`)
   - **Название** — отображаемое название
4. Сохраните

**Через API** (1.13.x: отдельного POST нет; UI добавляет секцию локально и сохраняет список):

```
PUT /api/mgr/config/sections/product_data
```

```json
{
  "sections": [
    {
      "section_key": "seo",
      "lexicon_key": "ms3_section_seo",
      "label": "SEO",
      "hidden": false,
      "sort_order": 100
    }
  ]
}
```

Право записи: `mssetting_save`.

### Редактирование секции

1. Кликните на иконку редактирования рядом с секцией
2. Измените параметры
3. Сохраните

### Удаление секции

::: warning Внимание
При удалении секции все её поля перемещаются в раздел "Без секции" (section = 0).
:::

### Сортировка секций

Перетащите секции в нужном порядке в левой панели.

## Управление полями

### Добавление нового поля

Новые поля добавляются через [Утилиты → Дополнительные поля](utilities/extra-fields). Это создаёт:

1. Колонку в таблице `ms3_product_data`
2. Запись в `ms3_product_fields`

### Настройка существующего поля

**Через интерфейс:**

1. Откройте **Утилиты → Поля товара**
2. Выберите секцию
3. Кликните на поле для редактирования
4. Настройте параметры:

| Параметр | Описание |
| --- | --- |
| Название | Отображаемый label |
| Описание | Подсказка под полем |
| Секция | Принадлежность к секции |
| Тип виджета | Тип элемента формы |
| Видимость | Показывать/скрывать |
| Ширина | Ширина в % (50 = половина) |

**Через API:**

```
PUT /api/mgr/config/page-fields/product_data
```

```json
{
  "name": "article",
  "label": "Артикул товара",
  "section": 1,
  "visible": true,
  "sort_order": 0,
  "width": 50
}
```

### Перемещение поля между секциями

1. Откройте редактирование поля
2. Выберите новую секцию в выпадающем списке
3. Сохраните

Или измените `section` через API.

### Сортировка полей

Перетащите поля в нужном порядке внутри секции.

### Скрытие поля

1. Откройте редактирование поля
2. Снимите флаг "Видимость"
3. Сохраните

Поле останется в базе данных, но не будет отображаться в карточке товара.

## Типы виджетов (xtype)

### Стандартные

| Тип | Описание | Использование |
| --- | --- | --- |
| `textfield` | Однострочное текстовое поле | Артикул, название |
| `numberfield` | Числовое поле | Цена, вес |
| `textarea` | Многострочное поле | Описание |
| `xcheckbox` | Флажок | new, popular, favorite |

### Комбобоксы MiniShop3

| Тип | Описание |
| --- | --- |
| `ms3-combo-vendor` | Выбор производителя |
| `ms3-combo-category` | Выбор категории |
| `ms3-combo-autocomplete` | Автодополнение из списка |
| `ms3-combo-options` | Выбор из значений опций |

### Расширенные

| Тип | Описание |
| --- | --- |
| `modx-combo-browser` | Выбор файла через Media Browser |
| `datefield` | Выбор даты |
| `timefield` | Выбор времени |
| `htmleditor` | WYSIWYG редактор |

## Системные настройки

| Настройка | Описание | По умолчанию |
| --- | --- | --- |
| `ms3_product_tab_extra` | Показывать вкладку данных | `true` |
| `ms3_product_tab_gallery` | Показывать вкладку галереи | `true` |
| `ms3_product_tab_links` | Показывать вкладку связей | `true` |
| `ms3_product_tab_options` | Показывать вкладку опций | `true` |
| `ms3_product_tab_categories` | Показывать вкладку категорий | `true` |
| `ms3_product_remember_tabs` | Запоминать активную вкладку | `true` |
| `ms3_product_main_fields` | Поля вкладки "Документ" | pagetitle, longtitle, ... |
| `ms3_product_extra_fields` | Дополнительные поля | price, article, ... |

## API Endpoints

### Конфигурация полей

**Получить все поля:**

```
GET /api/mgr/config/page-fields/product_data
```

**Ответ:**

```json
{
  "success": true,
  "object": {
    "fields": [
      {
        "name": "article",
        "label": "Артикул",
        "xtype": "textfield",
        "section": 1,
        "visible": true,
        "sort_order": 0,
        "width": 50
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

**Сохранить поля** (тело — массив `fields`):

```
PUT /api/mgr/config/page-fields/product_data
```

```json
{
  "fields": [
    {
      "name": "article",
      "label": "Артикул",
      "section": 1,
      "visible": true,
      "sort_order": 0
    }
  ]
}
```

### Секции

**Получить секции:**

```
GET /api/mgr/config/sections/product_data
```

**Сохранить секции** (создание и порядок — через bulk PUT):

```
PUT /api/mgr/config/sections/product_data
```

```json
{
  "sections": [
    {
      "section_key": "seo",
      "label": "SEO",
      "hidden": false,
      "sort_order": 100
    }
  ]
}
```

**Удалить секцию** (по `section_key`, не по id):

```
DELETE /api/mgr/config/sections/product_data/{section_key}
```

### Данные товара

**Получить данные:**

```
GET /api/mgr/product-data/{product_id}
```

**Сохранить данные:**

```
PUT /api/mgr/product-data/{product_id}
```

## Примеры настройки

### Создание секции "SEO"

1. Создайте секцию:
   - Ключ: `seo`
   - Название: `SEO`

2. Добавьте лексикон (опционально):

```php
// lexicon/ru/product.inc.php
$_lang['ms3_section_seo'] = 'SEO';

// lexicon/en/product.inc.php
$_lang['ms3_section_seo'] = 'SEO';
```

1. Переместите поля `longtitle` и `description` в секцию SEO

### Скрытие ненужных полей

Для магазина одежды с опциями (цвет, размер отдельно):

1. Откройте поле `color`
2. Снимите "Видимость"
3. Повторите для `size`

### Изменение ширины полей

Сделать поле `article` на всю ширину:

1. Откройте редактирование поля
2. Установите ширину `100`
3. Сохраните

Два поля в ряд — установите каждому ширину `50`.

### Добавление кастомного поля

1. Откройте **Утилиты → Дополнительные поля**
2. Выберите модель `msProductData`
3. Создайте поле:
   - Имя: `warranty_months`
   - Тип: `INT`
   - xtype: `numberfield`
4. Сохраните (создастся колонка в БД)
5. Откройте **Утилиты → Поля товара**
6. Переместите поле в нужную секцию
7. Настройте label и описание

## Расширение через плагины

### Событие msOnManagerCustomCssJs

Позволяет добавить свой CSS/JS на страницу товара:

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

### Расширение Vue компонента

Через Plugin Registry можно добавить свои виджеты:

```javascript
// assets/components/mycomponent/js/product.js

document.addEventListener('DOMContentLoaded', () => {
  if (window.MS3PluginRegistry) {
    // Регистрация кастомного xtype
    MS3PluginRegistry.registerWidget('my-custom-field', {
      component: MyCustomFieldComponent,
      props: ['field', 'modelValue']
    })
  }
})
```

## Связанные страницы

- [Утилиты: Поля товара](utilities/product-fields) — настройка отображения полей
- [Утилиты: Дополнительные поля](utilities/extra-fields) — создание новых полей
- [Утилиты: Поля модели](utilities/model-fields) — управление полями из БД
- [Галерея товара](gallery) — система изображений
- [Системные настройки](../settings) — все настройки компонента
