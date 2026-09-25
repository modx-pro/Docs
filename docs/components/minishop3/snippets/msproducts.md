---
title: msProducts
---
# msProducts

Выводит список товаров. Основан на pdoTools и поддерживает все его возможности фильтрации, сортировки и пагинации.

## Параметры

### Основные

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **tpl** | `tpl.msProducts.row` | Чанк для вывода каждого товара |
| **limit** | `10` | Количество товаров на странице |
| **offset** | `0` | Пропустить указанное количество товаров |
| **depth** | `10` | Глубина поиска в дочерних категориях |
| **parents** | текущий ресурс | ID родительских категорий через запятую |
| **resources** | | ID конкретных товаров через запятую |

### Сортировка

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **sortby** | `id` | Поле для сортировки |
| **sortdir** | `ASC` | Направление: `ASC` или `DESC` |
| **sortbyOptions** | | Сортировка по опциям товара (см. ниже) |

С версии 1.14 значение `sortby` проверяется по списку разрешённого, прежде чем уйти в запрос. Проходят:

- поля товара и ресурса — они получают нужный псевдоним автоматически;
- объявленные TV, поля производителя и ключи `sortbyOptions`;
- функции `RAND`, `FIELD`, `IFNULL`, `COALESCE`, `CAST`, если их аргументы тоже прошли проверку;
- части с псевдонимом таблицы — только для псевдонимов из `leftJoin` и `innerJoin` этого же вызова.

::: warning Непрошедшая часть выбрасывается молча
Отброшенная часть сортировки не вызывает ошибки: страница отрисуется, товары будут не в том порядке. Если отброшено всё значение, список сортируется по `msProduct.id`.

Причина пишется в журнал ошибок MODX строкой `ms3_products dropped unsafe/unknown sortby part(s)`. Заглядывайте туда, если порядок товаров изменился после обновления.
:::

### Связанные товары

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **link** | | ID типа связи (из таблицы `ms3_links`) |
| **master** | | ID товара-мастера (вывести товары, связанные с ним) |
| **slave** | | ID товара-слейва (вывести товары, для которых он связан) |

::: info Фильтр по категориям при link
При `link` сниппет сам выставляет `parents => 0` и `depth => 0`, чтобы связанные товары искались по всему каталогу. Явно указывать `parents => 0` не обязательно.
:::

### Фильтрация

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **where** | | JSON с дополнительными условиями |
| **optionFilters** | | JSON фильтров по опциям товара |
| **showZeroPrice** | `true` | Показывать товары с нулевой ценой |
| **showUnpublished** | `false` | Показывать неопубликованные |
| **showDeleted** | `false` | Показывать удалённые |
| **showHidden** | `true` | Показывать скрытые в меню |

