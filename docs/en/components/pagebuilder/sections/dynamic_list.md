---
title: "Dynamic list"
description: "Rows from a datasource provider. Capability datasources. Pro layer."
---

# Dynamic list

Section `dynamic_list` shows provider rows at render time. Chunk: `pagebuilderpro_dynamic_list`. Requires PageBuilder Pro and capability `datasources`.

![Dynamic list](/components/pagebuilder/screenshots/sections/dynamic_list.jpg)

Providers: `modx-resources`, `pagebuilder-tables`, `minishop3`. In `datasource` you pick the provider and, when needed, a table key, filters, sort, and limit. Enrich calls `DatasourceQueryService` and passes `items` and `total` into the chunk.

Manager preview: `mgr/datasource/query`.

The section is part of the page context so the HTML cache does not freeze the live list. Without Pro the published HTML is not rebuilt: the type has `requires: ["pro"]`.

## Query

The query accepts only declared fields and operators `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. `contains` is case-insensitive, including Cyrillic. `QueryPolicy` rejects keys `sql`, `php`, `snippet`, and `class`. A limit above 100 fails.

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `datasource` | datasource | yes | Provider, filters, sort, limit |
| `limit` | number | no | Row limit |

## Render

`ProSectionRenderSupport` fills `items`. The row label follows `pagetitle`, then `title`, `name`, `label`, `id`. A link exists only when `uri` is set. Otherwise the label is a `<span>`. If a row has `image`, the card shows it.

A failed query is stored in `query_error`. Without capability `datasources` the text is `Datasources are not available.` An empty provider yields `Datasource is not configured.` An empty result uses lexicon `pagebuilder_fe_list_empty`, fallback `No items.`

## Section data {#output-in-section-data}

```json
{
  "title": "News",
  "datasource": {
    "provider": "modx-resources",
    "table": "",
    "filters": [{ "field": "parent", "op": "eq", "value": "5" }],
    "sort": [{ "field": "publishedon", "direction": "desc" }],
    "search": "",
    "limit": 20
  },
  "limit": 8
}
```

## Chunk template

Fenom chunk `pagebuilderpro_dynamic_list`:

```fenom
<section class="pb-section pb-section--dynamic-list" data-pb-section="dynamic_list"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    {if $query_error}
      <p class="pb-dynamic-list__error" role="status">{$query_error|escape}</p>
    {elseif !$items || $items|count == 0}
      <p class="pb-dynamic-list__empty" role="status">{$lex_empty|default:'No items.'|escape}</p>
    {else}
      <ul class="pb-dynamic-list__items">
        {foreach $items as $item}
          <li class="pb-dynamic-list__item">
            {set $label = $item.pagetitle|default:$item.title|default:$item.name|default:$item.label|default:$item.id}
            {if $item.image}
              <img class="pb-dynamic-list__image" src="{$item.image|escape}" alt="{$label|escape}" loading="lazy" />
            {/if}
            {if $item.uri}
              <a href="{$item.uri|escape}">{$label|escape}</a>
            {elseif $item.alias}
              <span>{$label|escape}</span>
            {else}
              <span>{$label|escape}</span>
            {/if}
          </li>
        {/foreach}
      </ul>
    {/if}
  </div>
</section>
```

## Similar sections

- [Filterable grid](filterable_grid) for filters and pagination
- [Blog posts](blog_posts) for child resources via `pdoResources`

## Related pages

- [Section catalog](index)
- [PageBuilder Pro](../pro)
