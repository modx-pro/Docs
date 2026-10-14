---
title: ms3rvLexiconScript
---
# Snippet ms3rvLexiconScript

Adds a script with lexicon and config: `window.ms3rvLexicon` and `window.ms3rvConfig`.

Include **before** the `viewed.js` script so the JS uses the correct strings and limit.

## Parameters

Optional **`cultureKey`**: lexicon language. Empty = context `cultureKey`, then site `cultureKey`, then `en`.

`ms3rvConfig` keys: `maxItems`, `storageType`, `cultureKey`, `isAuthenticated`, `userId`.

## Usage

::: code-group

```fenom
{'ms3rvLexiconScript' | snippet}
```

```modx
[[!ms3rvLexiconScript]]
```

:::

If not included, `viewed.js` falls back to default (Russian) phrases. For a multilingual site, outputting the lexicon is required.

Lexicon keys (namespace `ms3recentlyviewed`): `ms3recentlyviewed_empty`, `ms3recentlyviewed_item_title`, and others.
