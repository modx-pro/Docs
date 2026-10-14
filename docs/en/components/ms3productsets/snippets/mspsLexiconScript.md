---
title: mspsLexiconScript
---
# Snippet mspsLexiconScript

Adds lexicon and config for `productsets.js` to the page.

After the call:

- `window.mspsLexicon`: `empty`, `added`, `add_failed`, `removed`, `set_added`, `go_catalog`, `error`
- `window.mspsConfig`: `maxItems`, `lang`, `toastTimeout` (`4000`), `toastPosition` (`topRight`)

Include **before** `productsets.js`.

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
