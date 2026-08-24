---
title: "Data table"
description: "Rows from a PageBuilder embedded table (embeddedTable) (Pro)"
---

# Data table

Data lives in CMP or the resource **Tables** tab; the section only renders a chosen table with a row limit.

<!-- ![Data table](/components/pagebuilder/screenshots/sections/data_table.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why this section

- One CMP table, many sections can share a `table_key`
- Update price list without editing every page
- Row limit per section

## When to use

- **Service price list**
- **Event schedule**
- **Pickup points** from one data source

## Page examples

- Services: [Hero](hero) → [Data table](data_table) price list → [FAQ](faq)
- Event: [Data table](data_table) schedule → [Contact form](contact_form)

## Inspector tips

In **Table**, set `table_key` from CMP and a row **Limit**. Edit data outside the section inspector.

## Similar sections

- [Spec table](spec_table) for fixed pairs on one page
- [Rich text](richtext) for one-off copy without CMP

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `data_table` |
| Layer | Pro |
| Category | content (`content`) |
| Chunk | `pagebuilder_data_table` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Intro (`intro`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

### Table (`table`)

Type [embeddedTable](../fields/embeddedTable#output-in-section-data). Required. Link to a PageBuilder CMP table: table key and row limit.

## Site output

`pb-data-table` HTML table.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "intro": "Краткое вступление перед основным содержимым.",
  "table": {
    "table_key": "prices",
    "limit": 10
  }
}
```

## Chunk template

Fenom chunk `pagebuilder_data_table`:

```fenom
<section class="pb-section pb-section--data-table pb-data-table{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="data_table"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-data-table__inner">
    {if $title}
      <h2 class="pb-heading pb-data-table__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-data-table__intro">{$intro|escape}</p>
    {/if}
    {if $table.table_key}
      <div class="pb-data-table__embed">
        {set $tableKey = $table.table_key}
        {set $tableLimit = $table.limit|default:20}
        {$modx->runSnippet('PageBuilderTableRows', [
          'table_key' => $tableKey,
          'limit' => $tableLimit,
          'return' => 'html'
        ])}
      </div>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/data_table.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
