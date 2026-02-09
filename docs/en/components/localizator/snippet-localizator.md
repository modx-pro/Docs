# Snippet Localizator

Outputs resources localized in Localizator.

## Parameters

Localizator works with pdoTools snippets. It does not work with getImageList.

| Name            | Default      | Description                                                                                                                                      |
|-----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **snippet**      | `pdoResources` | Snippet to run                                                                                                                                   |
| **class**       | `modResource`  | Object class                                                                                                                                     |
| **localizator_key** | `No`        | Localization key (default: current)                                                                                                                                            |
| **localizatorTVs**  | `No`        | List of localized TV names. If empty, TVs follow system setting **localizator_tv_fields**                                                        |

## Examples

### Output via pdoMenu

```fenom
{'Localizator' | snippet: [
  'snippet' => 'pdoMenu',
  'includeTVs' => 'img',
  'processTVs' => 'img',
  'parents' => 0,
  'level' => 1,
]}
```

### Output resources via pdoPage

```fenom
<div id="pdopage">
  <div class="rows">
    {'!pdoPage' | snippet: [
      'element' => 'Localizator',
      'parents' => 0,
      'ajaxMode' => 'default',
    ]}
  </div>
  {'page.nav' | placeholder}
</div>
```

### Output resources via mFilter2

```fenom
{'!mFilter2' | snippet: [
  'element' => 'Localizator',
  'parents' => 0,
]}
```

### Output products with mFilter2

```fenom
{'!mFilter2' | snippet: [
  'element' => 'Localizator',
  'snippet' => 'msProducts',
  'parents' => 0,
]}
```

### Search and product listing with msProducts

```fenom
{set $ids = '!mSearch2' | snippet: [
  'returnIds' => 1,
  'limit' => 0,
] ?:'99999'}

<div id="pdopage">
  <div class="rows">
    {'!pdoPage' | snippet: [
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

### Get and output `pagetitle` from another resource

```fenom
{'pdoResources' | snippet: [
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

Where: `resource_id` — resource ID

### Get and output TV from another resource

```fenom
{'pdoResources' | snippet: [
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

Where:

- `tmplvarid` — TV ID
- `contentid` — resource ID

### Get and output TV using the locfield modifier

```fenom
{1 | locfield : 'tvname'}
```

Where:

- `1` — resource ID
- `tvname` — TV name

### Get and output MIGX values from another resource

```fenom
{foreach ('!pdoResources' | snippet: [
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

### Usage with `clientconfig`

- Create two parameters, e.g.:
    `work_clock_1_ru` and `work_clock_1_en`

- Output where needed:

```fenom
{var $key = ('localizator_key' | option)}
{('work_clock_1_' ~ $key) | option}
```

### Checking current localization and swapping logo

```fenom
<a class="header-logo" href="{'site_start' | config}" aria-label="{'site_name' | config}">
  {if $_modx->config.cultureKey == 'ru'}
    <img src="/assets/images/general/logo_ru.png" alt="{$_modx->resource.pagetitle}">
  {else}
    <img src="/assets/images/general/logo.png" alt="{$_modx->resource.pagetitle}">
  {/if}
</a>
```

### Cart output msCart

```fenom
{'!Localizator' | snippet: [
  'snippet' => 'msCart',
  'class' => 'msProduct',
  'tpl' => '@FILE chunks/_checkout.cart.tpl',
]}
```