### Дополнительные данные

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **includeContent** | `false` | Включить поле `content` |
| **includeTVs** | | Список TV через запятую |
| **includeThumbs** | | Превью изображений через запятую |
| **includeVendorFields** | `*` | Поля производителя (`*` = все) |
| **includeOptions** | | Опции товара для включения (через запятую) |
| **tvPrefix** | | Префикс для TV-плейсхолдеров (pdoTools) |
| **withCurrency** | `false` | Добавить символ валюты в `price_formatted` и `old_price_formatted` |
| **usePackages** | | Внешние пакеты через запятую (см. [Интеграция](#интеграция-с-внешними-пакетами)) |

### Вывод

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **return** | `data` | Формат: `data`, `json`, `ids`, `sql` |
| **returnIds** | `false` | Вернуть только ID товаров |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **toSeparatePlaceholders** | | Префикс для отдельных плейсхолдеров |
| **outputSeparator** | `\n` | Разделитель между товарами |
| **tplWrapper** | | Чанк-обёртка для всего вывода |
| **wrapIfEmpty** | `true` | Использовать обёртку при пустом результате |
| **showLog** | `false` | Показать журнал выполнения. Виден только тому, кто вошёл в админку, — на любой странице сайта |

### Область категорий

pdoTools фильтрует товары только по `parent` и не видит дополнительные категории из `msCategoryMember`. Поэтому при `parents` не равном `0` сниппет строит свой `WHERE` по основной и дополнительным категориям — этим занимается `CategoryProductScopeService`. Затем `parents` сбрасывается в `0`, иначе pdoTools отсеет товары из связанных категорий.

### Закрытые товары и группы ресурсов

Если товар или категория закрыты группой ресурсов MODX, сниппет не покажет их постороннему. Проверка включена по умолчанию системной настройкой `ms3_web_catalog_respect_resource_groups` и работает вместе со штатной настройкой MODX `access_resource_group_enabled`.

Вошедший покупатель, чья группа покупателей привязана к группе пользователей MODX, видит закрытый раздел.

::: danger На кэшируемой странице закрытый каталог не работает
MODX отдаёт готовый HTML раньше, чем выполнится сниппет. Первый же гость запишет в кэш свой сокращённый список, и вошедший покупатель увидит именно его — без всяких признаков ошибки.

Поэтому на страницах с закрытыми разделами вызывайте сниппет некэшированно: `[[!ms3_products]]`.
:::

### Вывод `return=data`

При `return=data` (значение по умолчанию) сниппет **не** возвращает массив PHP. Для каждой строки выбирается чанк (`tpl` или из `@FILE`) и результат склеивается через `outputSeparator`. Для массива используйте Fenom `{set $rows = 'msProducts' | snippet : ['return' => 'json']}` и `json_decode`, либо `return=ids`.

При `showLog=1` и открытой сессии админки сниппет отдаёт журнал pdoTools. Где именно — зависит от `return`:

| `return` | Где искать журнал |
| --- | --- |
| `data` (по умолчанию) | Дописывается в конец вывода последним элементом, после товаров |
| `json`, `ids`, `sql` | Плейсхолдер `msProducts.log` |
| любое с `toSeparatePlaceholders` | Плейсхолдер `<префикс>log` |

## Псевдонимы таблиц

Поля основной таблицы `msProduct` доступны без префикса, к полям присоединённых — только через псевдоним. Сами таблицы сниппет присоединяет автоматически.

### Таблицы и их поля

| Таблица | Псевдоним | Поля |
| --- | --- | --- |
| msProduct | — (не нужен) | id, pagetitle, longtitle, alias, uri, parent, createdon, publishedon, template... |
| msProductData | `Data` | price, old_price, article, weight, vendor_id, new, popular, favorite, color, size, tags... |
| msVendor | `Vendor` | name, country, logo, address, phone, email (при `includeVendorFields`) |

### Динамические псевдонимы

| Псевдоним | Когда появляется | Описание |
| --- | --- | --- |
| `Link` | При `link` + `master`/`slave` | Таблица связей товаров |
| `{размер}` | При `includeThumbs` | Эскизы. Псевдоним = название размера (small, medium...) |
| `{опция}` | При `optionFilters` / `sortbyOptions` | Опции товара. Псевдоним = ключ опции (color, size...) |

### Пример с псевдонимами

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => [
        'parent' => 15,
        'Data.price:>' => 1000,
        'Data.vendor_id' => 3
    ],
    'sortby' => 'Data.price',
    'sortdir' => 'ASC'
]}
```

::: warning Поля товара — только с псевдонимом `Data`
Поля товара (`price`, `article`, `new`, `popular` и другие) лежат в таблице `Data`. Без псевдонима запрос завершится ошибкой: пишите `'Data.price:>' => 1000`, а не `'price:>' => 1000`.
:::

## Примеры

### Базовый вывод

```fenom
{'msProducts' | snippet : [
    'parents' => 5,
    'limit' => 12,
    'tpl' => 'tpl.msProducts.row'
]}
```

### Сортировка по цене

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'sortby' => 'Data.price',
    'sortdir' => 'ASC'
]}
```

### Новинки (сортировка по дате)

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'sortby' => 'createdon',
    'sortdir' => 'DESC',
    'limit' => 8,
    'where' => ['Data.new' => 1]
]}
```

### Выборка по полю товара

```fenom
{* Популярные товары *}
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => ['Data.popular' => 1],
    'limit' => 4
]}

{* Товары определённого производителя *}
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => ['Data.vendor_id' => 5]
]}
```

### Фильтрация по опциям

```fenom
{* Товары красного цвета размера M *}
{'msProducts' | snippet : [
    'parents' => 0,
    'optionFilters' => ['color' => 'red', 'size' => 'M']
]}

{* Красные ИЛИ синие товары — префикс OR: *}
{'msProducts' | snippet : [
    'parents' => 0,
    'optionFilters' => ['color' => 'red', 'OR:color' => 'blue']
]}
```

### Связанные товары

```fenom
{* Аксессуары для текущего товара *}
{'msProducts' | snippet : [
    'link' => 2,
    'master' => $_modx->resource.id,
    'limit' => 4,
    'tpl' => 'tpl.msProducts.related'
]}

