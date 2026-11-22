---
title: ms3rvLexiconScript
---
# Snippet ms3rvLexiconScript

Sets `window.ms3rvLexicon` and `window.ms3rvConfig`.

Include **before** `viewed.js` so JS takes strings and limit from the snippet.

## Parameters

Optional **`cultureKey`**: lexicon language. Empty = context `cultureKey`, then site `cultureKey`, then `en`.

`ms3rvConfig` keys: `maxItems`, `storageType`, `cultureKey`, `isAuthenticated`, `userId`.

`window.ms3rvLexicon` contains only `empty` (`ms3recentlyviewed_empty`). The card label `ms3recentlyviewed_item_title` is not in that JSON. The list snippets put it in the `ms3rv_item_title` placeholder.

The snippet does not read chunk `tplMs3rvLexiconScript`. It builds the markup itself: hidden `#ms3rv-lexicon-data` and `#ms3rv-config-data`, then a short script.

## Usage

::: code-group

```fenom
{'ms3rvLexiconScript' | snippet}
```

```modx
[[!ms3rvLexiconScript]]
```

:::

If you skip it, an empty list uses “Вы ещё ничего не смотрели”, storage stays `localStorage` and the JS limit is 20.
