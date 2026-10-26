---
title: mspsLexiconScript
---
# Snippet mspsLexiconScript

Adds lexicon and config for `productsets.js` to the page.

- `window.mspsLexicon`: `empty`, `added`, `add_failed`, `removed`, `set_added`, `go_catalog`, `error`
- `window.mspsConfig`: `maxItems`, `lang`, `toastTimeout` (`4000`), `toastPosition` (`topRight`)

Include **before** `productsets.js`.

Chunk `tplMspsLexiconScript` writes only the `empty` key, and only when `window.mspsLexicon` is missing. iziToast, `maxItems`, `toastTimeout`, and `toastPosition` come from the snippet. The storefront needs the snippet.

## Parameters

The snippet has no required parameters. It uses current `cultureKey` and setting `ms3productsets.max_items`.

## Usage

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
```

```modx
[[!mspsLexiconScript]]
```

:::
