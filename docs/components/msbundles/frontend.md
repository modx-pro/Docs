---
title: Вывод на сайте
description: Сниппет msBundles, чанки, CSS/JS и комплект в корзине miniShop3
---

# Вывод на сайте

Вызов сниппета, плейсхолдеры чанков, CSS/JS и комплект в корзине. Параметры: [Сниппеты](snippets/).

Требования:

1. `msBundles.initialize` в `<head>` — без него кнопки и стили не работают.
2. `selector` у `msCart` — иначе toast появится, а блок не обновится.

## Как выглядит карточка

![Карточка: Рабочее место](/components/msbundles/screenshots/storefront-desk.png)

![Карточка: Набор для путешествий](/components/msbundles/screenshots/storefront-travel.png)

![Карточка: qty=2](/components/msbundles/screenshots/storefront-travel-qty2.png)

![Карточка: Кухня (fixed + optional)](/components/msbundles/screenshots/storefront-kitchen.png)

## Готовая страница товара

::: code-group

```fenom
{extends 'file:templates/base.tpl'}

{block 'head'}
  {'!msBundles.initialize' | snippet}
{/block}

{block 'content'}
  <h1>{$_modx->resource.pagetitle}</h1>

  {'!msBundles' | snippet : [
    'product' => $_modx->resource.id,
    'tpl' => 'tplMsBundlesItem',
    'wrapperTpl' => 'tplMsBundlesList',
    'emptyTpl' => 'tplMsBundlesEmpty',
    'activeOnly' => true,
    'quantity' => 1
  ]}

  <section id="ms-cart" data-ms-cart aria-live="polite">
    {'!msCart' | snippet : [
      'tpl' => 'tpl.msCart',
      'return' => 'tpl',
      'selector' => '#ms-cart'
    ]}
  </section>
{/block}
```

```modx
[[!msBundles.initialize]]

[[!msBundles?
  &product=`[[*id]]`
  &tpl=`tplMsBundlesItem`
  &wrapperTpl=`tplMsBundlesList`
  &emptyTpl=`tplMsBundlesEmpty`
  &activeOnly=`1`
  &quantity=`1`
]]

<div id="ms-cart" data-ms-cart aria-live="polite">
  [[!msCart?
    &tpl=`tpl.msCart`
    &return=`tpl`
    &selector=`#ms-cart`
  ]]
</div>
```

:::

## Хук в tplMsCart {#хук-в-tplmscart}

В `tpl.msCart`: `tplMsBundlesCartInfo`.

## Логика выбора

Сниппет, REST и корзина учитывают **текущий контекст**. Комплект с другим `context_key` не появится.

1. `bundle` > 0 — один комплект по ID. Неактивный при `activeOnly=1` или чужой контекст → пусто.
2. `bundles` — комплекты по списку ID (порядок как в параметре).
3. `list=all` — все комплекты контекста.
4. `product` > 0 — комплекты с этим товаром.
5. Иначе — `emptyTpl`.

При `msbundles_stock_behavior=hide` и недоступном остатке карточка не выводится. Режимы `block` / `message` показывают карточку с `--blocked` / `--warning`.

### Страница каталога

<!-- MEDIA: Страница каталога/лендинга со списком из нескольких карточек комплектов (bundles='5,8,12' или list=all) -->

Несколько карточек по списку ID:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'bundles' => '5,8,12',
  'wrapperTpl' => 'tplMsBundlesList',
  'tpl' => 'tplMsBundlesItem'
]}
{'!msBundles.initialize' | snippet}
```

```modx
[[!msBundles?
  &bundles=`5,8,12`
  &wrapperTpl=`tplMsBundlesList`
  &tpl=`tplMsBundlesItem`
]]
[[!msBundles.initialize]]
```

:::

