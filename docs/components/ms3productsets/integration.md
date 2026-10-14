---
title: Интеграция на сайт
---
# Интеграция на сайт

Как подключить сниппеты в Fenom и стандартном MODX и где проверить результат.

## 1. Подключение ресурсов (обязательно)

Уведомления корзины используют **[iziToast](https://github.com/marcosmoura/iziToast)**. Пути к локальным CSS и JS задаются системными настройками `ms3productsets` (относительно `[[++assets_url]]` или полный URL):

| Настройка | Назначение |
|-----------|------------|
| `ms3productsets.izitoast_include` | Вывод `<link>` и `<script>` для iziToast **внутри** сниппета `mspsLexiconScript`. По умолчанию **Да**. |
| `ms3productsets.izitoast_css` | Путь к CSS. По умолчанию файл из **MiniShop3**: `components/minishop3/css/web/lib/izitoast/iziToast.min.css`. Пустое значение: тег не выводится. |
| `ms3productsets.izitoast_js` | Путь к JS. По умолчанию: `components/minishop3/js/web/lib/izitoast/iziToast.js`. Пустое: тег не выводится. |

Если iziToast уже подключает шаблон (общая вёрстка MiniShop3), выключите `ms3productsets.izitoast_include`, чтобы не дублировать библиотеку.

В пакете те же файлы лежат в `assets/components/ms3productsets/vendor/izitoast/`. Укажите их в настройках, если не хотите опираться на пути MS3.

В шаблоне (или общем head/footer) подключите **сначала** лексикон, затем CSS и JS.

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js" defer></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js" defer></script>
```

:::

Порядок: **mspsLexiconScript** (при включённой настройке сначала iziToast, затем `window.mspsLexicon` / `window.mspsConfig`) **→ productsets.css → productsets.js**. Если на странице нет `iziToast`, в консоли будет предупреждение, уведомления не покажутся.

Переопределение через `window.mspsConfig` (до вызова `mspsLexiconScript` или в объекте, который мержится со сниппетом): `toastTimeout` (мс), `toastPosition` (например `topRight`, `bottomCenter`. См. документацию iziToast).

## 2. Блок в карточке товара: «С этим товаром покупают»

После вызова на карточке товара появляется блок рекомендаций. Если товаров нет, блок не выводится.

::: code-group

```fenom
{set $buyTogether = 'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
{if $buyTogether != ''}
<section class="product-set">
  <h2>{'ms3productsets_type_buy_together' | lexicon}</h2>
  {$buyTogether}
</section>
{/if}
```

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
  &toPlaceholder=`msps_buy_together`
]]
[[+msps_buy_together:notempty=`
<section class="product-set">
  <h2>[[%ms3productsets_type_buy_together? &namespace=`ms3productsets` &topic=`default`]]</h2>
  [[+msps_buy_together]]
</section>
`]]
```

:::

## 3. Авто-рекомендации по категории

Для главной страницы или лендинга, когда нужен блок из конкретной категории.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'auto',
  'category_id' => 5,
  'resource_id' => 0,
  'max_items' => 8,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`auto`
  &category_id=`5`
  &resource_id=`0`
  &max_items=`8`
  &tpl=`tplSetItem`
]]
```

:::

## 4. VIP-набор

1. Заполните системную настройку `ms3productsets.vip_set_1` (`1,2,3,...`).
2. Убедитесь, что товары опубликованы.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'vip',
  'set_id' => 1,
  'max_items' => 6,
  'tpl' => 'tplSetVIP'
]}
```

```modx
[[!ms3ProductSets?
  &type=`vip`
  &set_id=`1`
  &max_items=`6`
  &tpl=`tplSetVIP`
]]
```

:::

## 5. Пустой результат: скрыть блок или показать `emptyTpl`

По умолчанию `hideIfEmpty=true` и сниппет вернёт пустую строку.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'hideIfEmpty' => false,
  'emptyTpl' => 'tplSetEmpty'
]}
```

```modx
[[!ms3ProductSets?
  &type=`similar`
  &resource_id=`[[*id]]`
  &hideIfEmpty=`0`
  &emptyTpl=`tplSetEmpty`
]]
```

:::

## 6. AJAX-отрисовка блока (через JS API)

Логика `render()` одна и та же. В шаблоне отличаются подстановка `resource_id` и разметка контейнера.

::: code-group

```fenom
<div id="msps-auto"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.ms3ProductSets) {
    window.ms3ProductSets.render('#msps-auto', {
      type: 'auto',
      category_id: 5,
      resource_id: {$_modx->resource.id},
      max_items: 8,
      tpl: 'tplSetItem'
    });
  }
});
</script>
```

```modx
<div id="msps-auto"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.ms3ProductSets) {
    window.ms3ProductSets.render('#msps-auto', {
      type: 'auto',
      category_id: 5,
      resource_id: [[*id]],
      max_items: 8,
      tpl: 'tplSetItem'
    });
  }
});
</script>
```

:::

На страницах без текущего ресурса (главная и подобные) передайте `resource_id: 0` или не передавайте поле. См. [API](api).

## 7. Кнопка «В корзину» в карточке подборки

Текст кнопки берётся из лексикона MiniShop3 (`ms3_cart_add`), как в чанке **tplSetItem**.

::: code-group

```fenom
<button type="button" data-add-to-cart="{$id}" data-count="1">{'ms3_cart_add' | lexicon}</button>
```

```modx
<button type="button" data-add-to-cart="[[+id]]" data-count="1">[[%ms3_cart_add? &namespace=`minishop3` &topic=`default`]]</button>
```

:::

Штатный `tplSetItem` это форма MiniShop3 (`ms3_form`), не `data-add-to-cart`. Пример ниже свой. `productsets.js` сначала отправляет запрос в MiniShop3 Web API (`ms3Config.actionUrl`). Коннектор `add_to_cart` это запасной путь.

## 8. Кнопка «Добавить весь набор»

Кнопка с атрибутом `data-add-set` добавляет все товары подборки в корзину. Входит в чанки **tplSetVIP** и **tplSetWrapper** (при `count > 0`).

Чанки **tplSetVIP** / **tplSetWrapper** / **tplPopcorn** пишут `data-msps-product-ids`. JS берёт этот атрибут первым, затем карточки `[data-product-id]` / `[data-add-to-cart]`, затем `input[name="id"]`.

::: code-group

```fenom
<button type="button" data-add-set="1">
  {'msproductsets_add_all_to_cart' | lexicon}
</button>
```

```modx
<button type="button" data-add-set="1">
  [[%msproductsets_add_all_to_cart? &namespace=`ms3productsets` &topic=`default`]]
</button>
```

:::

Текст кнопки берите из лексикона компонента (`ms3productsets`, топик `default`), не храните в шаблоне явно.

## Чек-лист после внедрения

- На странице подключены `mspsLexiconScript`, `productsets.css`, `productsets.js`.
- Сниппет `ms3ProductSets` вызывается с корректным `resource_id` или `category_id`.
- Товары опубликованы и доступны в текущем контексте.
- Для типа `vip` задан `vip_set_1` или ручные связи в таблице подборок.
