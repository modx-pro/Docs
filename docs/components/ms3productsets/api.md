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
| `max_items` | `10` | Лимит (1..100). Вызов без параметра берёт свойство сниппета `10`, не текущее `ms3productsets.max_items` |
| `category_id` | `0` | Категория для `msps_get_auto_recommendations`. На `similar` и SQL `auto_sales` не влияет |
| `set_id` | `0` | Номер VIP-набора (для `type=vip`). При 0 или не заданном используется 1 (`ms3productsets.vip_set_1`). |
| `tpl` | `tplSetItem` | Чанк карточки (`tplSetVIP` / `tplPopcorn` используют `itemTpl` для строки) |
| `itemTpl` | `''` | Чанк строки, если `tpl` это обёртка VIP/popcorn |
| `set_title` | `''` | Заголовок обёртки VIP |
| `discount_percent` | `0` | Бейдж обёртки VIP. При `0` бейдж скрыт |
| `showLog` | `false` | Проброс в `msProducts` |
| `emptyTpl` | `tplSetEmpty` | Чанк для пустого результата |
| `hideIfEmpty` | `true` | `true` -> пустая строка, `false` -> `emptyTpl` |
| `exclude_ids` | `''` | Исключаемые ID |
| `tplWrapper` | `''` | Обёртка с плейсхолдерами `output`, `type`, `count`, `product_ids` |
| `sortby` / `sortdir` | `''` / `ASC` | Если `sortby` пуст, сохраняется порядок подборки |
| `showUnpublished` | `false` | Проброс в `msProducts` |
| `showHidden` | `false` | Проброс в `msProducts` |
| `includeTVs`, `includeThumbs`, `tvPrefix` | `''` | Проброс в `msProducts` |
| `return` | `data` | `data`, `ids`, `json` |
| `toPlaceholder` | `''` | Запись результата в placeholder. В `msProducts` не передаётся |

Параметры вызова, которых нет среди свойств сниппета, уходят в `msProducts`. Обёртки VIP и popcorn тоже получают `product_ids`. VIP дополнительно получает `set_id`, `set_title` и `discount_percent`.

### Поддерживаемые `type`

`auto`, `vip`, `cross-sell`, `popcorn`, `also-bought`, `buy_together`, `similar`, `cart_suggestion`, `auto_sales`, `custom`.

Подробная логика каждого типа: [Типы подборок](types).

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

