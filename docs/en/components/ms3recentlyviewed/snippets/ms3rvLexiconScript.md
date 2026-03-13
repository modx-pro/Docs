---
title: ms3rvLexiconScript
---
# Snippet ms3rvLexiconScript

Adds a script to the page with lexicon and config for the frontend. Puts site language and **max_items** setting value into `window.ms3rvLexicon` and `window.ms3rvConfig`.

Include **before** the viewed.js script so the JS uses the correct strings and limit.

## Parameters

The snippet has no required parameters; it uses the current context and system setting `ms3recentlyviewed.max_items`.

## Usage

::: code-group

```fenom
{'ms3rvLexiconScript' | snippet}
```

```modx
[[!ms3rvLexiconScript]]
```

:::

If not included, viewed.js falls back to default (Russian) phrases. For a multilingual site, outputting the lexicon is required.

Lexicon keys (namespace ms3recentlyviewed): e.g. `ms3recentlyviewed_empty`, `ms3recentlyviewed_item_title`, etc.
