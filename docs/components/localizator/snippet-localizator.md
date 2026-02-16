---
title: Сниппет Localizator
---
# Сниппет Localizator

Предназначен для вывода переведённых в локализаторе ресурсов. Работает со сниппетами пакета pdoTools (pdoResources, pdoMenu, pdoPage и др.). Не работает с getImageList.

## Параметры

| Название | По умолчанию | Описание |
|----------|--------------|----------|
| **snippet** | `pdoResources` | Имя сниппета для запуска |
| **class** | `modResource` | Класс получаемого объекта |
| **localizator_key** | текущий | Ключ локализации |
| **localizatorTVs** | Нет | Список переведённых доп. полей (TV). Если не заполнять, подтягиваются все TV с включённой опцией «Доступен в локализациях» в настройках TV; параметр позволяет сузить или задать список |

## Примеры

### Вывод через pdoMenu

::: code-group

```fenom
{'Localizator' | snippet : [
  'snippet' => 'pdoMenu',
  'includeTVs' => 'img',
  'processTVs' => 'img',
  'parents' => 0,
  'level' => 1,
]}
```

```modx
[[!Localizator?
  &snippet=`pdoMenu`
  &includeTVs=`img`
  &processTVs=`img`
  &parents=`0`
  &level=`1`
]]
```

:::

### Вывод ресурсов через pdoPage

::: code-group

```fenom
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

```modx
<div id="pdopage">
  <div class="rows">
    [[!pdoPage?
      &element=`Localizator`
      &parents=`0`
      &ajaxMode=`default`
    ]]
  </div>
  [[+page.nav]]
</div>
```

:::

### Вывод ресурсов через mFilter2

::: code-group

```fenom
{'!mFilter2' | snippet : [
  'element' => 'Localizator',
  'parents' => 0,
]}
```

```modx
[[!mFilter2?
  &element=`Localizator`
  &parents=`0`
]]
```

:::

### Вывод товаров через mFilter2

::: code-group

```fenom
{'!mFilter2' | snippet : [
  'element' => 'Localizator',
  'snippet' => 'msProducts',
  'parents' => 0,
]}
```

```modx
[[!mFilter2?
  &element=`Localizator`
  &snippet=`msProducts`
  &parents=`0`
]]
```

:::

### Поиск и вывод товаров с mSearch2 и msProducts

```fenom
{set $ids = '!mSearch2' | snippet : [
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
      'resources' => $ids,
    ]}
  </div>
  {'page.nav' | placeholder}
</div>
```

### Получение и вывод pagetitle другого ресурса

```fenom
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

`resource_id` — ID ресурса.

### Получение и вывод TV другого ресурса

```fenom
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

- `tmplvarid` — ID TV
- `contentid` — ID ресурса

### Модификатор locfield (Fenom)

```fenom
{1 | locfield : 'tvname'}
```

- `1` — ID ресурса
- `tvname` — имя TV

### Вывод значений MIGX от другого ресурса

```fenom
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

### Совместно с clientconfig

Создайте параметры вида `work_clock_1_ru`, `work_clock_1_en` и выводите по текущему языку:

```fenom
{var $key = ('localizator_key' | option)}
{('work_clock_1_' ~ $key) | option}
```

### Лого в зависимости от локализации

```fenom
<a class="header-logo" href="{'site_start' | config}" aria-label="{'site_name' | config}">
  {if $_modx->config.cultureKey == 'ru'}
    <img src="/assets/images/general/logo_ru.png" alt="{$_modx->resource.pagetitle}">
  {else}
    <img src="/assets/images/general/logo.png" alt="{$_modx->resource.pagetitle}">
  {/if}
</a>
```

### Вывод корзины msCart

```fenom
{'!Localizator' | snippet : [
  'snippet' => 'msCart',
  'class' => 'msProduct',
  'tpl' => '@FILE chunks/_checkout.cart.tpl',
]}
```
