---
title: Вывод на сайте
description: Сниппет msBundles, чанки, CSS/JS и комплект в корзине miniShop3
---

# Вывод на сайте

Здесь собраны вызов сниппета, плейсхолдеры чанков, CSS/JS и разбор комплекта в корзине. Параметры сниппетов также разобраны в разделе [Сниппеты](snippets/).

Перед тем как копаться в чанках, проверьте два пункта:

1. В `<head>` есть `msBundles.initialize`. Иначе кнопки добавления и стили не заработают.
2. У `msCart` задан `selector`. Иначе после добавления вы увидите toast, а блок корзины на странице останется старым.

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

В `tpl.msCart` под названием позиции вызовите `tplMsBundlesCartInfo` (см. ниже).

## Логика выбора комплектов

1. `bundle` > 0 — один комплект по ID. Если он неактивен и `activeOnly=1`, результата нет.
2. Иначе `product` > 0 — комплекты, где товар в составе.
3. Если ничего не нашлось или оба параметра `0` — возвращается `emptyTpl`.

При `msbundles_stock_behavior=hide` и недоступном остатке карточка не выводится. Режимы `block` и `message` показывают карточку с модификаторами `--blocked` / `--warning`.

## Тема сайта (CSS-переменные)

Переопределите токены на `.msbundles` (или `:root`), чтобы карточки совпали с палитрой магазина:

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

| Переменная | За что отвечает |
| --- | --- |
| `--msbundles-color-accent` | Акцент: ссылки на товары, кнопка «Добавить», бейджи в корзине |
| `--msbundles-color-accent-hover` | Hover / active у акцентных кнопок и ссылок |
| `--msbundles-color-text` | Основной текст карточки и состава |
| `--msbundles-color-muted` | Вторичный текст: описание, артикул, подписи |
| `--msbundles-color-border` | Рамки карточки, строк состава, полей |
| `--msbundles-color-surface` | Фон карточки комплекта |
| `--msbundles-radius` | Скругление карточки, полей и кнопок |

Другие токены в `msbundles.css`: spacing (`--msbundles-space-*`), шрифты (`--msbundles-font-*`), экономия/бесплатно (`--msbundles-color-savings`, `--msbundles-color-free*`), предупреждения и ошибки (`--msbundles-color-warning*`, `--msbundles-color-danger*`), тень и focus-ring.

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
| `quantity` | Запрошенное число комплектов |
| `item_count` | Сумма единиц товаров в составе |
| `product_count` | Число позиций |
| `products` | HTML строк состава (`productTpl`) |
| `composition_html` | Секция «Состав» или пусто |
| `price_html` | Цена, зачёркнутая, экономия. При `0` — «Бесплатно» |
| `total` | Итог (число) |
| `original_total` | Сумма по оригинальным ценам |
| `savings` | Экономия (число) |
| `total_formatted` | Итог с валютой или «Бесплатно» |
| `original_total_formatted` | Оригинал с валютой |
| `savings_formatted` | Экономия с валютой |
| `available` | `0` / `1` — можно заказать |
| `stock_message` | Ошибка или предупреждение по остаткам |
| `state_modifier` | `msbundles__item--available` / `--warning` / `--blocked` |
| `stock_behavior` | `block`, `message`, `hide` |
| `max_bundle_quantity` | Лимит поля «Комплектов» |

`tplMsBundlesList`: плейсхолдер `items` — HTML карточек. Без `image` у комплекта и при `imageFallback=1` карточка берёт thumb первого товара состава.

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
| `quantity` | Единиц товара в составе одного комплекта |
| `bundle_quantity` | Запрошенное число комплектов |
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

Классы (`msbundles__*`) — только для стилей. JS ищет узлы по **data-атрибутам**.

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

Смена qty вызывает `calculate`: в `[data-msbundles="price"]` подставляется `price.price_html`, статус остатка — в `[data-msbundles="stock"]`.

### Data-атрибуты витрины (контракт JS)

| Атрибут | Где | Назначение |
| --- | --- | --- |
| `data-msbundles="list"` | обёртка списка | Корень списка комплектов |
| `data-msbundles="item"` | карточка | Корень карточки |
| `data-ms-bundle` | карточка / контролы | ID комплекта |
| `data-ms-bundle-available` | карточка | `1` / `0` после calculate |
| `data-ms-bundle-stock` | карточка | `available` / `warning` / `blocked` |
| `data-msbundles="summary"` | блок итога | Якорь для stock-сообщения |
| `data-msbundles="price"` | строка цены | Замена HTML после calculate |
| `data-msbundles="product-count"` | число позиций | Мета (серверный рендер) |
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