Все комплекты контекста:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'list' => 'all',
  'wrapperTpl' => 'tplMsBundlesList'
]}
{'!msBundles.initialize' | snippet}
```

```modx
[[!msBundles?
  &list=`all`
  &wrapperTpl=`tplMsBundlesList`
]]
[[!msBundles.initialize]]
```

:::

## Тема сайта (CSS)

Переопределите токены на `.msbundles` (или `:root`):

```css
.msbundles {
  --msbundles-color-accent: #your-brand;
  --msbundles-color-accent-hover: #your-brand-dark;
  --msbundles-color-text: #111827;
  --msbundles-color-muted: #6b7280;
  --msbundles-color-border: #e5e7eb;
  --msbundles-color-surface: #fff;
  --msbundles-radius: 0.5rem;
}
```

| Переменная | Назначение |
| --- | --- |
| `--msbundles-color-accent` | Акцент: ссылки, кнопка, бейджи |
| `--msbundles-color-accent-hover` | Hover / active |
| `--msbundles-color-text` | Текст |
| `--msbundles-color-muted` | Вторичный текст |
| `--msbundles-color-border` | Рамки |
| `--msbundles-color-surface` | Фон |
| `--msbundles-radius` | Скругление |

Другие токены в `msbundles.css`: `--msbundles-space-*`, `--msbundles-font-*`, `--msbundles-color-savings`, `--msbundles-color-free*`, `--msbundles-color-warning*`, `--msbundles-color-danger*`, `--msbundles-shadow-sm`, `--msbundles-focus-ring`.

### Полная таблица CSS-переменных

| Переменная | Назначение | По умолчанию |
| --- | --- | --- |
| `--msbundles-color-accent` | Акцент: ссылки, кнопка, бейджи | `#2563eb` |
| `--msbundles-color-accent-hover` | Hover / active для акцента | `#1d4ed8` |
| `--msbundles-color-text` | Основной текст | `#111827` |
| `--msbundles-color-muted` | Вторичный текст | `#6b7280` |
| `--msbundles-color-border` | Рамки и разделители | `#e5e7eb` |
| `--msbundles-color-surface` | Фон карточки | `#fff` |
| `--msbundles-color-savings` | Бейдж экономии (зелёный) | `#16a34a` |
| `--msbundles-color-free` | Бейдж «бесплатно» | `#2563eb` |
| `--msbundles-color-warning` | Предупреждения (жёлтый) | `#ca8a04` |
| `--msbundles-color-warning-bg` | Фон предупреждений | `#fef9c3` |
| `--msbundles-color-danger` | Ошибки, нет остатка (красный) | `#dc2626` |
| `--msbundles-color-danger-bg` | Фон ошибок | `#fee2e2` |
| `--msbundles-radius` | Скругление углов | `0.5rem` |
| `--msbundles-shadow-sm` | Тень карточки | `0 1px 2px rgba(0,0,0,0.05)` |
| `--msbundles-focus-ring` | Обводка фокуса | `0 0 0 3px rgba(37,99,235,0.2)` |
| `--msbundles-font-family` | Шрифт | `inherit` |
| `--msbundles-font-size` | Размер шрифта | `1rem` |
| `--msbundles-space-1` | Отступ 0.25rem | `0.25rem` |
| `--msbundles-space-2` | Отступ 0.5rem | `0.5rem` |
| `--msbundles-space-3` | Отступ 0.75rem | `0.75rem` |
| `--msbundles-space-4` | Отступ 1rem | `1rem` |
| `--msbundles-space-5` | Отступ 1.25rem | `1.25rem` |
| `--msbundles-space-6` | Отступ 1.5rem | `1.5rem` |

## Плейсхолдеры карточки (`tplMsBundlesItem`)

| Плейсхолдер | Описание |
| --- | --- |
| `id` | ID комплекта |
| `name` | Название |
| `description` | Описание |
| `image`, `image_url` | URL изображения |
| `image_html` | Блок `<div class="msbundles__media">…</div>` или пусто |
| `has_image` | `0` / `1` — есть изображение |
| `active` | `0` / `1` — активен |
| `quantity` | Число комплектов |
| `item_count` | Сумма единиц в составе |
| `product_count` | Число позиций |
| `products` | HTML строк состава |
| `composition_html` | Секция «Состав» или пусто |
| `price_html` | Цена, зачёркнутая, экономия. При `0` — «Бесплатно» |
| `total` | Итог (число) |
| `original_total` | Сумма по оригинальным ценам |
| `savings` | Экономия (число) |
| `total_formatted` | Итог с валютой или «Бесплатно» |
| `original_total_formatted` | Оригинал с валютой |
| `savings_formatted` | Экономия с валютой |
| `available` | `0` / `1` — можно заказать |
| `stock_message` | Сообщение об остатках |
| `state_modifier` | `msbundles__item--available` / `--warning` / `--blocked` |
| `stock_behavior` | `block`, `message`, `hide` |
| `max_bundle_quantity` | Лимит поля «Комплектов» |

