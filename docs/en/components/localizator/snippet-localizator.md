---
title: Snippet Localizator
---
# Snippet Localizator

Outputs resources localized in Localizator. Works with pdoTools snippets (pdoResources, pdoMenu, pdoPage, etc.). Does not work with getImageList.

## Parameters

| Name | Default | Description |
|------|---------|-------------|
| **snippet** | `pdoResources` | Snippet name to run |
| **class** | `modResource` | Object class |
| **localizator_key** | current | Localization key |
| **localizatorTVs** | No | Comma-separated TV names for localized output. If empty, all TVs with “Available in localizations” enabled in TV settings are used; this parameter narrows or overrides the list |

## Examples

### Output via pdoMenu

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

### Output resources via pdoPage

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

### Output resources via mFilter2

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

### Output products via mFilter2

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

### Search and product listing with mSearch2 and msProducts

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

### Get and output pagetitle from another resource

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

`resource_id` — resource ID.

### Get and output TV from another resource

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

- `tmplvarid` — TV ID
- `contentid` — resource ID

### locfield modifier (Fenom)

```fenom
{1 | locfield : 'tvname'}
```

- `1` — resource ID
- `tvname` — TV name

### Output MIGX values from another resource

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

### With clientconfig

Create parameters like `work_clock_1_ru`, `work_clock_1_en` and output by current language:

```fenom
{var $key = ('localizator_key' | option)}
{('work_clock_1_' ~ $key) | option}
```

### Logo by localization

```fenom
<a class="header-logo" href="{'site_start' | config}" aria-label="{'site_name' | config}">
  {if $_modx->config.cultureKey == 'ru'}
    <img src="/assets/images/general/logo_ru.png" alt="{$_modx->resource.pagetitle}">
  {else}
    <img src="/assets/images/general/logo.png" alt="{$_modx->resource.pagetitle}">
  {/if}
</a>
```

### msCart output

```fenom
{'!Localizator' | snippet : [
  'snippet' => 'msCart',
  'class' => 'msProduct',
  'tpl' => '@FILE chunks/_checkout.cart.tpl',
]}
```