- при `ms3productsets.izitoast_include` = Да: теги `<link>` и `<script>` для [iziToast](https://github.com/marcosmoura/iziToast) по путям из `ms3productsets.izitoast_css` / `ms3productsets.izitoast_js` (по умолчанию файлы MiniShop3)
- `window.mspsLexicon` (ключи для сообщений на сайте)
- `window.mspsConfig`: `maxItems`, `lang`, `toastTimeout` (мс), `toastPosition` (iziToast, напр. `topRight`)

Подключайте перед `productsets.js`. Если автоподключение iziToast выключено, загрузите CSS и JS вручную. См. [Интеграция на сайт](integration).

**Fenom:** `{'mspsLexiconScript' | snippet}`
**MODX:** `[[!mspsLexiconScript]]`

## Коннектор `assets/components/ms3productsets/connector.php`

### Front (`web`)

| action | Метод | Параметры | Ответ |
| --- | --- | --- | --- |
| `get_set` | POST | `type`, `resource_id` (алиас `product_id`), `category_id`, `set_id`, `max_items`, `tpl`, `tplWrapper`, `emptyTpl`, `hideIfEmpty` | HTML |
| `add_to_cart` | POST | `product_id`, `count` | JSON `{success, added, message}` |

Пример ответа `add_to_cart` (запасной путь через коннектор):

`added` это boolean. `count` меньше 1 уходит в корзину как 1. Сообщение берётся из лексикона. Если ключа нет, успех отдаёт строку `Product added to cart`. Отказ корзины отдаёт `Could not add product to cart`. Запрос без `product_id` отдаёт строку `error`.

```json
{"success": true, "added": true, "message": "<msproductsets_added>"}
```

```json
{"success": false, "added": false, "message": "<msproductsets_error>"}
```

```json
{"success": false, "added": false, "message": "<msproductsets_add_failed>"}
```

Первый отказ это запрос без `product_id`. Второй это отказ корзины. Если в POST нет `max_items`, `get_set` берёт `ms3productsets.max_items`.

### Manager (`mgr`, авторизация обязательна)

| action | Назначение | Основные параметры |
| --- | --- | --- |
| `get_templates` | Список шаблонов подборок | — |
| `save_template` | Создать/обновить шаблон | `id`, `name`, `type`, `related_product_ids`, `description`, `sortorder`. Ошибки: `invalid_type`, `template_not_found`, `name_required`, `related_ids_required` |
| `delete_template` | Удалить шаблон и связи с его `template_name` | `id`. Ответ `{success}` без `message` |
| `apply_template` | Применить шаблон к категориям/товарам | `template_id`, `parent_id` или `parent_ids[]`, `replace`. `product_ids` берётся, если после разворота категорий ID нет, в том числе когда категория передана, но опубликованных товаров в ней нет. Разбор `product_ids` до 10000. Ответ `{ success, applied }`. Ошибки: `template_or_products_required`, `no_products_in_category`, `template_not_found`, `template_empty`. При `replace=true` удаляются только строки с тем же `template_name` |
| `unbind_template` | Отвязать шаблон от категории | `template_id`, `parent_id` или `parent_ids[]`. Ответ `{ success, removed }`. Ошибки: `template_or_products_required`, `no_products_in_category`, `template_not_found` |
| `get_resource_tree` | Дерево категорий (без товаров) | `parent_id`, `context_key`. Глубина не больше 5 |
| `get_resources` | Список товаров для пикера | `parent_id`, `template_id` (id шаблона MODX у ресурса, не id шаблона подборки), `query`, `limit` от 1 до 100, по умолчанию 50, **`ids[]`**. Без `parent_id` родитель не фильтруется. Только опубликованные неудалённые `msProduct`. Пикер запрашивает 200, сервер отдаёт не больше 100 |

Если у ошибки есть ключ лексикона `ms3productsets_<код>`, в `message` попадает перевод. Иначе остаётся код.

## JS API (`window.ms3ProductSets`)

| Метод | Назначение |
| --- | --- |
| `render(selector, options)` | Отрисовка блока через `get_set`. В JS значение `type` по умолчанию: `auto`. У сниппета: `buy_together`. |
| `addToCart(productId, count)` | Сначала MiniShop3 Web API. Коннектор `add_to_cart` это запасной путь. |
| `addAllToCart(buttonOrContainer)` | DOM-кнопка поднимается к `.msps__vip-set`, `.msps__wrapper` или `[data-set-type]`. Строка селектора ищется как контейнер. Она должна указывать на элемент с `data-msps-product-ids` или карточками, не на саму кнопку. Дальше `data-msps-product-ids`, затем `[data-product-id]` / `[data-add-to-cart]`, затем `input[name="id"]`. |
| `toast(message, kind)` | **iziToast**. `kind` `'error'` это ошибка. Любое другое значение, включая пустое, это success. |

События после успешного добавления:

- `addToCart`: `msps:cart:update` с `detail: { product_id, count }`. Путь MiniShop3 API дополнительно шлёт `ms3:cart:updated`.
- `addAllToCart`: `msps:cart:update` с `detail: { product_ids }`

## Плагины

| Плагин | Событие | Назначение |
| --- | --- | --- |
| `ms3ProductSets SyncTV` (файл `ms3productsets_sync_tv`) | `OnDocFormSave` | Синхронизация TV подборок в таблицу `ms3_product_sets` |
| `ms3ProductSets Cleanup` (файл `ms3productsets_on_resource_delete`) | `OnResourceDelete` | Очистка связей удаляемого ресурса |
