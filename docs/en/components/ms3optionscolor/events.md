---
title: Events
description: ms3OptionsColor plugin hooks and dictionary events
---

# Events

## Plugin subscriptions

The **ms3OptionsColor** plugin listens to:

| Event | Action |
| --- | --- |
| `OnLoadWebDocument` | Loads storefront swatch CSS when `ms3optionscolor_frontend_css` is on |
| `msOnManagerCustomCssJs` | Swatches tab and color squares in option chips on the product card |
| `OnMFilterInit` | Registers filter type `ms3oc` |
| `msOnProductPrepare` | Adds dictionary colors to catalog variants (after ms3variants) |

```mermaid
flowchart LR
  Web[OnLoadWebDocument] --> Css[Storefront CSS]
  Mgr[msOnManagerCustomCssJs] --> Tab[Swatches tab]
  Mf[OnMFilterInit] --> Type[Type ms3oc]
  Prep[msOnProductPrepare] --> Sw[variants.swatches]
```

Put your own logic in a separate plugin. On `OnMFilterInit` register another type key. Do not overwrite `ms3oc` if you want a parallel type.

### Enriching ms3variants

The package does not create variants and does not change price, stock, or `_variant_id`. It only enriches the variant list already prepared by ms3variants:

```mermaid
sequenceDiagram
  participant List as msProducts
  participant V as ms3variants
  participant OC as ms3OptionsColor
  participant D as Dictionary
  List->>V: msOnProductPrepare
  V->>V: variants on row
  V->>OC: msOnProductPrepare continues
  OC->>OC: variants_decorate on?
  OC->>D: color map
  D-->>OC: HEX / pattern / title
  OC->>List: variants.swatches
```

1. Reads setting `ms3optionscolor_variants_decorate`.
2. If the catalog row has `variants`, loads the color dictionary once per request.
3. On matching key and value writes `color`, `pattern`, `title` into `swatches`.
4. Updates `variants_json` for the chunk.

The listing needs `usePackages=ms3Variants`. Markup example: [ms3variants](ms3variants).

## Dictionary events

When a color is saved or removed in the dictionary:

```mermaid
sequenceDiagram
  participant UI as Manager
  participant S as ColorService
  participant P as Your plugin
  participant DB as Database
  UI->>S: Save color
  S->>P: ms3ocColorBeforeSave
  P-->>S: may edit fields
  S->>DB: save
  S->>P: ms3ocColorSave
  UI->>S: Delete color
  S->>P: ms3ocColorBeforeRemove
  S->>DB: remove
  S->>P: ms3ocColorRemove
```

| Event | When | Parameters |
| --- | --- | --- |
| `ms3ocColorBeforeSave` | before DB write | `color` object, source `data` |
| `ms3ocColorSave` | after successful write | `color` object |
| `ms3ocColorBeforeRemove` | before delete | `color` object |
| `ms3ocColorRemove` | after delete | `color` object |

You cannot cancel save via returnedValues. In `BeforeSave` you may change fields on `$color`. The original array stays in `data`. After save read the final object in `ms3ocColorSave`.

## Plugin example

::: code-group

```php
<?php
/** @var modX $modx */
switch ($modx->event->name) {
    case 'ms3ocColorBeforeSave':
        /** @var xPDOObject $color */
        $color = $modx->getOption('color', $scriptProperties);
        if ($color && $color->get('title') === '') {
            $color->set('title', $color->get('value'));
        }
        break;
}
```

:::

Add your subscription under **Elements → Plugins → System Events**.
