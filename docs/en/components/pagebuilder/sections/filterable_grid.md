---
title: "Filterable grid"
description: "Datasource rows with filters, sort, and pagination. Pro layer."
---

# Filterable grid

Section `filterable_grid` shows rows with filters in the URL. On the site the form, sort, and pagination run through Ajax (`pagebuilder-filterable-grid.js`), and the address updates with `history.pushState`. Without JavaScript the form stays a normal GET. Chunk: `pagebuilderpro_filterable_grid`. Requires PageBuilder Pro and capability `datasources`.

![Filterable grid](/components/pagebuilder/screenshots/sections/filterable_grid.jpg)

1. Pick a datasource: `modx-resources`, `pagebuilder-tables`, or `minishop3`.
2. For tables set the `table` key.
3. On the site the form writes `pb_fg_{sectionId}_search`, `_sort`, `_dir`, `_page`, and `_f_{field}` into the URL. The reset button uses lexicon `pagebuilder_fe_filter_clear`.

Pagination in the chunk uses `range` and `foreach`. Fenom `{for}` is not supported here.

Query operators match the [dynamic list](dynamic_list): `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. `contains` is case-insensitive, including Cyrillic. Keys `sql`, `php`, `snippet`, and `class` are rejected. Page size is at most 100.

Filter labels come from the table schema column `label`, not from the field key. An `image` column is excluded from filters and sorting. The form maps field type to an operator: text → `contains`, number and currency → `gte`, color → `eq`. A page number past the last page is clamped to the last page.

The section is part of the page context so the HTML cache does not freeze the filter.

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `datasource` | datasource | yes | Provider and query |
| `limit` | number | no | Page size |

## Render

The form uses `method="get"`. `pagebuilder-filterable-grid.js` submits it with Ajax and writes the same parameters into the address with `history.pushState`. Without the script the form stays a normal GET. Parameter prefix is `pb_fg_{id}_`. `DatasourceSectionEnricher` writes it to `filter_param_prefix`. Names: `search`, `sort`, `dir`, `f_{field}`, `page`. Field `id` is skipped in the filter inputs.

Pagination is drawn when `page_count` is greater than 1. An empty result uses lexicon `pagebuilder_fe_filter_empty`, fallback `No items.` Errors match [dynamic list](dynamic_list).

## Section data {#output-in-section-data}

```json
{
  "title": "Catalog",
  "datasource": {
    "provider": "modx-resources",
    "table": "",
    "filters": [],
    "sort": [{ "field": "menuindex", "direction": "asc" }],
    "search": "",
    "limit": 12
  },
  "limit": 12
}
```

## Chunk template

Fenom chunk `pagebuilderpro_filterable_grid`:

```fenom
{set $prefix = $filter_param_prefix|default:'pb_fg_'}
{set $sectionDomId = $id|default:'filterable_grid'}
{set $qs = ''}
{if $search_value}{set $qs = $qs ~ '&' ~ $prefix ~ 'search=' ~ ($search_value|urlencode)}{/if}
{if $sort_field}{set $qs = $qs ~ '&' ~ $prefix ~ 'sort=' ~ ($sort_field|escape) ~ '&' ~ $prefix ~ 'dir=' ~ ($sort_direction|escape)}{/if}
{if $filter_values}
  {foreach $filter_values as $fname => $fval}
    {if $fval !== ''}{set $qs = $qs ~ '&' ~ $prefix ~ 'f_' ~ $fname ~ '=' ~ ($fval|urlencode)}{/if}
  {/foreach}
{/if}
<section
  class="pb-section pb-section--filterable-grid pb-filterable-grid"
  data-pb-section="filterable_grid"
  data-pb-filterable-grid
  data-pb-fg-prefix="{$prefix|escape}"
  data-pb-fg-loading="{$lex_loading|default:'Loading…'|escape}"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading pb-filterable-grid__title">{$title|escape}</h2>{/if}

    <form class="pb-filterable-grid__filters" method="get" action="" data-pb-fg-form>
      <div class="pb-filterable-grid__toolbar">
        <label class="pb-filterable-grid__search" for="pb-{$sectionDomId|escape}-search">
          <span class="pb-filterable-grid__label">{$lex_search|default:'Search'|escape}</span>
          <input
            id="pb-{$sectionDomId|escape}-search"
            class="pb-filterable-grid__control"
            type="search"
            name="{$prefix|escape}search"
            value="{$search_value|escape}"
            autocomplete="off"
          />
        </label>
        {if $datasource_field_defs}
          <label class="pb-filterable-grid__sort" for="pb-{$sectionDomId|escape}-sort">
            <span class="pb-filterable-grid__label">{$lex_sort|default:'Sort'|escape}</span>
            <select id="pb-{$sectionDomId|escape}-sort" class="pb-filterable-grid__control" name="{$prefix|escape}sort">
              <option value="">{$lex_select_placeholder|default:'—'|escape}</option>
              {foreach $datasource_field_defs as $field}
                {if $field.type == 'image' || $field.key == 'id'}{continue}{/if}
                <option value="{$field.key|escape}"{if $sort_field == $field.key} selected{/if}>{$field.label|default:$field.key|escape}</option>
              {/foreach}
            </select>
          </label>
          <label class="pb-filterable-grid__dir" for="pb-{$sectionDomId|escape}-dir">
            <span class="pb-filterable-grid__label">{$lex_direction|default:'Direction'|escape}</span>
            <select id="pb-{$sectionDomId|escape}-dir" class="pb-filterable-grid__control" name="{$prefix|escape}dir">
              <option value="asc"{if $sort_direction != 'desc'} selected{/if}>{$lex_dir_asc|default:'asc'|escape}</option>
              <option value="desc"{if $sort_direction == 'desc'} selected{/if}>{$lex_dir_desc|default:'desc'|escape}</option>
            </select>
          </label>
        {/if}
      </div>

      {if $datasource_field_defs}
        <fieldset class="pb-filterable-grid__fields">
          <legend class="pb-filterable-grid__legend">{$lex_filters_legend|default:'Filters'|escape}</legend>
          <div class="pb-filterable-grid__fields-grid">
            {foreach $datasource_field_defs as $field}
              {if $field.key == 'id' || $field.type == 'image'}{continue}{/if}
              {set $ftype = $field.type|default:'text'}
              {set $fid = 'pb-' ~ $sectionDomId ~ '-f-' ~ $field.key}
              {set $fval = $filter_values[$field.key]|default:''}
              <label class="pb-filterable-grid__field" for="{$fid|escape}">
                <span class="pb-filterable-grid__label">{$field.label|default:$field.key|escape}</span>
                {if $ftype == 'number' || $ftype == 'currency'}
                  <input
                    id="{$fid|escape}"
                    class="pb-filterable-grid__control"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    step="any"
                    name="{$prefix|escape}f_{$field.key|escape}"
                    value="{$fval|escape}"
                    placeholder="{$lex_price_from|default:''|escape}"
                  />
                {elseif $ftype == 'color' || $ftype == 'colorpalette'}
                  <span class="pb-filterable-grid__color">
                    <input
                      id="{$fid|escape}"
                      class="pb-filterable-grid__control pb-filterable-grid__control--color-text"
                      type="text"
                      name="{$prefix|escape}f_{$field.key|escape}"
                      value="{$fval|escape}"
                      placeholder="#2563eb"
                      spellcheck="false"
                      autocomplete="off"
                      data-pb-fg-color-text
                    />
                    <input
                      class="pb-filterable-grid__control pb-filterable-grid__control--color"
                      type="color"
                      value="{if $fval}{$fval|escape}{else}#2563eb{/if}"
                      aria-label="{$field.label|default:$field.key|escape}"
                      data-pb-fg-color-swatch
                      tabindex="-1"
                    />
                  </span>
                {else}
                  <input
                    id="{$fid|escape}"
                    class="pb-filterable-grid__control"
                    type="text"
                    name="{$prefix|escape}f_{$field.key|escape}"
                    value="{$fval|escape}"
                  />
                {/if}
              </label>
            {/foreach}
          </div>
        </fieldset>
      {/if}

      <div class="pb-filterable-grid__actions">
        <button type="submit" class="pb-button pb-filterable-grid__submit">{$lex_filter|default:'Filter'|escape}</button>
        <button type="reset" class="pb-button pb-button--secondary pb-filterable-grid__clear" data-pb-fg-clear>{$lex_clear|default:'Clear'|escape}</button>
      </div>
    </form>

    <div class="pb-filterable-grid__results" data-pb-fg-results aria-live="polite" aria-busy="false" aria-label="{$lex_results|default:'Results'|escape}">
      {if $query_error}
        <p class="pb-filterable-grid__error" role="alert">{$query_error|escape}</p>
      {elseif !$items || $items|count == 0}
        <p class="pb-filterable-grid__empty" role="status">{$lex_empty|default:'No items.'|escape}</p>
      {else}
        <div class="pb-filterable-grid__items">
          {foreach $items as $item}
            <article class="pb-filterable-grid__card">
              {set $label = $item.pagetitle|default:$item.title|default:$item.name|default:$item.label|default:$item.id}
              {if $item.image}
                {if $item.uri}
                  <a class="pb-filterable-grid__media" href="{$item.uri|escape}">
                    <img class="pb-filterable-grid__image" src="{$item.image|escape}" alt="{$label|escape}" loading="lazy" />
                  </a>
                {else}
                  <img class="pb-filterable-grid__image" src="{$item.image|escape}" alt="{$label|escape}" loading="lazy" />
                {/if}
              {/if}
              <div class="pb-filterable-grid__card-body">
                <h3 class="pb-filterable-grid__card-title">
                  {if $item.uri}
                    <a href="{$item.uri|escape}">{$label|escape}</a>
                  {else}
                    {$label|escape}
                  {/if}
                </h3>
                {if $item.price !== '' && $item.price !== null}
                  <p class="pb-filterable-grid__meta">{$item.price|escape} ₽</p>
                {/if}
                {if $item.uri && !$item.image}
                  <p><a class="pb-filterable-grid__open" href="{$item.uri|escape}">{$lex_open|default:'Open'|escape}</a></p>
                {/if}
              </div>
            </article>
          {/foreach}
        </div>
        {if $page_count > 1}
          <nav class="pb-filterable-grid__pagination" aria-label="{$lex_pagination|default:'Pagination'|escape}" data-pb-fg-pagination>
            {set $pages = range(1, $page_count)}
            {foreach $pages as $p}
              {if $p == $page}
                <span aria-current="page">{$p}</span>
              {else}
                <a href="?{$prefix|escape}page={$p}{$qs}" data-pb-fg-page="{$p}">{$p}</a>
              {/if}
            {/foreach}
          </nav>
        {/if}
      {/if}
    </div>
  </div>
</section>
```

## Similar sections

- [Dynamic list](dynamic_list) without a filter form
- [Products grid](products_grid) for a miniShop3 storefront via `msProducts`

## Related pages

- [Section catalog](index)
- [PageBuilder Pro](../pro)