`tplMsBundlesList`: `items` — HTML карточек. Без `image` и при `imageFallback=1` берётся thumb первого товара.

## Плейсхолдеры строки состава (`tplMsBundlesProduct`)

Штатный чанк использует `{$product_id}`. В своём чанке для атрибутов как в каталоге MS3 можно дублировать `id` = `product_id`.

| Плейсхолдер | Описание |
| --- | --- |
| `product_id` | ID товара |
| `name` | Название |
| `name_html` | Название в ссылке или без неё |
| `article` | Артикул |
| `url` | URL товара |
| `image`, `image_url` | Thumb или картинка |
| `image_html` | Блок `<span class="msbundles__product-media">…</span>` или пусто |
| `quantity` | Единиц товара в составе |
| `bundle_quantity` | Число комплектов |
| `line_quantity` | `quantity × bundle_quantity` |
| `required` | `0` / `1` — обязательная позиция |
| `required_label` | «Обязательно» / «Необязательно» |
| `price_mode` | `original`, `fixed`, `discount_percent`, `discount_amount`, `free` |
| `is_free` | `0` / `1` — цена строки `0` |
| `unit_price` | Цена единицы с учётом режима |
| `unit_price_formatted` | Цена с валютой или «Бесплатно» |
| `unit_price_html` | `<span class="msbundles__price">…</span>` |
| `original_unit_price` | Оригинальная цена единицы |
| `original_unit_price_formatted` | Оригинал с валютой |
| `original_price_html` | Зачёркнутая цена или пусто |
| `line_total` | Итог строки |
| `line_total_formatted` | Итог с валютой или «Бесплатно» |

## Кастомный чанк карточки

Классы (`msbundles__*`) — для стилей. JS ищет узлы по **data-атрибутам**.

```fenom
<article
  data-msbundles="item"
  data-ms-bundle="{$id}"
  data-ms-bundle-available="{$available}"
>
  <h3>{$name}</h3>
  <div data-msbundles="summary">
    <p data-msbundles="price">{$price_html}</p>
    <span data-msbundles="product-count">{$product_count}</span>
  </div>
  <p data-msbundles="stock" role="status">{$stock_message}</p>
  <div data-msbundles="controls">
    <button type="button" data-msbundles-action="qty-dec" data-ms-bundle="{$id}">−</button>
    <input type="number" data-bundle-quantity data-ms-bundle="{$id}" value="{$quantity}" min="1" />
    <button type="button" data-msbundles-action="qty-inc" data-ms-bundle="{$id}">+</button>
    <button type="button" data-msbundles-action="add-bundle" data-ms-bundle="{$id}">
      {'msbundles.add_bundle' | lexicon}
    </button>
  </div>
</article>
```

При смене qty `calculate` обновляет `[data-msbundles="price"]` и `[data-msbundles="stock"]`.

### Data-атрибуты витрины

| Атрибут | Где | Назначение |
| --- | --- | --- |
| `data-msbundles="list"` | обёртка списка | Корень списка |
| `data-msbundles="item"` | карточка | Корень карточки |
| `data-ms-bundle` | карточка / контролы | ID комплекта |
| `data-ms-bundle-available` | карточка | `1` / `0` после calculate |
| `data-ms-bundle-stock` | карточка | `available` / `warning` / `blocked` |
| `data-msbundles="summary"` | блок итога | Якорь для stock-сообщения |
| `data-msbundles="price"` | строка цены | Замена HTML после calculate |
| `data-msbundles="product-count"` | число позиций | Мета |
| `data-msbundles="stock"` | сообщение остатка | Ошибки и предупреждения |
| `data-msbundles="controls"` | qty + CTA | Группа действий |
| `data-bundle-quantity` | input | Значение «Комплектов» |
| `data-msbundles-action="qty-dec"` / `qty-inc` | кнопки | Степпер количества |
| `data-msbundles-action="add-bundle"` | кнопка | Добавление в корзину |
| `data-msbundles="product"` | строка состава | Позиция комплекта |
| `data-product-id` | строка состава | ID товара |
| `data-msbundles="product-price"` | цена позиции | Цена в составе |
| `data-msbundles="cart-info"` | блок в корзине | Lead/member метаданные |
| `data-bundle-hash` | cart-info / строка корзины | Связка строк комплекта |
| `data-bundle-lead` | cart-info / строка | `1` = lead |
| `data-msbundles="name"` | название в корзине | Имя для confirm/remove |
| `data-msbundles-action="remove-bundle"` | кнопка | Удаление комплекта |