{* Обратная связь: товары, к которым текущий идёт аксессуаром *}
{'msProducts' | snippet : [
    'link' => 2,
    'slave' => $_modx->resource.id,
    'limit' => 4
]}
```

`master` — товар, для которого ищут связанные; `slave` — обратное направление. `link` — ID связи из раздела **MiniShop3 → Связи товаров**. Число `2` здесь условное: [подставьте ID своей связи](#link-id).

### Откуда берётся ID связи {#link-id}

Готовых связей в поставке нет: после установки таблица связей пуста, и `link` указывать нечего. Связи заводятся вручную в разделе **MiniShop3 → Связи товаров**.

Заведите столько связей, сколько нужно магазину, — например «Аксессуары», «Аналоги», «С этим покупают». Название придумываете вы, а `ID` присваивается при сохранении: у первой связи он будет `1`, у второй `2` и так далее. Этот номер и передаётся в `link`.

У каждой связи выбирается тип — он задаёт не смысл связи, а её кратность:

| Тип | Что означает |
| --- | --- |
| `one_to_one` | Один товар связан с одним |
| `one_to_many` | Один товар связан со многими |
| `many_to_one` | Многие товары связаны с одним |
| `many_to_many` | Многие связаны со многими |

::: warning Примеры выше не заработают на чистой установке
В примерах стоит `'link' => 2`, но пока вы не создали связи, такой записи не существует и сниппет вернёт пустоту. Сначала заведите связи в админке, затем подставьте их настоящие ID.
:::

### Сортировка по опции

```fenom
{* Сортировка по весу (числовая опция) *}
{'msProducts' | snippet : [
    'parents' => 0,
    'sortby' => 'weight',
    'sortbyOptions' => 'weight:number',
    'sortdir' => 'ASC'
]}
```

**Поддерживаемые типы для `sortbyOptions`:**

| Тип | Пример | Когда использовать |
| --- | --- | --- |
| `number` / `decimal` | `weight:number` | Дробные числа: цена, вес, объём |
| `int` / `integer` | `quantity:int` | Целые числа: количество, рейтинг, возраст |
| `date` / `datetime` | `release_date:date` | Даты: дата выпуска, дата поступления |
| (без типа) | `color` | Текст: сортировка по алфавиту |

### С превью изображений

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'includeThumbs' => 'small,medium'
]}
```

В чанке будут доступны `{$small}`, `{$medium}` — URL главного изображения в каждом размере.

### Несколько изображений товара

Параметр `includeThumbs` возвращает только одно изображение на товар — главное. Главным считается то, что отмечено в галерее как превью; если превью не выбрано, берётся изображение с наименьшей позицией. Чтобы получить два-три изображения для карусели, используйте `leftJoin` и `select`:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'leftJoin' => [
        'Img1' => [
            'class' => 'MiniShop3\\Model\\msProductFile',
            'on' => 'Img1.product_id = msProduct.id AND Img1.position = 0 AND Img1.path LIKE "%/small/%"'
        ],
        'Img2' => [
            'class' => 'MiniShop3\\Model\\msProductFile',
            'on' => 'Img2.product_id = msProduct.id AND Img2.position = 1 AND Img2.path LIKE "%/small/%"'
        ],
        'Img3' => [
            'class' => 'MiniShop3\\Model\\msProductFile',
            'on' => 'Img3.product_id = msProduct.id AND Img3.position = 2 AND Img3.path LIKE "%/small/%"'
        ]
    ],
    'select' => [
        'Img1' => 'Img1.url as img1',
        'Img2' => 'Img2.url as img2',
        'Img3' => 'Img3.url as img3'
    ]
]}
```

В чанке будут доступны `{$img1}`, `{$img2}`, `{$img3}` — URL изображений в порядке их расположения в галерее.

::: tip Позиция изображения
`position = 0` — первое изображение, `position = 1` — второе, и т.д. Порядок определяется сортировкой в галерее товара.
:::

### Получение только ID

```fenom
{set $productIds = 'msProducts' | snippet : [
    'parents' => 5,
    'returnIds' => 1
]}

{* $productIds = "1,2,3,4,5" *}
```

### Вывод в JSON (для AJAX)

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'return' => 'json',
    'limit' => 20
]}
```

### С пагинацией (pdoPage)

```fenom
{'pdoPage' | snippet : [
    'element' => 'msProducts',
    'parents' => 0,
    'limit' => 12,
    'tpl' => 'tpl.msProducts.row'
]}

{$_modx->getPlaceholder('page.nav')}
```

## Плейсхолдеры чанка `tpl`

### Основные поля ресурса

- `{$id}` — ID товара
- `{$pagetitle}` — Название
- `{$longtitle}` — Расширенный заголовок
- `{$description}` — Описание
- `{$introtext}` — Аннотация
- `{$content}` — Содержимое (если `includeContent`)
- `{$alias}` — Псевдоним URL
- `{$uri}` — Полный URI
- `{$parent}` — ID родителя
- `{$template}` — ID шаблона
- `{$published}` — Опубликован
- `{$createdon}` — Дата создания
- `{$editedon}` — Дата редактирования

### Поля товара (Data)

