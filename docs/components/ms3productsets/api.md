---
title: API и интерфейсы
---
# API и интерфейсы

## Сниппет `ms3ProductSets`

### Минимальный рабочий вызов

::: code-group

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
]]
```

```fenom
{'!ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id
]}
```

:::

### Основные параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `type` | `buy_together` | Тип подборки |
| `resource_id` / `productId` | текущий ресурс | Базовый товар |
| `max_items` | `ms3productsets.max_items` | Лимит 1..100 |
| `category_id` | `0` | Категория для авто-режима |
| `set_id` | `0` | Номер VIP-набора (для `type=vip`). При 0 или не заданном используется 1 — настройка `ms3productsets.vip_set_1` |
| `tpl` | `tplSetItem` | Чанк карточки |
| `emptyTpl` | `tplSetEmpty` | Чанк пустого результата |
| `hideIfEmpty` | `true` | `true` → пустая строка, `false` → вывод `emptyTpl`. Корректно обрабатываются строки `"false"`, `"0"`, `"true"`, `"1"` |
| `exclude_ids` | `''` | Исключаемые ID (строка или массив) |
| `tplWrapper` | `''` | Обёртка (`output`, `type`, `count`) |
| `sortby` | `''` | Поле сортировки вывода (проброс в msProducts). Не задано — сохраняется порядок из подборки |
| `sortdir` | `ASC` | Направление сортировки (учитывается только при заданном `sortby`) |
| `showUnpublished` | `false` | Проброс в msProducts |
| `showHidden` | `false` | Проброс в msProducts |
| `showLog` | `false` | Проброс в msProducts (отладочный лог в контексте менеджера) |
| `tvPrefix` | `''` | Префикс для плейсхолдеров TV (проброс в msProducts) |
| `includeTVs` | `''` | Список TV через запятую (проброс в msProducts) |
| `includeThumbs` | `''` | Список размеров превью через запятую (проброс в msProducts) |
| `return` | `data` | `data`, `ids`, `json` |
| `toPlaceholder` | `''` | Запись в placeholder |

На результат сниппета также влияют системные настройки `ms3productsets.cache_lifetime` (кеш подборок) и `ms3productsets.auto_recommendation` (включение авто при пустой ручной подборке). То же при AJAX `action=get_set` — коннектор вызывает сниппет. Подробнее: [Системные настройки](settings).

Все типы и их fallback-логика: [Типы подборок](types).

## Сниппет `mspsLexiconScript`

Экспортирует:

- `window.mspsLexicon`
- `window.mspsConfig` (`maxItems`, `lang`)

Подключать перед `productsets.js`.

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
| `save_template` | Создать/обновить шаблон | `id`, `name`, `type`, `related_product_ids`, `description`, `sortorder` |
| `delete_template` | Удалить шаблон | `id` |
| `apply_template` | Применить шаблон к категориям/товарам | `template_id`, `parent_id` или `parent_ids[]` (несколько категорий), `product_ids` (опционально — к конкретным товарам), `replace` |
| `unbind_template` | Отвязать шаблон от категории | `template_id`, `parent_id` или `parent_ids[]` |
| `get_resource_tree` | Дерево категорий (без товаров) | `parent_id`, `context_key` |
| `get_resources` | Список товаров для пикера | `parent_id`, `template_id`, `query`, `limit` |

## JS API (`window.ms3ProductSets`)

| Метод | Назначение |
| --- | --- |
| `render(selector, options)` | Рендер блока через `action=get_set` |
| `addToCart(productId, count)` | Добавление товара в корзину через `action=add_to_cart` |
| `addAllToCart(buttonOrContainer)` | Добавление всего набора в корзину. Принимает DOM-элемент (кнопку с `data-add-set` или контейнер) либо CSS-селектор. Ищет в контейнере `[data-product-id]` и `[data-add-to-cart]`, последовательно вызывает `addToCart` для каждого ID, затем toast и событие `msps:cart:update`. |
| `toast(message)` | Показ frontend-уведомления |

События после успешного добавления:

- `addToCart`: `msps:cart:update` с `detail: { product_id, count }`
- `addAllToCart`: `msps:cart:update` с `detail: { product_ids }`
