---
title: "Tabs"
description: "Switchable panels with tab label and HTML content (Pro)"
---

# Tabs

Split long content into tabs: shipping, payment, specs. Each tab body is richtext HTML.

<!-- ![Tabs](/components/pagebuilder/screenshots/sections/tabs.png) -->

::: info
Requires PageBuilder Pro.
:::

## Tabs instead of a wall of text

- Long content without endless vertical scroll
- Each tab has an anchor for deep links
- Richtext inside panels

## Typical pages

- Product page: description / specs / reviews
- Service: steps, scope, FAQ
- Docs on one page

## Page examples

- Product: [Spotlight](product_spotlight) → [Tabs](tabs): description | specs | shipping
- Service: [Features](features) → [Tabs](tabs) → [FAQ](faq)

## Tab repeater

**Tabs** repeater: **Tab label**, **Anchor** (Latin slug), **Content**. Front-end switching uses `pagebuilder-sections.js`.

## Similar sections

- [FAQ](faq) for short Q/A pairs
- [Rich text](richtext) when tabs are overkill

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `tabs` |
| Layer | Pro |
| Category | content (`content`) |
| Chunk | `pagebuilderpro_tabs` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Tabs (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `label` | [text](../fields/text#output-in-section-data) | Tab label | yes |
| `anchor` | [slug](../fields/slug#output-in-section-data) | Anchor | no |
| `content` | [richtext](../fields/richtext#output-in-section-data) | Content | yes |

## Site output

`pb-tabs` with panels. Include section JS in your template.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "label": "Happy customers",
      "anchor": "tab-delivery",
      "content": "<p>Page text with <strong>formatting</strong>.</p>"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_tabs`:

```fenom
{var $tabCount = $items|count}
<section class="pb-section pb-section--tabs pb-tabs{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="tabs" data-pb-tabs{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-tabs__inner">
    {if $title}
      <h2 class="pb-heading pb-tabs__title">{$title|escape}</h2>
    {/if}
    {if $tabCount > 0}
      <div class="pb-tabs__nav" role="tablist" aria-label="{$title|default:'Tabs'|escape}">
        {foreach $items as $item}
          {var $anchor = $item.anchor|default:('tab-' ~ $item@index)}
          <button
            type="button"
            class="pb-tabs__tab{if $item@first} pb-tabs__tab--active{/if}"
            id="pb-tab-{$id|default:'section'}-{$item@index}"
            role="tab"
            aria-selected="{if $item@first}true{else}false{/if}"
            aria-controls="pb-panel-{$id|default:'section'}-{$item@index}"
            data-pb-tab="{$item@index}"
            data-pb-anchor="{$anchor|escape}"
          >
            {$item.label|escape}
          </button>
        {/foreach}
      </div>
      <div class="pb-tabs__panels">
        {foreach $items as $item}
          {var $anchor = $item.anchor|default:('tab-' ~ $item@index)}
          <div
            class="pb-tabs__panel{if $item@first} pb-tabs__panel--active{/if}"
            id="pb-panel-{$id|default:'section'}-{$item@index}"
            role="tabpanel"
            aria-labelledby="pb-tab-{$id|default:'section'}-{$item@index}"
            data-pb-panel="{$item@index}"
            data-pb-anchor="{$anchor|escape}"
            {if !$item@first}hidden{/if}
          >
            <details class="pb-tabs__accordion">
              <summary class="pb-tabs__accordion-summary">{$item.label|escape}</summary>
              <div class="pb-tabs__accordion-body pb-richtext__content">{$item.content}</div>
            </details>
            <div class="pb-tabs__desktop pb-richtext__content">{$item.content}</div>
          </div>
        {/foreach}
      </div>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/tabs.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