Legacy `data-action` с теми же значениями ещё принимается. В новых чанках используйте `data-msbundles-action`.

Классы `msbundles__*` / `msbundles-cart-*` можно менять в теме: JS на них не опирается (кроме опциональных modifiers вроде `--busy`, которые ставит сам скрипт).

## Подключение CSS и JS

Через сниппет (предпочтительно):

::: code-group

```fenom
{'!msBundles.initialize' | snippet}
```

```modx
[[!msBundles.initialize]]
```

:::

Сниппет подключает `msbundles.css`, затем скрипты по порядку: `msbundles-helpers.js` → `msbundles-cart.js` → `msbundles.js`. Перед скриптами выводит `window.msbundlesConfig` и `window.msbundlesLexicon`.

| Ключ конфига | По умолчанию | Назначение |
| --- | --- | --- |
| `autoBind` | `true` | Автопривязка обработчиков |
| `apiBaseUrl` | `''` | Префикс API, если Router не на дефолтном пути |
| `maxBundleQuantity` | из настройки | Лимит поля qty |
| `calculateDebounceMs` | `350` | Дебаунс пересчёта цены |
| `confirmRemoveBundle` | `false` | `confirm()` перед «Удалить комплект». По умолчанию без диалога, как у товара MS3 |

Свой конфиг до вызова сниппета:

```html
<script>window.msbundlesConfig = { confirmRemoveBundle: true };</script>
```

Кнопка «Удалить комплект» работает так же, как крестик у обычного товара: вызывается `ms3.cartUI.handleRemove`, показывается toast miniShop3, плагин снимает остальные позиции комплекта. Отдельный REST-запрос `/bundle/remove` нужен редко: только если у главной строки нет ключа товара для обычного удаления из корзины.

Add и remove требуют cookie `ms3_token`.

## События JS

| Событие | Когда |
| --- | --- |
| `msbundles:before` | Перед calculate / add / remove |
| `msbundles:success` | Успешное add / remove |
| `msbundles:error` | Ошибка API |
| `msbundles:updated` | Пересчёт цены или успешное изменение |

```html
<script>
document.addEventListener('msbundles:success', function (e) {
  console.log(e.detail.action, e.detail.result);
});
</script>
```

После add/remove: toast через `ms3.message` и перерисовка корзины через `MsBundles.refreshCart()`.

### Публичный API `window.MsBundles`

| Метод | Назначение |
| --- | --- |
| `bind` | Повесить обработчики на карточки и корзину |
| `addBundle` | POST add комплекта |
| `removeBundle` | Удаление по `bundle_hash`, если обычный путь корзины недоступен |
| `calculate` | Пересчёт цены и остатков |
| `applyCalculateToCard` | Обновить цену на карточке из ответа calculate |
| `enhanceCartDisplay` | Lead/member UI на уже отрисованной таблице |
| `applyCartRenderFallback` | Подставить HTML, если MS3 не отдал `render` |
| `refreshCart` | GET `/api/v1/cart/get` с `render` и обновить блоки `msCart` |
| `request` | Низкоуровневый вызов API |
| `events` | Имена DOM-событий |

## Комплект в корзине

Комплект лежит в корзине несколькими строками miniShop3. Их связывает общий `bundle_hash` в `options`. Главная строка управляет количеством. Остальные позиции комплекта следуют за ней. Одна кнопка «Удалить комплект» снимает весь набор.

Без `selector` у `msCart` toast после добавления появится, а HTML блока на странице останется старым. `selector` регистрирует блок в `ms3Config.render.cart`. После add/remove фронт запрашивает `/api/v1/cart/get` с токенами `render` и перерисовывает корзину.

### Хук в `tpl.msCart`

Под названием товара вызовите `tplMsBundlesCartInfo`:

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

На строку таблицы (`<tr>`) добавьте `data-bundle-hash` из options товара. Так JS понимает, какие строки относятся к одному комплекту.

Если в чанке корзины показываете цену со скидкой, оберните актуальную цену в `msbundles-cart-price__now`, а старую (зачёркнутую) в `msbundles-cart-price__was`. Штатный CSS подсветит их как «сейчас» и «было».

### Плейсхолдеры `tplMsBundlesCartInfo`

| Плейсхолдер | Описание |
| --- | --- |
| `id` | ID комплекта |
| `name` | Название комплекта |
| `hash` | Общий `bundle_hash` строк комплекта |
| `is_lead` | `1` у главной строки комплекта |
| `line_index` | Номер строки в комплекте (`1` = главная) |
| `lines_count` | Сколько позиций в комплекте |
| `quantity` | Сколько комплектов взял покупатель |

