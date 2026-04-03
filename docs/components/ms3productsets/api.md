---
title: API и интерфейсы
---
# API и интерфейсы

## Сниппет `ms3ProductSets`

### Ключевые параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `type` | `buy_together` | Тип подборки |
| `resource_id` / `productId` | текущий ресурс | ID базового товара |
| `max_items` | `ms3productsets.max_items` | Лимит (1..100) |
| `category_id` | `0` | Категория для авто-подбора |
| `set_id` | `0` | Номер VIP-набора (для `type=vip`). При 0 или не заданном используется 1 — настройка `ms3productsets.vip_set_1`. |
| `tpl` | `tplSetItem` | Чанк карточки |
| `emptyTpl` | `tplSetEmpty` | Чанк для пустого результата |
| `hideIfEmpty` | `true` | `true` -> пустая строка, `false` -> `emptyTpl` |
| `exclude_ids` | `''` | Исключаемые ID |
| `tplWrapper` | `''` | Обёртка с плейсхолдерами `output`, `type`, `count` |
| `sortby` / `sortdir` | `''` / `ASC` | Если `sortby` пуст, сохраняется порядок подборки |
| `showUnpublished` | `false` | Проброс в `msProducts` |
| `showHidden` | `false` | Проброс в `msProducts` |
| `includeTVs`, `includeThumbs`, `tvPrefix` | `''` | Проброс в `msProducts` |
| `return` | `data` | `data`, `ids`, `json` |
| `toPlaceholder` | `''` | Запись результата в placeholder |

### Поддерживаемые `type`

`auto`, `vip`, `cross-sell`, `popcorn`, `also-bought`, `buy_together`, `similar`, `cart_suggestion`, `auto_sales`, `custom`.

Подробная логика каждого типа — в [Типы подборок](types).

### Примеры вызова

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`similar`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
]]
```

:::

## Сниппет `mspsLexiconScript`

Выводит:

- `window.mspsLexicon` (ключи для фронтовых сообщений);
- `window.mspsConfig` (`maxItems`, `lang`).

Подключать перед `productsets.js`.

**Fenom:** `{'mspsLexiconScript' | snippet}`
**MODX:** `[[!mspsLexiconScript]]`

## Коннектор `assets/components/ms3productsets/connector.php`

### Front (`web`)

| action | Метод | Параметры | Ответ |
| --- | --- | --- | --- |
| `get_set` | POST | `type`, `resource_id`, `category_id`, `set_id`, `max_items`, `tpl`, `emptyTpl`, `hideIfEmpty` | HTML |
| `add_to_cart` | POST | `product_id`, `count` | JSON `{success,message}` |

### Manager (`mgr`, авторизация обязательна)

| action | Назначение | Основные параметры |
| --- | --- | --- |
| `get_templates` | Список шаблонов подборок | — |
| `save_template` | Создать/обновить шаблон | `id`, `name`, `type`, `related_product_ids`, `sortorder` |
| `delete_template` | Удалить шаблон | `id` |
| `apply_template` | Применить шаблон к категориям/товарам | `template_id`, `parent_id` или `parent_ids[]`, `replace` |
| `unbind_template` | Отвязать шаблон от категории | `template_id`, `parent_id` или `parent_ids[]` |
| `get_resource_tree` | Дерево категорий (без товаров) | `parent_id`, `context_key` |
| `get_resources` | Список товаров для пикера | `parent_id`, `template_id`, `query`, `limit` |

## JS API (`window.ms3ProductSets`)

| Метод | Назначение |
| --- | --- |
| `render(selector, options)` | Рендер блока подборки через `action=get_set` |
| `addToCart(productId, count)` | Добавление товара в корзину через `action=add_to_cart` |
| `addAllToCart(buttonOrContainer)` | Добавление всего набора в корзину. Принимает DOM-элемент (кнопку с `data-add-set` или контейнер) либо CSS-селектор. Ищет `[data-product-id]` и `[data-add-to-cart]` в контейнере, последовательно вызывает `addToCart` для каждого, затем toast и событие `msps:cart:update`. |
| `toast(message)` | Показ frontend-уведомления |

События после успешного добавления:

- `addToCart`: `msps:cart:update` с `detail: { product_id, count }`
- `addAllToCart`: `msps:cart:update` с `detail: { product_ids }`

## Плагины

| Плагин | Событие | Назначение |
| --- | --- | --- |
| `ms3productsets_sync_tv` | `OnDocFormSave` | Синхронизация TV подборок в таблицу `ms3_product_sets` |
| `ms3productsets_on_resource_delete` | `OnResourceDelete` | Очистка связей удаляемого ресурса |
