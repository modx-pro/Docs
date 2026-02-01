---
title: FlatFilters
description: Component for filtering any data.
outline: [2,3]
lastUpdated: true
logo: https://flatfilters.art-sites.ru/assets/components/flatfilters/logo.jpg
modstore: https://modstore.pro/packages/ecommerce/flatfilters
repository: https://github.com/ShevArtV/flatfilters
author: ShevArtV
items: [
{ text: 'Getting started', link: 'index' },
{ text: 'Snippets', link: 'snippets' },
{ text: 'Chunks', link: 'chunks' },
{ text: 'Events', link: 'events' },
{ text: 'Development', link: 'development' },
]
dependencies: ['SendIt']
---

# FlatFilters

## Advantages

1. No third-party services (ElasticSearch, Sphinx, etc.) required.
2. Fast filtering (under 1 second for 100,000 products).
3. Simple setup with standard classes.
4. Filter by multiple values.
5. Can filter users.
6. Can filter by MIGX-type fields (nesting depth up to 1).
7. Custom logic via plugins.

## Limitations

1. Does not show match counts per filter.
2. Can disable filter values that would return no results.
3. Returns a comma-separated list of IDs, not HTML or an object.
4. No built-in search.

## Basic usage

### Dependencies

Before installing, ensure **SendIt** 2.0.0 or higher is installed.

### Installing the component

