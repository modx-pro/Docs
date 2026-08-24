---
title: "Spec table"
description: "Parameter / value table with optional intro text (Pro)"
---

# Spec table

Two-column table for technical data. Optional title and intro above the table.

<!-- ![Spec table](/components/pagebuilder/screenshots/sections/spec_table.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why this section

- Parameter/value rows, not buried in prose
- Optional intro and section title
- `table` field edits in the inspector

## When to use

- **Product page** — weight, size, material
- **Equipment page** — specs
- **Single product** spec sheet

## Page examples

- Product copy: [Tabs](tabs) → “Specs” tab = [Spec table](spec_table)
- Equipment: [Hero](hero) → [Spec table](spec_table) → [CTA](cta)

## Inspector tips

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

### Striped rows (`striped`)

Type [yesno](../fields/yesno#output-in-section-data). Optional. Yes/no toggle.

## Site output

HTML table `pb-spec-table`.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "intro": "Краткое вступление перед основным содержимым.",
  "striped": true
}
```

## Chunk template

Fenom chunk `pagebuilderpro_spec_table`:

```fenom
{var $rows = $spec_rows|default:($specs|default:[])}
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
              <th scope="col">Параметр</th>
              <th scope="col">Значение</th>
            </tr>
          </thead>
          <tbody>
            {foreach $rows as $row}
              <tr>
                <th scope="row">{$row.label|default:''|escape}</th>
                <td>{$row.value|default:''|escape}</td>
              </tr>
            {/foreach}
          </tbody>
        </table>
      </div>
    {else}
      <p class="pb-spec-table__empty">Добавьте строки характеристик в инспекторе.</p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/spec_table.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
