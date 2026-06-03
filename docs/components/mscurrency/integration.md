---
title: Интеграция и сценарии
description: Переключатель, цены, корзина, заказ, товар в своей валюте, платёжки, cron
---

# Интеграция и сценарии

Практические сценарии для витрины MiniShop3. Примеры в двух синтаксисах: MODX-теги и Fenom.

| Тема | Раздел |
|------|--------|
| Переключатель и плейсхолдеры | [Переключатель валют](#переключатель-валют) |
| Карточка товара | [Цена на витрине](#цена-на-витрине) |
| Корзина и заказ | [Корзина и заказ](#корзина-и-заказ) |
| Цена в валюте товара | [Товар в своей валюте](#товар-в-своей-валюте) |
| Оплата | [Платёжные системы](#платёжные-системы) |
| Курсы | [Cron](#cron-курсов) |

## Переключатель валют

Выводится сниппетом [msCurrency](snippets/msCurrency). После выбора валюты плагин `mscurrency_frontend` заполняет плейсхолдеры:

| Плейсхолдер | Описание |
|-------------|----------|
| `msc.name` / `msmc.name` | Название валюты |
| `msc.code` / `msmc.code` | ISO-код (USD, EUR, RUB) |
| `msc.id` | ID записи в справочнике |
| `msc.symbol_left` / `msc.symbol_right` | Символы |
| `msc.base_id` | ID базовой валюты |
| `msc.val` | Эффективный курс (`rate × coefficient`) |

Для записи иностранной валюты при базе RUB поле `val` — **сколько рублей за 1 единицу** этой валюты (как у ЦБ: USD ≈ 88). Пересчёт на витрине: **база ÷ val** (40 ₽ → 40 ÷ 88 ≈ $0.45). Параметр `course` в `getPrice` / `msCurrencyPrice` — тот же делитель.

::: code-group

```fenom
{'!msCurrency' | snippet : ['tpl' => 'tpl.msCurrency']}
```

```modx
[[!msCurrency? &tpl=`tpl.msCurrency`]]
```

:::

Плейсхолдеры после выбора валюты:

| Назначение | MODX | Fenom |
|------------|------|-------|
| Код | `[[!+msc.code]]` | `{$_modx->getPlaceholder('msc.code')}` |
| Название | `[[!+msc.name]]` | `{$_modx->getPlaceholder('msc.name')}` |
| Курс | `[[!+msc.val]]` | `{$_modx->getPlaceholder('msc.val')}` |
| Символ слева / справа | `[[!+msc.symbol_left]]` / `[[!+msc.symbol_right]]` | `{$_modx->getPlaceholder('msc.symbol_left')}` / `{$_modx->getPlaceholder('msc.symbol_right')}` |

Дубли **`msmc.*`** — те же значения, что и **`msc.*`**.

## Цена на витрине

### Одна цена

Сниппет [msCurrencyPrice](snippets/msCurrencyPrice):

::: code-group

```fenom
{'!msCurrencyPrice' | snippet : ['price' => $price, 'pid' => $_modx->resource.id]}
```

```modx
[[!msCurrencyPrice?
  &price=`[[!+price]]`
  &pid=`[[*id]]`
]]
```

:::

Если передать только `pid` без `price`, база берётся из поля `price` товара или из `msc_price` с пересчётом в базовую валюту.

### Все активные валюты

Сниппет [msCurrencyPrices](snippets/msCurrencyPrices) — удобно для таблицы «USD / EUR / RUB» на карточке:

::: code-group

```fenom
{'!msCurrencyPrices' | snippet : ['tpl' => 'tpl.msCurrencyPrices', 'pid' => $_modx->resource.id]}
```

```modx
[[!msCurrencyPrices?
  &tpl=`tpl.msCurrencyPrices`
  &pid=`[[*id]]`
]]
```

:::

## Корзина и заказ

Обёртки [msCurrencyCart](snippets/msCurrencyCart) и [msCurrencyGetOrder](snippets/msCurrencyGetOrder) нужны при `mscurrency_order_price_mode=user`. Они готовят валюту и символы перед выводом стандартных сниппетов MS3.

В чанках корзины и заказа **не нужен** отдельный `msCurrencyPrice` в строке товара. При режиме `user` цены пересчитывает плагин на событии `msOnGetProductPrice`.

Плейсхолдер **`currency`** выставляется **до** рендера внутреннего сниппета. Его можно использовать в чанке `ms3_cart` / `ms3_get_order` даже без обёртки, если страницу открываете через `msCurrencyCart` / `msCurrencyGetOrder`.

**Символ валюты.** `ms3_cart` формирует `price_formatted` через `ms3->format->price()`. Перед рендером обёртки и на `OnLoadWebDocument` вызывается `msc_sync_ms3_price_symbol()`:

- при `user` — символы выбранной валюты (`msc.symbol_left` / `msc.symbol_right`);
- при `base` — символы **базовой** валюты, даже если на витрине выбран USD;
- в оформленном заказе — символы из снимка `properties.msc`.

::: code-group

```fenom
{'!msCurrencyCart' | snippet : ['tpl' => 'tpl.cartWrapper']}
{'!msCurrencyGetOrder' | snippet : ['tpl' => 'tpl.orderWrapper']}
```

```modx
[[!msCurrencyCart? &tpl=`tpl.cartWrapper`]]
[[!msCurrencyGetOrder? &tpl=`tpl.orderWrapper`]]
```

:::

В чанке-обёртке доступны код валюты и HTML внутреннего сниппета:

| Плейсхолдер | MODX | Fenom |
|-------------|------|-------|
| Код валюты | `[[+currency]]` | `{$currency}` |
| HTML корзины / заказа | `[[+output]]` | `{$output}` |

Пример чанка-обёртки `tpl.cartWrapper` / `tpl.orderWrapper`:

::: code-group

```fenom
<div data-currency="{$currency}">
  {$output}
</div>
```

```modx
<div data-currency="[[+currency]]">
  [[+output]]
</div>
```

:::

### Чанк корзины (строка товара)

Страницу корзины вызывайте через **`msCurrencyCart`** (или тот же `ms3_cart`, если `currency` уже выставлен обёрткой). В **внутреннем** чанке MS3 в цикле по позициям поля MiniShop3 уже в нужной валюте при `mscurrency_order_price_mode=user`.

**Рекомендуется** — стандартные поля MS3, без сниппета в строке:

::: code-group

```fenom
{$product.price_formatted}
{if $product.old_price?}
  <span class="old_price">{$product.old_price_formatted}</span>
{/if}
```

```modx
[[+price_formatted]]
[[+old_price_formatted]]
```

:::

`old_price_formatted` выводите только если старая цена не пустая (как в штатном чанке MS3).

**Запасной вариант** — ручная конвертация в нестандартном чанке или каталоге:

| Было | msCurrency |
|------|------------|
| Сниппет цены с `&price=` | `[[!msCurrencyPrice? &price=`…` &format=`1`]]` / `{'!msCurrencyPrice' \| snippet : ['price' => …, 'format' => 1]}` |
| `[[!+msmc.symbol_right]]` | `[[!+msc.symbol_right]]` или дубль `[[!+msmc.symbol_right]]` |

При `format=1` сниппет уже форматирует число по MS3. **Не добавляйте** `symbol_right` после вывода — символ может продублироваться. Если символы ставите вручную, используйте `format=0` и `msc.symbol_left` / `msc.symbol_right`.

Старая цена в строке (запасной вариант, Fenom):

```fenom
{if $product.old_price?}
  <span class="old_price">
    {'!msCurrencyPrice' | snippet : ['price' => $product.old_price, 'format' => 1]}
  </span>
{/if}
```

Для заказа (`msCurrencyGetOrder` / чанк `ms3_get_order`) в строках позиций те же плейсхолдеры. Код и символы снимка: `properties.msc` / `properties.msmc`.

### Снимок валюты в заказе

После оформления в `properties` заказа:

::: code-group

```fenom
{$order.properties.msc.code}
{$order.properties.msc.symbol_left}
{$order.properties.msc.symbol_right}
{$order.properties.msc.val}
```

```modx
[[+properties.msc.code]]
[[+properties.msc.symbol_left]]
[[+properties.msc.symbol_right]]
[[+properties.msc.val]]
```

:::

Дублирующий ключ **`msmc`** — те же поля (`{$order.properties.msmc.symbol_left}` и т.д.). Снимок пишет `MscOrderSubmitHandler` через `core/config/ms3.services.d/50-mscurrency.php` и плагин `mscurrency_order_snapshot` на `msOnCreateOrder` / `msOnSubmitOrder`.

## Товар в своей валюте

В карточке товара MS3 (вкладка **Свойства**, секция **«Валюта»**):

| Поле | Назначение |
|------|------------|
| `currency_id` | Валюта, в которой задана цена (список из справочника msCurrency) |
| `msc_price` | Цена в этой валюте |
| `msc_old_price` | Старая цена в этой валюте |

Поле **Цена** в секции «Цены» (`price`) хранится в **базовой** валюте. Плагин `mscurrency_product_save` пересчитывает `price` и `old_price` из `msc_*` при сохранении документа.

Под полем `msc_price` в админке сразу показывается пересчёт в базовую валюту (например `620.19 ₽`). Скрипт `product-form.js` синхронизирует поле «Цена» вверху формы. Плагин `mscurrency_product_mgr` подключает форму на карточке товара (`msOnManagerCustomCssJs`).

После установки или обновления пакета резолвер синхронизирует extra fields и `ms3_product_fields`. Колонки `currency_id`, `msc_price`, `msc_old_price` можно вывести в сетке категории через `ms3_category_grid_fields`.

Если вместо подписи «Валюта» видны ключи лексикона — выполните синхронизацию полей (см. [FAQ](faq#ключи-лексикона-в-карточке-товара)).

Если в карточке **«Цена» = 0**, а в категории цена верная: в `ms3_extra_fields` поля уже есть, но колонки не созданы в `ms3_products`. Повторите `mscurrency_sync_product_fields($modx)` (с 1.0.x создаёт недостающие колонки). Проверка: `SHOW COLUMNS FROM ms3_products LIKE 'msc_%';`. API `GET /api/mgr/product-data/{id}` должен отдавать реальный `price`.

## getPrice в PHP

```php
$msc = msc_get_service($modx);
if ($msc !== null) {
    // price, productId, currencyId, course, isFormat
    $display = $msc->getPrice(1000.0, $productId, 0, 0.0, true);
}
```

| Аргумент | Описание |
|----------|----------|
| `$price` | Сумма в **базовой** валюте. При `0` и переданном `$productId` — из `price` или из `msc_price` с пересчётом в базу |
| `$productId` | ID товара (`msProduct`). По умолчанию `0` |
| `$currencyId` | `0` — валюта покупателя (сессия / настройка контекста) |
| `$course` | Ручной делитель. При `> 0` сразу `$price / $course`. `0` — деление на `val` валюты |
| `$isFormat` | `true` — строка по `ms3_price_format`. `false` — число |

Сниппет-обёртка: параметр `format` = `$isFormat`.

После конвертации срабатывает событие **`mscOnGetPrice`** (`price`, `newPrice`, `currencyId`, `course`).

## Платёжные системы

При оформлении в `properties` сохраняется снимок валюты: **`msc`** (и дубль **`msmc`**). Поле **`code`** — ISO-код (USD, EUR, RUB).

### Плагин mscurrency_payment_currency

1. Включите плагин **mscurrency_payment_currency** (событие `msOnChangeOrderStatus`).
2. В настройках namespace `mscurrency` укажите:

| Ключ | Пример | Назначение |
|------|--------|------------|
| `mscurrency_payment_currency_option` | `ms2_payment_unitpay_currency` | Имя системной опции MODX, куда записать код валюты при смене статуса |

При смене статуса плагин вызывает `$modx->setOption(...)` с кодом из `properties.msc.code` или `properties.msmc.code`. Если настройка пустая, плагин ничего не меняет — можно записать код своим обработчиком.

### Свой код

```php
$properties = $order->get('properties');
$mscData = $modx->getOption('msc', $properties, $modx->getOption('msmc', $properties, []));
$currencyCode = is_array($mscData) ? (string) $modx->getOption('code', $mscData, '') : '';
if ($currencyCode !== '') {
    $modx->setOption('ms2_payment_unitpay_currency', $currencyCode);
}
```

В MS3 объект заказа в событии — **`msOrder`**.

## Cron курсов

```bash
php core/components/mscurrency/cron/sync_rates.php
# алиас:
php core/components/mscurrency/cron/course.php
```

Рекомендуется 1–4 раза в сутки. Котировки ЦБ обычно обновляются 1–2 раза в день, частые запросы могут упереться в лимиты API. Код выхода `1`, если в ответе синхронизации есть ошибки.

Тот же сценарий, что и кнопка **Синхронизировать курсы** в админке. Подробнее: [Управление валютами](manager#cron).

## Совместимость с другими дополнениями

Если другое дополнение меняет цену на витрине, проверьте цепочку с конвертацией. Плагин `mscurrency_product_price` на `msOnGetProductPrice` подставляет цену в валюте покупателя. Для своей логики используйте `getPrice()` или событие `mscOnGetPrice`.

**msPriceTiers**, **ms3Variants** и msCurrency можно использовать вместе. Сначала tier или вариант даёт базу в базовой валюте, потом msCurrency переводит её в валюту покупателя.

## См. также

- [mFilter](mfilter) — фильтр `currency_price`
- [События MODX](events)
- [Сниппеты](snippets/index)
