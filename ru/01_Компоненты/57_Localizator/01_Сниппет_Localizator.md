# Сниппет предназначен для вывода переведенных в локализаторе ресурсов

## Параметры

Сниппет Localizator работает со сниппетами пакета pdoTools. Не работает с getImageList

| Название            | По умолчанию | Описание                                                                                                                                      |
| ------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **snippet**         | pdoResources | Имя сниппета для запуска                                                                                                                      |
| **class**           | modResource  | Класс получаемого объекта                                                                                                                     |
| **localizator_key** | Нет          | Ключ локализации, по умолчанию текущий                                                                                                        |
| **localizatorTVs**  | Нет          | Список переведенных доп.полей. Если не заполнять, то будут подтягиваться поля в соответствии с системной настройкой **localizator_tv_fields** |

## Примеры

### Вывод через pdoMenu

```php
{'Localizator' | snippet : [
    'snippet' => 'pdoMenu',
    'includeTVs' => 'img',
    'processTVs' => 'img',
    'parents' => 0,
    'level' => 1,
]}
```

### Вывод ресурсов через pdoPage

```php
<div id="pdopage">
    <div class="rows">
        {'!pdoPage' | snippet : [
            'element' => 'Localizator',
            'parents' => 0,
            'ajaxMode' => 'default',
        ]}
    </div>
    {'page.nav' | placeholder}
</div>
```

### Вывод ресурсов через mFilter2

```php
{'!mFilter2' | snippet : [
    'element' => 'Localizator',
    'parents' => 0,
]}
```

### Вывод товаров через mFilter2

```php
{'!mFilter2' | snippet : [
    'element' => 'Localizator',
    'snippet' => 'msProducts',
    'parents' => 0,
]}
```

### Использование для поиска и вывода товаров вместе с msProducts

```php
{set $ids = '!mSearch2' | snippet :[
    'returnIds' => 1,
    'limit' => 0,
] ?:'99999'}

<div id="pdopage">
    <div class="rows">
        {'!pdoPage' | snippet : [
            'element' => 'Localizator',
            'snippet' => 'msProducts',
            'parents' => 0,
            'ajax' => 1,
            'ajaxMode' => 'default',
            'sortby' => 'ids',
            'sortdir' => 'asc',
            'resources' => $ids
        ]}
    </div>
    {'page.nav' | placeholder}
</div>
```

### Получение и вывод `pagetitle` от другого ресурса

```php
{'pdoResources' | snippet : [
    'tpl' => '@INLINE {$pagetitle}',
    'class' => 'localizatorContent',
    'sortby' => 'id',
    'limit' => 1,
    'where' => [
        'key' => ('localizator_key' | option),
        'resource_id' => 2,
    ],
]}
```

Где:
`resource_id` - ID ресурса

### Получение и вывод TV от другого ресурса

```php
{'pdoResources' | snippet : [
    'tpl' => '@INLINE {$value}',
    'class' => 'locTemplateVarResource',
    'sortby' => 'id',
    'limit' => 1,
    'where' => [
        'key' => ('localizator_key' | option),
        'tmplvarid' => 1,
        'contentid' => 2,
    ],
]}
```

Где:

- `tmplvarid` - ID TV поля
- `contentid` - ID ресурса

### Получение и вывод TV от другого ресурса помощью модификатора locfield

```php
{1 | locfield:'tvname'}
```

Где:

- `1` - ID ресурса
- `tvname` - Наименование TV поля

### Получение и вывод значений MIGX от другого ресурса

```php
{foreach ('!pdoResources' | snippet : [
    'tpl' => '@INLINE {$value | toJSON}',
    'class' => 'locTemplateVarResource',
    'sortby' => 'id',
    'showLog' => 0,
    'limit' => 1,
    'where' => [
        'key' => ('localizator_key' | option),
        'tmplvarid' => 30,
        'contentid' => $_modx->resource.parent,
    ],
]) | fromJSON as $spec}
    <div class="product-spec-btn">
        <a class="btn" href="{$spec.download_data_sheet}" download>{'download_data_sheet' | lexicon}</a>
    </div>
{/foreach}
```

### Использование совместно с `clientconfig`

- Создаем два параметра, например:
    `work_clock_1_ru` и `work_clock_1_en`

- Выводим в нужном месте:

```php
{var $key = ('localizator_key' | option)}
{('work_clock_1_' ~ $key) | option}
```

### Проверка отображаемой локализации и замена лого

```php
<a class="header-logo" href="{'site_start' | config}" aria-label="{'site_name' | config}">
    {if $_modx->config.cultureKey == 'ru'}
    <img src="/assets/images/general/logo_ru.png" alt="{$_modx->resource.pagetitle}">
    {else}
    <img src="/assets/images/general/logo.png" alt="{$_modx->resource.pagetitle}">
    {/if}
</a>
```

### Вывод корзины msCart

``` php
{'!Localizator' | snippet : [
    'snippet' => 'msCart',
    'class' => 'msProduct',
    'tpl' => '@FILE chunks/_checkout.cart.tpl',
]}
```
