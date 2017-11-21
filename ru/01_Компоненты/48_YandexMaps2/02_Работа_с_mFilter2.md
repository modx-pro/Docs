Работа фильтрации объектов на карте при помощи mFilter2 продумана из коробки и реализуется в три шага:

#### Шаг 1
В нужном месте страницы вызываем `mFilter2` со следующими параметрами:
```
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

#### Шаг 2
Чанк `tpl.mFilter2.outer` будет выглядеть примерно так:
```
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

#### Шаг 3
Чанк `tpl.mSearch2.row` должен выглядеть так:
```
{'!YandexMaps2' | snippet : [
    'parent' => $id,
    'scripts' => false,
    'tpl' => '@INLINE {($objects | toJSON) | replace : "[" : "[ "}',
]}
```