- `{$article}` — Артикул
- `{$price}` — Цена
- `{$old_price}` — Старая цена
- `{$weight}` — Вес
- `{$image}` — Основное изображение
- `{$thumb}` — Превью изображения
- `{$vendor_id}` — ID производителя
- `{$made_in}` — Страна производства
- `{$new}` — Флаг «Новинка»
- `{$popular}` — Флаг «Популярный»
- `{$favorite}` — Флаг «Избранное»
- `{$color}` — Цвет (JSON)
- `{$size}` — Размер (JSON)
- `{$tags}` — Теги (JSON)
- `{$discount}` — Скидка в процентах (вычисляется автоматически)

### Форматированные плейсхолдеры

Числовые `{$price}`, `{$old_price}`, `{$weight}` — для расчётов. Для вывода на сайте — `*_formatted` по настройкам `ms3_price_format`, `ms3_currency_symbol`, `ms3_currency_position`, `ms3_weight_unit`:

- `{$price_formatted}` — Цена (с валютой при `withCurrency => true`)
- `{$old_price_formatted}` — Старая цена
- `{$weight_formatted}` — Вес с единицей (например `500 г`)

Параметр `formatPrices` удалён в 1.11.0-beta1. Тогда же обычные плейсхолдеры цен и веса стали числами для арифметики, а строки для вывода переехали в `*_formatted`.

### Поля производителя (Vendor)

При `includeVendorFields`:

- `{$vendor_position}` — Позиция
- `{$vendor_name}` — Название
- `{$vendor_resource_id}` — ID ресурса
- `{$vendor_country}` — Страна
- `{$vendor_logo}` — Логотип
- `{$vendor_address}` — Адрес
- `{$vendor_phone}` — Телефон
- `{$vendor_email}` — Email
- `{$vendor_description}` — Описание
- `{$vendor_properties}` — Свойства

### Служебные

- `{$idx}` — Порядковый номер в выборке

## Пример чанка

```fenom
{* tpl.msProducts.row *}
<div class="product-card">
    <a href="{$uri}">
        {if $thumb?}
            <img src="{$thumb}" alt="{$pagetitle}" loading="lazy">
        {/if}

        <h3>{$pagetitle}</h3>

        {if $old_price > $price}
            <span class="old-price">{$old_price_formatted}</span>
        {/if}

        <span class="price">{$price_formatted}</span>

        {if $new}
            <span class="badge badge-new">Новинка</span>
        {/if}
    </a>

    {* Добавление в корзину — только формой: скрипт витрины ищет ms3_action внутри формы *}
    <form method="post" class="ms3_form" data-ms3-form>
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="count" value="1">
        <input type="hidden" name="ms3_action" value="cart/add">
        <button type="submit">В корзину</button>
    </form>
</div>
```

::: warning Кнопка сама по себе в корзину не положит
Скрипт перехватывает отправку формы с классом `ms3_form` или атрибутом `data-ms3-form` и читает поле `ms3_action`. Кнопка с атрибутами вместо формы не сработает и ошибки не покажет — товар просто не добавится. Готовый образец со всей разметкой — штатный чанк `ms3_products_row.tpl`.
:::

## Интеграция с внешними пакетами

Внешние пакеты (ms3Variants, msBrands и другие) добавляют свои данные к товарам через события — код ядра MiniShop3 при этом не меняется.

### Параметр usePackages

```fenom
{* Загрузить варианты товаров *}
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants'
]}

{* Загрузить варианты и бренды *}
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants,msBrands'
]}
```

Без параметра `usePackages` данные внешних пакетов не загружаются — это экономит ресурсы на страницах, где они не нужны.

### Плейсхолдеры пакетов

Каждый пакет добавляет свои. Например, ms3Variants:

| Плейсхолдер | Тип | Описание |
| --- | --- | --- |
| `{$has_variants}` | bool | Есть ли варианты у товара |
| `{$variants_count}` | int | Количество вариантов |
| `{$variants_json}` | string | JSON массив для JavaScript |
| `{$variants}` | array | Массив вариантов для Fenom |

### Пример с вариантами

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'tpl' => 'tpl.msProducts.variants'
]}
```

**Чанк tpl.msProducts.variants:**

```fenom
<div class="product-card" data-product-id="{$id}">
    <h3>{$pagetitle}</h3>
    <div class="price">{$price_formatted}</div>

    {if $has_variants}
        <div class="variants-selector" data-variants='{$variants_json}'>
            {* JavaScript инициализирует селекторы на основе JSON *}
        </div>
    {/if}

    <form method="post" class="ms3_form" data-ms3-form>
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="variant_id" value="">
        <input type="hidden" name="count" value="1">
        <input type="hidden" name="ms3_action" value="cart/add">
        <button type="submit">В корзину</button>
    </form>
</div>
```

### События для разработчиков

Пакеты подключаются к событиям `msOnProductsLoad` и `msOnProductPrepare` — см. [События](/components/minishop3/development/events).