Legacy `data-action` принимается. Классы можно менять: JS использует data-атрибуты.

## Подключение CSS и JS {#подключение-css-и-js}

Через сниппет:

::: code-group

```fenom
{'!msBundles.initialize' | snippet}
```

```modx
[[!msBundles.initialize]]
```

:::

Сниппет подключает `msbundles.css`, `msbundles-helpers.js`, `msbundles-cart.js`, `msbundles.js`. Выводит `window.msbundlesConfig` и `window.msbundlesLexicon`.

| Ключ | По умолчанию | Назначение |
| --- | --- | --- |
| `autoBind` | `true` | Автопривязка обработчиков |
| `apiBaseUrl` | `''` | Префикс API, если Router не на стандартном пути |
| `maxBundleQuantity` | из настройки | Лимит поля qty |
| `calculateDebounceMs` | `350` | Дебаунс пересчёта |
| `confirmRemoveBundle` | `false` | `confirm()` перед удалением |

Свой конфиг до вызова:

```html
<script>window.msbundlesConfig = { confirmRemoveBundle: true };</script>
```

«Удалить комплект» работает как обычный товар: `ms3.cartUI.handleRemove`, toast, плагин снимает остальные позиции. REST `/bundle/remove` — если нет ключа товара.

Add и remove требуют `ms3_token`.

## События JS

| Событие | Когда |
| --- | --- |
| `msbundles:before` | Перед calculate / add / remove |
| `msbundles:success` | Успешное add / remove |
| `msbundles:error` | Ошибка API |
| `msbundles:updated` | Пересчёт цены или изменение |

```html
<script>
document.addEventListener('msbundles:success', function (e) {
  console.log(e.detail.action, e.detail.result);
});
</script>
```

После add/remove: `ms3.message` и `MsBundles.refreshCart()`.

### Публичный API `window.MsBundles`

| Метод | Назначение |
| --- | --- |
| `bind` | Обработчики |
| `addBundle` | POST add |
| `removeBundle` | Удаление по `bundle_hash`, если обычный путь корзины недоступен |
| `calculate` | Пересчёт цены и остатков |
| `applyCalculateToCard` | Обновить цену на карточке |
| `enhanceCartDisplay` | Lead/member UI |
| `applyCartRenderFallback` | HTML, если MS3 не отдал `render` |
| `refreshCart` | GET `/api/v1/cart/get` с `render` и обновить блоки `msCart` |
| `request` | Низкоуровневый API |
| `events` | Имена событий |

## Комплект в корзине

<!-- MEDIA: Блок корзины miniShop3 с комплектом — главная строка с бейджем «Комплект» и кнопкой «Удалить комплект», вложенные строки с подписью «Входит в комплект…» и заблокированным количеством -->

Комплект — несколько строк miniShop3 с общим `bundle_hash`. Главная строка управляет количеством, остальные следуют. Кнопка «Удалить комплект» снимает весь набор.

Без `selector` у `msCart` toast появится, а блок не обновится. `selector` регистрирует блок в `ms3Config.render.cart`. После add/remove фронт запрашивает `/api/v1/cart/get`.

### Хук в `tpl.msCart`

Под названием товара:

```fenom
{if $product.options.msbundles?}
    {'tplMsBundlesCartInfo' | chunk : $product.options.msbundles}
{elseif $product.options.bundle_hash?}
    {'tplMsBundlesCartInfo' | chunk : [
        'id' => $product.options.bundle_id,
        'name' => $product.options.bundle_name,
        'hash' => $product.options.bundle_hash
    ]}
{/if}
```

На `<tr>` добавьте `data-bundle-hash` из options.

Цену со скидкой: актуальную в `msbundles-cart-price__now`, старую — в `msbundles-cart-price__was`.

