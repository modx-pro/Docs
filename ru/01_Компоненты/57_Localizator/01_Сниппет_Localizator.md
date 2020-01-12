Сниппет предназначен для вывода переведенных в локализаторе ресурсов.

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

### Использование для поиска и вывода товаров вместе с msProducts:

```php
[[!pdoPage?
    &element=`Localizator`
    &parents=`0`
    &resources=`[[!mSearch2:default=`999999`?returnIds=`1`&limit=`0`]]`
    &sortby=`ids`
]]
```

### Получение и вывод `pagetitle` от другого ресурса:

``` php
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

``` php
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

### Получение и вывод значений MIGX от другого ресурса

``` php
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

``` php
{var $key = ('localizator_key' | option)}
{('work_clock_1_' ~ $key) | option}
```

### Проверка отображаемой локализации и замена лого или ссылки (для примера)

``` php
{if $_modx->config.cultureKey != 'ru'}
<a class="header-logo" href="/" aria-label="{$_modx->config.site_name}">
    <img src="/assets/images/general/logo_ru.png" alt="{$_modx->resource.pagetitle}">
</a>  
{else}
<a class="header-logo" href="/ru/" aria-label="{$_modx->resource.pagetitle}">
    <img src="/assets/images/general/logo.png" alt="">
</a>
{/if}
```
