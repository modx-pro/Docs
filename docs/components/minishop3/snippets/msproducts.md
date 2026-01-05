---
title: msProducts
---
# msProducts

Сниппет для вывода списка товаров. Основан на pdoTools и поддерживает все его возможности фильтрации, сортировки и пагинации.

## Параметры

### Основные

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msProducts.row` | Чанк для вывода каждого товара |
| **limit** | `10` | Количество товаров на странице |
| **offset** | `0` | Пропустить указанное количество товаров |
| **depth** | `10` | Глубина поиска в дочерних категориях |
| **parents** | текущий ресурс | ID родительских категорий через запятую |
| **resources** | | ID конкретных товаров через запятую |

### Сортировка

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **sortby** | `id` | Поле для сортировки |
| **sortdir** | `ASC` | Направление: `ASC` или `DESC` |
| **sortbyOptions** | | Сортировка по опциям товара (см. ниже) |

### Связанные товары

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **link** | | ID типа связи (из таблицы `ms3_links`) |
| **master** | | ID товара-мастера (вывести товары, связанные с ним) |
| **slave** | | ID товара-слейва (вывести товары, для которых он связан) |

::: warning Важно: parents=0
При использовании параметра `link` для связанных товаров **обязательно** указывайте `parents => 0`, чтобы отключить фильтрацию по категориям. Иначе будут выведены только связанные товары из той же категории.
:::

### Фильтрация

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **where** | | JSON с дополнительными условиями |
| **optionFilters** | | JSON фильтров по опциям товара |
| **showZeroPrice** | `true` | Показывать товары с нулевой ценой |
| **showUnpublished** | `false` | Показывать неопубликованные |
| **showDeleted** | `false` | Показывать удалённые |
| **showHidden** | `true` | Показывать скрытые в меню |

### Дополнительные данные

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **includeContent** | `false` | Включить поле `content` |
| **includeTVs** | | Список TV через запятую |
| **includeThumbs** | | Превью изображений через запятую |
| **includeVendorFields** | `*` | Поля производителя (`*` = все) |
| **includeOptions** | | Опции товара для включения |

### Вывод

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **return** | `data` | Формат: `data`, `json`, `ids`, `sql` |
| **returnIds** | `false` | Вернуть только ID товаров |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **toSeparatePlaceholders** | | Префикс для отдельных плейсхолдеров |
| **outputSeparator** | `\n` | Разделитель между товарами |
| **tplWrapper** | | Чанк-обёртка для всего вывода |
| **wrapIfEmpty** | `true` | Использовать обёртку при пустом результате |
| **showLog** | `false` | Показать лог выполнения |

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
    'where' => '{"new":1}'
]}
```

### Популярные товары

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => '{"popular":1}',
    'limit' => 4
]}
```

### Товары определённого производителя

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => '{"Data.vendor_id":5}'
]}
```

### Фильтрация по опциям

```fenom
{* Товары красного цвета размера M *}
{'msProducts' | snippet : [
    'parents' => 0,
    'optionFilters' => '{"color":"red","size":"M"}'
]}
```

### С условием OR в опциях

```fenom
{* Красные ИЛИ синие товары *}
{'msProducts' | snippet : [
    'parents' => 0,
    'optionFilters' => '{"color":"red","OR:color":"blue"}'
]}
```

### Связанные товары

Связи товаров позволяют выводить аксессуары, сопутствующие товары, аналоги и т.д.

```fenom
{* Аксессуары для текущего товара *}
{'msProducts' | snippet : [
    'link' => 2,
    'master' => $_modx->resource.id,
    'parents' => 0,
    'limit' => 4,
    'tpl' => 'tpl.msProducts.related'
]}
```

Параметр `master` указывает товар, для которого ищутся связанные. ID связи (`link`) соответствует типу связи в настройках MiniShop3.

### Обратная связь (товары, к которым текущий является аксессуаром)

```fenom
{'msProducts' | snippet : [
    'link' => 2,
    'slave' => $_modx->resource.id,
    'parents' => 0,
    'limit' => 4
]}
```

### Типы связей

По умолчанию в MiniShop3 доступны следующие типы связей:

| ID | Название |
|----|----------|
| 1 | Рекомендуемые (Related) |
| 2 | Аксессуары |
| 3 | Аналоги |

Создать новые типы связей можно в разделе **Настройки → Типы связей**.

### Сортировка по опции (числовой)

```fenom
{* Сортировка по весу (опция weight) *}
{'msProducts' | snippet : [
    'parents' => 0,
    'sortby' => 'weight',
    'sortbyOptions' => 'weight:number',
    'sortdir' => 'ASC'
]}
```

### С превью изображений

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'includeThumbs' => 'small,medium'
]}
```

В чанке будут доступны: `{$small}`, `{$medium}` — URL превью.

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

## Доступные плейсхолдеры в чанке

В чанке `tpl` доступны все поля товара:

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
- `{$new}` — Флаг "Новинка"
- `{$popular}` — Флаг "Популярный"
- `{$favorite}` — Флаг "Избранное"
- `{$color}` — Цвет (JSON)
- `{$size}` — Размер (JSON)
- `{$tags}` — Теги (JSON)

### Поля производителя (Vendor)

При `includeVendorFields`:

- `{$vendor_name}` — Название
- `{$vendor_country}` — Страна
- `{$vendor_logo}` — Логотип
- `{$vendor_address}` — Адрес
- `{$vendor_phone}` — Телефон
- `{$vendor_email}` — Email

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
            <span class="old-price">{$old_price} руб.</span>
        {/if}

        <span class="price">{$price} руб.</span>

        {if $new}
            <span class="badge badge-new">Новинка</span>
        {/if}
    </a>

    <button type="button"
            data-ms-action="cart/add"
            data-id="{$id}">
        В корзину
    </button>
</div>
```