### Плейсхолдеры `tplMsBundlesCartInfo`

| Плейсхолдер | Описание |
| --- | --- |
| `id` | ID комплекта |
| `name` | Название |
| `hash` | `bundle_hash` |
| `is_lead` | `1` у главной строки |
| `line_index` | Номер строки (`1` = главная) |
| `lines_count` | Позиций в комплекте |
| `quantity` | Число комплектов |

| Строка | Как понять | Что видит покупатель |
| --- | --- | --- |
| Главная | `is_lead=1` или `line_index=1` | Бейдж «Комплект», «Удалить комплект» |
| Остальные | тот же `bundle_hash` | «Входит в комплект…» |

Старые строки без `options.msbundles`: плагин на `msOnGetCart` помечает главную для бейджа.

### Что делает JS

`enhanceCartDisplay`:

- помечает строки атрибутами и классами
- прячет крестик у позиций комплекта
- блокирует количество у «вложенных» строк
- оставляет количество только у главной строки

При смене количества плагин (`msOnBeforeChangeInCart`) пересчитывает остальные.

При удалении строки: `ms3.cartUI.handleRemove`. Плагин (`msOnBeforeRemoveFromCart`) снимает остальные. REST `/bundle/remove` — если обычный путь недоступен. См. [События](/components/msbundles/events).

`msbundles.css` стилизует блок. Логика использует `data-msbundles` и `data-bundle-*`. Превью: `4rem` (`object-fit: cover`).

Без `tplMsBundlesCartInfo` бейдж и кнопка не появятся.

### Если корзина не обновляется

| Симптом | Что проверить |
| --- | --- |
| Toast есть, блок старый | Нет `selector` у `msCart` или id контейнера не совпадает |
| Нет бейджей | Нет `tplMsBundlesCartInfo` или `msOnGetCart` |
| Qty у member кликабелен | JS не загрузился или `enhanceCartDisplay` не вызван после ручной перерисовки |

## REST

База: `/api/v1/msbundles` через роутер miniShop3.

```text
/assets/components/minishop3/api.php?route=/api/v1/msbundles/…
```

Нужен `ms3_token`. Штатный `msbundles.js` ходит в маршруты сам.

Ответ:

```json
{
  "success": true,
  "message": "",
  "data": {},
  "errors": [],
  "warnings": []
}
```

Ошибка: HTTP 4xx, `success: false`, `data: null`.

### GET `/bundle/calculate`

Пересчёт цены и остатков.

Query: `id` или `bundle_id`, `quantity`.

Пример: `…/api.php?route=/api/v1/msbundles/bundle/calculate&id=5&quantity=2`

**data:** `{ "price": {…}, "stock": {…}, "quantity": N }`

| Поле | Описание |
| --- | --- |
| `total_formatted` | Итог с валютой или «Бесплатно» |
| `original_total_formatted` | Оригинал |
| `savings_formatted` | Экономия |
| `price_html` | HTML для `[data-msbundles="price"]` |

### POST `/bundle/add`

Добавить комплект. Лимит: `msbundles_max_bundle_quantity`.

Body:

```json
{
  "id": 5,
  "quantity": 2
}
```

Алиас: `bundle_id`.

**data:**

```json
{
  "bundle_hash": "a1b2c3…",
  "quantity": 2
}
```

Необязательные позиции с нулевым остатком могут уйти в `warnings`. Остальной комплект всё равно добавится.

### POST `/bundle/remove`

Удалить строки с `bundle_hash`.

Body:

```json
{
  "bundle_hash": "a1b2c3…"
}
```

Алиас: `hash`.

**data:**

```json
{
  "removed_count": 3,
  "bundle_hash": "a1b2c3…"
}
```

### GET `/bundle/get`

Карточка с ценой и остатками.

Query: `id` или `bundle_id`, `quantity` (по умолчанию `1`).

**data:** `{ "bundle": {…}, "price": {…}, "stock": {…}, "quantity": N }`

### Маршруты

| Метод | Путь | Описание |
| --- | --- | --- |
| `GET` | `/bundle/calculate` | Пересчёт цены |
| `POST` | `/bundle/add` | Добавление |
| `POST` | `/bundle/remove` | Удаление |
| `GET` | `/bundle/get` | Данные комплекта |