| Строка | Как понять | Что видит покупатель |
| --- | --- | --- |
| Главная | `is_lead=1` или `line_index=1` | Бейдж «Комплект», название, «Удалить комплект» |
| Остальные | остальные строки того же `bundle_hash` | Текст «Входит в комплект…» |

Если в корзине остались старые строки без блока `options.msbundles`, плагин на `msOnGetCart` сам помечает главную строку для бейджа. Ключ товара в корзине при этом не меняется.

### Что делает JS после отрисовки корзины

Скрипт `enhanceCartDisplay`:

- помечает строки комплекта атрибутами и классами оформления
- прячет крестик поштучного удаления у позиций комплекта
- блокирует поле количества у «вложенных» строк и пишет подсказку «Как в комплекте»
- оставляет поле количества только у главной строки

Когда покупатель меняет количество у главной строки, плагин miniShop3 (`msOnBeforeChangeInCart`) пересчитывает количество у остальных позиций того же комплекта.

Когда покупатель жмёт «Удалить комплект» или крестик у любой строки комплекта, срабатывает обычное удаление корзины miniShop3 (`ms3.cartUI.handleRemove`). Плагин (`msOnBeforeRemoveFromCart`) снимает остальные позиции набора. Отдельный REST `/bundle/remove` вызывается только если обычный путь корзины недоступен. См. [События](/components/msbundles/events).

`msbundles.css` стилизует только блок комплекта и служебные элементы количества/удаления. Логика ищет узлы по `data-msbundles` и `data-bundle-*`, а не по именам классов темы. В строках комплекта превью товаров ограничены квадратом `4rem` (`object-fit: cover`).

Если в своём чанке корзины не вызвать `tplMsBundlesCartInfo`, покупатель не увидит бейдж «Комплект», подпись «Входит в комплект…» и кнопку «Удалить комплект».

### Если корзина не обновляется

| Симптом | Что проверить |
| --- | --- |
| Toast есть, блок старый | Нет `selector` у `msCart` или id контейнера не совпадает |
| Нет бейджей | Нет `tplMsBundlesCartInfo` или у плагина нет `msOnGetCart` |
| Qty у member кликабелен | JS не загрузился или `enhanceCartDisplay` не вызван после ручной перерисовки |

## REST с витрины

База: `/api/v1/msbundles` через роутер miniShop3.

```text
/assets/components/minishop3/api.php?route=/api/v1/msbundles/…
```

Нужен токен miniShop3 (cookie `ms3_token` / middleware `TokenMiddleware`). Штатный `msbundles.js` ходит в эти маршруты сам. Ниже — если пишете свой фронт.

Ответ роутера:

```json
{
  "success": true,
  "message": "",
  "data": {},
  "errors": [],
  "warnings": []
}
```

При ошибке: HTTP 4xx, `success: false`, `data: null`.

### GET `/bundle/calculate`

Пересчёт цены и остатков (смена qty на карточке).

Query: `id` или `bundle_id`, `quantity`.

Пример: `…/api.php?route=/api/v1/msbundles/bundle/calculate&id=5&quantity=2`

**data:** `{ "price": {…}, "stock": {…}, "quantity": N }`

У `price` кроме чисел есть строки для карточки:

| Поле | Описание |
| --- | --- |
| `total_formatted` | Итог с валютой или «Бесплатно» |
| `original_total_formatted` | Оригинал |
| `savings_formatted` | Экономия |
| `price_html` | HTML для `[data-msbundles="price"]` на карточке |

### POST `/bundle/add`

Добавить комплект в корзину. Лимит qty: настройка `msbundles_max_bundle_quantity`.

Body (JSON):

```json
{
  "id": 5,
  "quantity": 2
}
```

Алиас ID: `bundle_id`.

**data при успехе:**

```json
{
  "bundle_hash": "a1b2c3…",
  "quantity": 2
}
```

Необязательные позиции с нулевым остатком могут уйти в `warnings` ответа. Остальной комплект всё равно добавится.

### POST `/bundle/remove`

Удалить все строки с данным `bundle_hash`.

Body (JSON):

```json
{
  "bundle_hash": "a1b2c3…"
}
```

Алиас: `hash`.

**data при успехе:**

```json
{
  "removed_count": 3,
  "bundle_hash": "a1b2c3…"
}
```

### GET `/bundle/get`

Карточка комплекта с ценой и остатками (без записи в корзину).

Query: `id` или `bundle_id`, опционально `quantity` (по умолчанию `1`).

**data:** `{ "bundle": {…}, "price": {…}, "stock": {…}, "quantity": N }`