Available at [modstore.pro](https://modstore.pro/packages/ecommerce/flatfilters). Install via the standard installer. PHP 7.4 or higher required.

### Adding a configuration

In the top menu under *"Packages"* open *"Filtering"*. You will see the filter configuration list (empty at first).

Click *"Add configuration"*. Choose type: resources, products, or users. You can add a custom type; see [Development](https://docs.modx.pro/components/flatfilters/development).
:::tip
You can also copy an existing configuration using the yellow (or orange, or second from the left in **Actions**) button.
:::

### Configuring

On the configuration page enter a name (to tell configurations apart).

**Step** is how many entities are indexed per batch. Default 100 is fine; increase on powerful servers.

For resources and products you can set *Parents* to limit what gets indexed. For users you can set **Groups**.
:::tip
System setting **ff_show_parents_panel_for** controls for which config types the parent selector is shown.
:::
:::tip
System setting **ff_show_groups_panel_for** controls for which config types the group selector is shown.
:::

### Adding filters

Add the filter list. Filters can have a default value; then they are hidden from users but still apply.
:::tip
To set a default, choose the comparison operator and enter the value.
:::

Each filter needs a field type and comparison type. Field type defines how the value is stored; comparison type defines how it is matched and which chunk is used (list, checkboxes, slider, date).
:::tip
Search filter fields by key or name. To map key to label, add a lexicon entry in namespace **flatfilters**, theme **default**: ff_frontend_*filter-key*.
:::
:::tip
Some field and comparison types are incompatible; unavailable options are disabled.
:::
:::tip
For **multiple** comparison type the SQL uses IN and the value is a string.
:::
:::tip
For MIGX fields use key **tvname_fieldname**.
:::

### Indexing

Save the configuration and go back to the list. Find your config and click the green *Index* button.

Wait until the row background turns bright green.

Time depends on server and data size.
:::tip
If indexing is interrupted, click *Index* again to resume.
:::

### Preparing the template

:::warning
Set template IDs where filtering is used in system setting **ff_tpls**.
:::
While indexing runs, prepare the template. Call snippet [**ffGetFilterForm**](https://docs.modx.pro/components/flatfilters/snippets/ffgetfiltersform) to output the filter form:

```fenom:line-numbers
{set $pageLimit = 8}
{set $configId = 1}
{'!ffGetFilterForm' | snippet: [
    'configId' => $configId,
    'wrapper' => 'tpl.ffForm',
    'priceTplOuter' => 'tpl.ffRange',
    'favoriteTplOuter' => 'tpl.ffCheckbox',
    'newTplOuter' => 'tpl.ffCheckbox',
    'popularTplOuter' => 'tpl.ffCheckbox',
    'colorTplOuter' => 'tpl.ffCheckboxGroupOuter',
    'colorTplRow' => 'tpl.ffCheckboxGroup',
    'defaultTplOuter' => 'tpl.ffSelect',
    'defaultTplRow' => 'tpl.ffOption',
    'createdonTplOuter' => 'tpl.ffDateRange',
]}
```

Add a block for meta: result count, selected filters, filter time:

```fenom:line-numbers
{'tpl.Info' | chunk}
```

Then call the [Pagination](https://docs.modx.pro/components/sendit/pagination) snippet to show results:

```fenom:line-numbers
{set $presetName = 'filters.presetName' | placeholder}
<div class="row" data-pn-result="filters">
    {'!Pagination' | snippet: [
        'configId' => $configId,
        'snippet' => '!Pagination',
        'render' => '!msProducts',
        'presetName' => $presetName,
        'pagination' => 'filters',
        'resultBlockSelector' => '[data-pn-result="filters"]',
        'resultShowMethod' => 'insert',
        'hashParams' => 'filtersHash,sortby',
        'noDisabled' => 1,
        'tplEmpty' => '@INLINE <p>No products match the selected filters.</p>',

        'limit' => $pageLimit,
        'parents' => 0,
        'sortby' => ['Data.weight' => 'ASC'],
        'tpl' => 'Product row chunk',
        'includeTVs' => 'modifications',
        'includeThumbs' => 'small',
        'showUnpublished' => 1
    ]}
</div>
```

Add the pagination block:

```fenom:line-numbers
<!-- PAGINATION -->
{set $totalPages = 'filters.totalPages' | placeholder}
{set $limit = 'filters.limit' | placeholder}
<div data-pn-pagination="filters" data-pn-type="" class="{$totalPages < 2 ? 'v_hidden' : ''} d-flex justify-content-between flex-wrap py-5" style="gap:10px;">
    <button class="btn btn-warning w-100" type="button" data-pn-more>Load more</button>
    <div class="d-flex align-items-center" style="gap:10px;">
        <button type="button" class="btn btn-primary" data-pn-first="1">&#10094;&#10094;</button>
        <button type="button" class="btn btn-primary" data-pn-prev>&#10094;</button>
        <input type="number" name="filterspage" data-pn-current data-si-preset="{$presetName}" form="filterForm" min="1" max="{$totalPages}"
               value="{$.get['filterspage']?:1}">
        <p class="d-flex align-items-center mb-0">of
            <span data-pn-total="">{$totalPages?:1}</span>
        </p>
        <button type="button" class="btn btn-primary" data-pn-next>&#10095;</button>
        <button type="button" class="btn btn-primary" data-pn-last="{$totalPages}">&#10095;&#10095;</button>
    </div>

    <p class="mb-0">Show <input type="number" name="limit" data-pn-limit form="filterForm" min="1" max="96" value="{$limit?:12}"> per page</p>
</div>
```

## How it works

When you create a config you choose its type. Each type has two handler classes: indexing and filtering.
:::tip
Type-to-class mapping is in the file set by **ff_path_to_types** (default **components/flatfilters/types.inc.php**).
:::
:::danger
Do not edit **components/flatfilters/types.inc.php**. Copy it elsewhere if you need to change it.
:::
Saving a config creates a table **ff_indexes_*config-id*** with **id**, **rid**, and one column per filter.
:::tip
After changing filter types or count, re-run indexing.
:::
Indexing is what makes this fast compared to mFilter2. Plugins on resource/product/user events keep the index up to date.

Then the snippets take over.

**ffGetFilterForm** outputs the form and runs the filter; results are stored in the session.

**Pagination** reads from the session and renders with the snippet set in **render**.

When filter values change, filtering runs again.

Filtering runs in a plugin on **OnBeforePageRender**: **getFilterResult()** returns the list of IDs and sets placeholders.
:::danger
FlatFilters does not render results or pagination.
:::

## System settings

:::tip
**ff_allowed_tpls** — templates included in indexing and whose TVs are available for filters.
:::

| Key | Description | Default |
|:---:|:---|:---:|
| **ff_allowed_tpls** | Templates allowed for indexing | |
| **ff_connector** | Connector snippet name | *ffConnector* |
| **ff_js_config_path** | Path to JavaScript config | *./flatfilters.inc.js* |
| **ff_js_path** | Frontend JavaScript path | *assets/components/flatfilters/js/web/flatfilters.js* |
| **ff_path_to_types** | Path to config type definitions | *components/flatfilters/types.inc.php* |
| **ff_preset_names** | Preset names | *{"filtering":"flatfilters","disabling":"ff_disabling","total":"ff_total"}* |
| **ff_show_groups_panel_for** | Show group selector for | *customers* |
| **ff_show_parents_panel_for** | Show parent selector for | *resources,products* |
| **ff_tpls** | Templates where filters are shown | *1* |
