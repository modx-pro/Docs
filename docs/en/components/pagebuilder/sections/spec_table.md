---
title: "Spec table"
description: "Parameter / value table with optional intro text (Pro)"
---

# Spec table

Two-column table for technical data. Optional title and intro above the table.

![Spec table](/components/pagebuilder/screenshots/sections/spec_table.jpg)

::: info
Requires PageBuilder Pro.
:::

## Specs in a table

- Parameter/value rows, not buried in prose
- Optional intro and section title
- `table` field edits in the inspector

## Typical pages

- Product page: weight, size, material
- Equipment page: specs
- Single product spec sheet

## Page examples

- Product copy: [Tabs](tabs) → “Specs” tab = [Spec table](spec_table)
- Equipment: [Hero](hero) → [Spec table](spec_table) → [CTA](cta)

## Spec table

**Specifications** table field: parameter and value columns. **Striped rows** enables zebra styling.

## Similar sections

- [Data table](data_table) for CMP embeddedTable rows
- [Product comparison](product_comparison) for multiple SKUs (MS3)

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `spec_table` |
| Layer | Pro |
| Category | content (`content`) |
| Chunk | `pagebuilderpro_spec_table` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Intro (`intro`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

### Specifications (`specs`)

Type [table](../fields/table#output-in-section-data). Required. Table with fixed columns.

Columns:

| Column | Type | Label |
| --- | --- | --- |
| `label` | text | Parameter |
| `value` | text | Value |

The inspector supports group rows (`_pbGroup`), cell merges (`_span` on `label` / `value`), and a preview under the grid.

### Striped rows (`striped`)

Type [yesno](../fields/yesno#output-in-section-data). Optional. Yes/no toggle.

## Site output

HTML table `pb-spec-table`. With `striped`, the class `pb-spec-table--striped` is added. Groups use `pb-spec-table__row--group`. Rows fully covered by a span use `pb-spec-table__row--span-cont`.

## Section data {#output-in-section-data}

Example payload after save. On output Pro adds `spec_rows` via `TableCells::present()` (`_pb_cells` on each row):

```json
{
  "title": "Specifications",
  "intro": "Main product parameters.",
  "striped": true,
  "specs": [
    { "label": "Dimensions", "value": "", "_pbGroup": true },
    {
      "label": "Storage",
      "value": "128 GB",
      "_span": { "value": { "colspan": 1, "rowspan": 2 } }
    },
    { "label": "With case", "value": "" },
    { "label": "Color", "value": "Graphite" }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_spec_table` uses `$spec_rows`, otherwise `$specs`:

```fenom
{set $rows = $spec_rows|default:($specs|default:[])}
<section class="pb-section pb-section--spec-table pb-spec-table{if $striped} pb-spec-table--striped{/if}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="spec_table"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-spec-table__inner">
    {if $title}
      <h2 class="pb-heading pb-spec-table__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-spec-table__intro">{$intro|escape}</p>
    {/if}
    {if $rows && ($rows | length) > 0}
      <div class="pb-spec-table__scroll">
        <table class="pb-spec-table__table">
          <thead>
            <tr>
              <th scope="col">{'pagebuilder_fe_spec_param' | lexicon}</th>
              <th scope="col">{'pagebuilder_fe_spec_value' | lexicon}</th>
            </tr>
          </thead>
          <tbody>
            {foreach $rows as $row}
              {if $row._pbGroup}
                <tr class="pb-spec-table__row--group">
                  <th colspan="2" scope="colgroup">{$row.label|default:''|escape}</th>
                </tr>
              {elseif $row._pb_cells.label.hidden && $row._pb_cells.value.hidden}
                <tr class="pb-spec-table__row--span-cont" aria-hidden="true"></tr>
              {else}
                <tr>
                  {if !$row._pb_cells.label.hidden}
                    <th scope="row" colspan="{$row._pb_cells.label.colspan|default:1}" rowspan="{$row._pb_cells.label.rowspan|default:1}">{$row.label|default:''|escape}</th>
                  {/if}
                  {if !$row._pb_cells.value.hidden}
                    <td colspan="{$row._pb_cells.value.colspan|default:1}" rowspan="{$row._pb_cells.value.rowspan|default:1}">{$row.value|default:''|escape}</td>
                  {/if}
                </tr>
              {/if}
            {/foreach}
          </tbody>
        </table>
      </div>
    {else}
      <p class="pb-spec-table__empty">{'pagebuilder_fe_spec_empty' | lexicon}</p>
    {/if}
  </div>
</section>
```

Cell text is escaped (`|escape`). HTML from the editor is not executed on the site.

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
