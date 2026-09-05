---
title: Snippets
description: Overview of the ms3OptionsColor snippet and chunks
---

# Snippets

The package ships one storefront snippet. Chunks connect via the `tpl` parameter or run on their own (select, cart, mFilter).

| Snippet | Purpose |
| --- | --- |
| [ms3OptionsColor](ms3OptionsColor) | Swatches, `<option>` rows for select, `return=data` array |

## Package chunks

| Chunk | When to use |
| --- | --- |
| `tplMs3OptionsColor` | Color square on the product page and in the catalog (snippet default) |
| `tplMs3OptionsColorSelect` | Ready `<select>` with label and option rows |
| `tplMs3OptionsColorSelectOption` | Single `<option>` with `data-color` / `data-pattern` |
| `tplMs3OptionsColorCart` | Example color block in a cart line |
| `tplMFilterMs3OptionsColor` | mFilter row for type `ms3oc` |

Stock chunks use Fenom. Styles rely on `data-ms3oc-*`, not theme CSS class names.

## Where to start

1. Parameters and call examples: [ms3OptionsColor](ms3OptionsColor)
2. Product page, select, cart, catalog: [Frontend](/components/ms3optionscolor/frontend)
3. Filter type `ms3oc`: [mFilter](/components/ms3optionscolor/mfilter)
4. Variant colors: [ms3variants](/components/ms3optionscolor/ms3variants)
5. Default option key: [System settings](/components/ms3optionscolor/settings)
