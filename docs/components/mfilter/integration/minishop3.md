# MiniShop3

MiniShop3 требует PHP 8.2.

## Базовая настройка

### Сниппет

```fenom
{set $catalog = '!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'limit' => 24,
    'tpl' => 'tpl.msProducts.row',
    'includeThumbs' => 'small,medium'
]}

{'!mFilterForm' | snippet}

{$catalog}
```

`mFilter` вызывается первым и выводится через переменную — иначе числа в форме не сойдутся с выдачей.

### Набор фильтров

Создайте в админке [набор фильтров](../interface/filter-sets). В редакторе это строки таблицы «Ключ — Источник — Тип — Заголовок»; в базе набор хранится как JSON:

```json
{
    "vendor": {
        "type": "vendors",
        "label": "Производитель"
    },
    "price": {
        "type": "number",
        "source": "product",
        "label": "Цена"
    },
    "color": {
        "type": "colors",
        "source": "option",
        "label": "Цвет"
    },
    "size": {
        "type": "default",
        "source": "option",
        "label": "Размер"
    },
    "new": {
        "type": "boolean",
        "source": "product",
        "label": "Новинка"
    }
}
```

Типы «Производители», «Цвета» и «Категории товаров (MS3)» доступны, только если установлен MiniShop3.

## Источники данных MiniShop3

### Поля товара (source: product)

| Поле | Описание |
|------|----------|
| `price` | Цена |
| `old_price` | Старая цена |
| `weight` | Вес |
| `article` | Артикул |
| `new` | Новинка (1/0) |
| `popular` | Популярное (1/0) |
| `favorite` | Избранное (1/0) |

Имя поля пишется без `Data.`. Если ключ фильтра совпадает с колонкой из таблицы, `source` можно не указывать: при установленном MiniShop3 mFilter подставит `product` сам.

### Производители

Тип «Производители» сам берёт список из `ms3_vendors`, `source` ему не нужен — см. фильтр `vendor` в наборе выше.

### Опции товаров (source: option)

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "label": "Цвет"
    }
}
```

Значения берутся из `ms3_product_options`. Если имя опции отличается от ключа фильтра, укажите его в `field` — в редакторе такого поля нет, только в JSON набора, см. [Настройки, которых нет в таблице](../interface/filter-sets#nastroyki-kotoryh-net-v-tablice).

### Категории товаров

На каталоге MiniShop3 тип «Категории товаров (MS3)» точнее, чем «Родители (категории)»: он учитывает и дополнительные категории товара.

## Наличие и скидка

Фильтров «В наличии» и «Со скидкой» штатно нет: булев фильтр сравнивает колонку с `1` и `0`, а остаток и разница цен — числа. Такие фильтры делаются своим типом — см. [Свой тип фильтра](../cookbook/custom-filter-type).

## Сортировка

Порядок по умолчанию задают параметры `sortby` и `sortdir`:

```fenom
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'sortby' => 'Data.price',
    'sortdir' => 'ASC'
]}
```

Доступные поля сортировки:

| Поле | Описание |
|------|----------|
| `pagetitle` | Название |
| `publishedon` | Дата публикации |
| `Data.price` | Цена |
| `Data.weight` | Вес |
| `Data.article` | Артикул |

### Переключатель сортировки

Стандартный чанк `mfilter.outer` уже выводит выпадающий список сортировки. Чтобы поменять варианты, задайте их в своём `tplOuter`:

```html
<select data-mfilter-sort>
    <option value="pagetitle-asc">По названию (А-Я)</option>
    <option value="pagetitle-desc">По названию (Я-А)</option>
    <option value="price-asc">Сначала дешёвые</option>
    <option value="price-desc">Сначала дорогие</option>
    <option value="publishedon-desc">Сначала новые</option>
</select>
```

## Чанк карточки товара

Проще всего начать со штатного чанка MiniShop3 `tpl.msProducts.row`. Если пишете свой, для кнопки «В корзину» нужны форма с классом `ms3_form` или атрибутом `data-ms3-form` — штатный чанк ставит оба — и скрытое поле `ms3_action`:

```html
{* @FILE chunks/product.card.tpl *}
<div>
    <a href="{$uri}">
        <img src="{$small}" alt="{$pagetitle | e}">
        {$pagetitle} — {$vendor_name}
    </a>
    {$price | number : 0} ₽

    <form method="post" class="ms3_form" data-ms3-form>
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="count" value="1">
        <input type="hidden" name="ms3_action" value="cart/add">
        <button type="submit">В корзину</button>
    </form>
</div>
```

- Миниатюра приходит переменной с именем размера из `&includeThumbs`: `{$small}`.
- Поля производителя приходят с префиксом `vendor_`: `{$vendor_name}`.

После фильтрации без перезагрузки mFilter сам обновляет кнопки MiniShop3 в новых карточках.

## SEO для каталога

SEO-шаблоны для страниц MiniShop3 настраиваются так же, как для любых других, — на вкладке [SEO шаблоны](../interface/seo-templates). Пример Title для набора с фильтрами `made_in` (страна производства) и `color`:

```
{$pagetitle} из {$made_in.gen}{if $color}, {$color}{/if} — купить в {$site_name}
```

SEO-шаблон с двумя ключами применится и к странице, где выбрана только страна: ветка `{if $color}` тогда не выведется.

Производитель, раздел каталога и категория товаров подставятся названиями, хотя фильтр хранит их идентификаторы: `{$vendor}` с набором со страницы даст «Acme», а не `12`. Имя переменной — ключ фильтра из набора.

## Производительность

Фильтрацию по полям и опциям товара ускоряет индекс фасетов mFilter. Соберите его кнопкой «Построить индекс» или «Переиндексация» в шапке админки, см. [Обслуживание](../interface/maintenance). Повторные запросы отдаёт кэш mFilter — см. [Кэширование](../cache).

Параметры `&cache` и `&cacheTime` сниппет `mFilter` не читает: они уходят в `paginator` и кэшируют готовую страницу с карточками.
