Работа фильтрации объектов на карте при помощи `mFilter2` продумана из коробки и реализуется в три шага:

## Новый способ

Работает начиная **с версии 1.1.0 и выше**. Позволяет выводить результаты одновременно и в текстовом формате, и объектами на карте.

### Шаг 1

В нужном месте страницы вызываем `mFilter2` со следующими параметрами:

```php
{'!mFilter2' | snippet : [
    'parents' => $_modx->resource['id'],
    'limit' => 0,
    'filters' => '
        tv|symbol,
    ',
]}
```

Конечно, параметр `&filters` у вас должен быть свой, со своими полями.

### Шаг 2

Чанк `tpl.mFilter2.outer` будет выглядеть примерно так:

```html
<div class="row msearch2" id="mse2_mfilter">
    <div class="span3 col-md-3">
        <form action="[[~[[*id]]]]" method="post" id="mse2_filters">
            <div>
                [[+filters]]
            </div>
            [[+filters:isnot=``:then=`
                <button type="reset" class="btn btn-default hidden">[[%mse2_reset]]</button>
                <button type="submit" class="btn btn-success pull-right hidden">[[%mse2_submit]]</button>
                <div class="clearfix"></div>
            `]]
        </form>
    </div>

    <div class="span9 col-md-9">
        {'!YandexMaps2' | snippet : [
            'mode' => 'mfilter2',
        ]}

        <div id="mse2_results">
            {$results}
        </div>
    </div>
</div>
```

## Шаг 3

Чанк `tpl.mSearch2.row` будет выглядеть примерно так:

```php
<div class="mse2-row">
    [[+idx]]. <a href="[[+uri]]">[[+pagetitle]]</a>[[+weight]]
    [[+intro]]
</div>

<div class="js-ym2-mse2-objects" style="display:none">{'!YandexMaps2' | snippet : [
    'parent' => $id,
    'scripts' => false,
    'tpl' => '@INLINE {(($objects | toJSON: 9) | replace: "{": "{ ") | replace: "[": "[ "}',
]}</div>

<!--msearch2_weight  ([[%mse2_weight]]: [[+weight]])-->
<!--msearch2_intro <p>[[+intro]]</p>-->
```

Блок с классом `.js-ym2-mse2-objects` и именно таким вызовом сниппета, **обязателен**!

## Старый способ

Актуален для версии **1.0.5 и ниже**. Не предусматривает вывод результатов, кроме как объектами на карте.

### Шаг 1

В нужном месте страницы вызываем `mFilter2` со следующими параметрами:

```php
{'!mFilter2' | snippet : [
    'parents' => $_modx->resource['id'],
    'limit' => 0,
    'outputSeparator' => ',',
    'filters' => '
        tv|symbol,
    ',
]}
```

Конечно, параметр `&filters` у вас должен быть свой, со своими полями.

### Шаг 2

Чанк `tpl.mFilter2.outer` будет выглядеть примерно так:

```html
<div class="row msearch2" id="mse2_mfilter">
    <div class="span3 col-md-3">
        <form action="[[~[[*id]]]]" method="post" id="mse2_filters">
            <div>
                [[+filters]]
            </div>
            [[+filters:isnot=``:then=`
                <button type="reset" class="btn btn-default hidden">[[%mse2_reset]]</button>
                <button type="submit" class="btn btn-success pull-right hidden">[[%mse2_submit]]</button>
                <div class="clearfix"></div>
            `]]
        </form>
    </div>

    <div class="span9 col-md-9">
        {'!YandexMaps2' | snippet : [
            'objects' => $results,
            'mode' => 'mfilter2',
        ]}
    </div>
</div>
```

### Шаг 3

Чанк `tpl.mSearch2.row` **должен** выглядеть так:

```php
{'!YandexMaps2' | snippet : [
    'parent' => $id,
    'scripts' => false,
    'tpl' => '@INLINE {(($objects | toJSON: 9) | replace: "{": "{ ") | replace: "[": "[ "}',
]}
```
