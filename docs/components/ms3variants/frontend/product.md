---
title: Страница товара
---
# Страница товара

Как вывести варианты на странице товара и связать их с ценой, формой корзины и галереей.

## Вывод вариантов

```fenom
{'!msProductVariants' | snippet}
```

Сниппет выводит список вариантов по стандартным чанкам `ms3_variants` и `ms3_variants_row` и подключает `ms3variants.js` и `ms3variants.css` (параметры `includeJs`, `includeCss`). Вызов должен быть некэшируемым — почему, см. [Сниппеты](../snippets).

При загрузке страницы выбирается вариант, который покупатель выбирал раньше (хранится в `localStorage` под ключом `ms3v_selected_{ID товара}`), иначе первый в списке. Первым может оказаться и закончившийся вариант. Цена, артикул и другие данные на странице сразу заменяются данными выбранного варианта.

Готовый шаблон страницы товара с расставленными атрибутами лежит в файле `core/components/ms3variants/elements/templates/product_variants.tpl`. При установке он не создаётся как шаблон MODX — скопируйте его содержимое в свой шаблон.

## Своя разметка вариантов {#markup}

Свои чанки в параметрах `tpl` и `tplRow` работают, если в них есть атрибуты, которые читает JavaScript:

| Где | Атрибут | Обязателен | Что делает |
|-----|---------|------------|------------|
| Обёртка | `data-ms3v-init` | да | Запускает выбор вариантов |
| Обёртка | `id` | да | Любой уникальный. Без него запуск молча не происходит |
| Обёртка | `data-ms3v-product-id` | да | ID товара |
| Строка | `data-ms3v-variant` | да | ID варианта; клик по строке выбирает вариант |
| Строка | `data-variant-price`, `data-variant-old-price`, `data-variant-count`, `data-variant-sku`, `data-variant-weight` | нет | Данные, которые подставляются на страницу и в событие |
| Строка | `data-variant-file-id` | нет | ID изображения для переключения галереи. Стандартный чанк его не выводит |
| Строка | `<img>` внутри `.ms3-variant-image` | нет | URL изображения варианта |

Плейсхолдеры чанков перечислены на странице [Сниппеты](../snippets).

```fenom
{* tpl *}
<div id="ms3variants-{$product_id}" data-ms3v-init data-ms3v-product-id="{$product_id}">
    {$rows}
</div>

{* tplRow *}
<div data-ms3v-variant="{$id}" data-variant-price="{$price}" data-variant-file-id="{$file_id}">
    {$options_string} — {$price}
</div>
```

## Цена и артикул на странице {#page-fields}

При выборе варианта JavaScript обновляет на странице элементы с атрибутами `data-ms3v-*`:

| Атрибут | Что подставляется |
|---------|-------------------|
| `data-ms3v-price` | Цена варианта в формате из раздела [Формат цены](#price-format) |
| `data-ms3v-old-price` | Старая цена; если её нет — элемент скрывается |
| `data-ms3v-sku` | Артикул |
| `data-ms3v-weight` | Вес числом; при весе 0 элемент скрывается |
| `data-ms3v-stock` | Остаток; при нуле — пусто |
| `data-ms3v-image` | URL изображения: в `src` самого `<img>` или вложенного |
| `data-ms3v-field="ключ"` | Значение ключа без форматирования: `id`, `price`, `old_price`, `count`, `sku`, `weight`, `image`, `file_id` |

Каждый атрибут, кроме `data-ms3v-field`, обновляется только у первого такого элемента на странице. Содержимое элемента заменяется целиком, поэтому единицы измерения ставьте снаружи:

```fenom
<span data-ms3v-sku>{$article}</span>
<span data-ms3v-old-price {if !($old_price > 0)}style="display:none"{/if}>{$old_price}</span>
<span data-ms3v-price>{$price}</span>
<span data-ms3v-weight>{$weight}</span> кг
```

::: warning Элемент старой цены должен быть в разметке всегда
Не оборачивайте элемент с `data-ms3v-old-price` в условие `{if}`. Если его нет в HTML, JavaScript не покажет старую цену у варианта, где она есть. Видимостью элемента JavaScript управляет сам.
:::

## Форма корзины {#cart-form}

При выборе варианта JavaScript записывает `{"_variant_id": ID}` в поле `options` формы добавления в корзину:

```fenom
{'!msProductVariants' | snippet}

<form method="post" class="ms3_form" data-cart-state="add">
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">
    <button type="submit">В корзину</button>
</form>
```

Вариант записывается в первую форму `.ms3_form[data-cart-state="add"]` на странице, а если такой нет — в первую любую `.ms3_form`. Если выше на странице есть другие формы корзины, например в блоке похожих товаров, вариант запишется не туда.

Если на странице есть форма `data-cart-state="change"` и выбранный вариант уже в корзине, форма добавления скрывается, а форма изменения показывается: в её поля `product_key` и `count` записываются данные этой позиции корзины. При выборе варианта, которого в корзине нет, снова показывается форма добавления с количеством 1. Состояние обновляется без перезагрузки — по событию корзины MiniShop3 `ms3:cart:updated`.

::: warning Стандартные опции MiniShop3 в той же форме не передаются
Если в форме кроме варианта есть поля стандартных опций MiniShop3 (`options[color]`), они в корзину не попадут: MiniShop3 берёт непустое поле `options` и игнорирует поля `options[...]`. В корзине будет вариант без выбранного цвета.
:::

## Состояния строк {#states}

| Класс | Когда |
|-------|-------|
| `active` | Строка выбранного варианта |
| `in-cart` | Вариант в корзине; в строку добавляется `.ms3-variant-cart-badge` с текстом «В корзине: N шт.». Текст прописан в скрипте и не переводится |
| `ms3-variant-out-of-stock` | Вариант закончился. Ставит чанк, в своём `tplRow` — `{if !$in_stock}ms3-variant-out-of-stock{/if}` |

Закончившийся вариант можно выбрать, и кнопка добавления остаётся доступной. Если включён контроль остатков ([`ms3variants_check_stock`](../settings#ms3variants_check_stock), по умолчанию Да), сервер откажет при добавлении в корзину с сообщением «Варианта нет в наличии».

## Запуск JavaScript {#init}

Автоматический запуск — по `data-ms3v-init` на событии `DOMContentLoaded`. Сниппет подключает скрипт сам. Если подключаете `ms3variants.js` сами (при `returnData` или `includeJs` = 0), используйте обычный `<script>` без `async`: скрипт, загруженный после этого события, не запустится.

Экземпляр автоматического запуска снаружи недоступен. Чтобы вызывать методы, запустите вручную, когда обёртка уже есть на странице. Стандартный чанк `ms3_variants` выводит `data-ms3v-init`, поэтому нужен свой `tpl` без этого атрибута, иначе на обёртке будет два экземпляра:

```javascript
const variants = new ms3Variants({
    productId: 42,
    containerId: 'ms3variants-42',
    onSelect: function (data) { /* data — как в событии selected */ }
});
```

Параметры: `productId`, `containerId` (`id` обёртки), `priceFormat` (см. [Формат цены](#price-format)), `onSelect`.

| Метод | Что делает |
|-------|------------|
| `getSelectedVariant()` | ID выбранного варианта |
| `setVariant(id)` | Выбирает вариант и запоминает выбор |
| `reset()` | Снимает выделение и забывает выбор. Поле `options` формы не очищает: прежний вариант всё равно добавится в корзину |

## Формат цены {#price-format}

Формат задаётся атрибутами обёртки или параметром `priceFormat` при [ручном запуске](#init). Стандартный чанк `ms3_variants` этих атрибутов не выводит, и параметров сниппета для формата нет: для своего формата нужен свой `tpl`.

| Атрибут | Ключ `priceFormat` | По умолчанию |
|---------|--------------------|--------------|
| `data-ms3v-price-decimals` | `decimals` | `0` |
| `data-ms3v-price-dec-point` | `decPoint` | `,` |
| `data-ms3v-price-thousands-sep` | `thousandsSep` | пробел |
| `data-ms3v-price-currency` | `currency` | `₽` |
| `data-ms3v-price-currency-position` | `currencyPosition` | `after` (или `before`) |

::: warning Задавайте все пять значений сразу
Если задана только часть, остальные не берутся из значений по умолчанию, а пропадают: в цене появится текст `undefined`.
:::

## События {#events}

`ms3variants:selected` — выбран вариант, в том числе автоматически при загрузке страницы. Поля `e.detail`: `productId`, `id`, `price`, `old_price`, `count`, `sku`, `weight`, `image`, `file_id`.

Подписывайтесь на обёртку вариантов: обработчик на `document` срабатывает на один выбор дважды.

```javascript
document.getElementById('ms3variants-42').addEventListener('ms3variants:selected', function (e) {
    console.log(e.detail.id, e.detail.price);
});
```

## Галерея {#gallery}

`ms3variants:image-change` отправляется на `document`, если у выбранного варианта есть изображение, в том числе при загрузке страницы. Поля `e.detail`: `productId`, `variantId`, `fileId`, `imageUrl`. Со стандартным чанком `fileId` всегда `0` — ищите слайд галереи по имени файла из `imageUrl`.

```javascript
document.addEventListener('ms3variants:image-change', function (e) {
    myGallery.goToImage(e.detail.fileId || e.detail.imageUrl);
});
```

### Адаптер для Splide

```fenom
<script src="{'assets_url' | option}components/ms3variants/js/web/adapters/splide-adapter.js"></script>
```

Адаптер работает, если:

- слайды — элементы `#ms3-gallery-main .splide__slide`; нужный ищется по `data-file-id`, затем по имени файла;
- экземпляр Splide лежит в `element.splide` элемента `#ms3-gallery-main` или передан через `window.ms3VariantsSetSplide(splide)`.

Выбор варианта при загрузке страницы происходит сразу, поэтому вызывайте `ms3VariantsSetSplide()` сразу после создания Splide: события до вызова адаптер пропускает. Если галерея устроена иначе, адаптер молча ничего не делает. Готовая разметка — в файле `core/components/ms3variants/elements/chunks/ms3_gallery_splide.tpl`; при установке он не создаётся как чанк.

### Адаптер для GLightbox

```fenom
<script src="{'assets_url' | option}components/ms3variants/js/web/adapters/glightbox-adapter.js"></script>
```

Подключайте адаптер после библиотеки GLightbox: без неё адаптер падает с ошибкой в консоли, как только находит элемент галереи.

Адаптер ищет элемент по всей странице: по `data-file-id`, затем `a.glightbox` по адресу или имени файла. Найденному элементу он ставит класс `active` и прокручивает к нему страницу, в том числе при загрузке.

Класс `active` при этом снимается со всех `.glightbox` и `[data-file-id]` на странице. Если ваша галерея показывает слайды по классу `active`, адаптер с ней конфликтует.
