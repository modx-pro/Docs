---
title: ms3fLexiconScript
---
# Snippet ms3fLexiconScript

Adds a script with lexicon and frontend config to the page. `window.ms3fLexicon` and `window.ms3fConfig` get site language, `maxItems`, `storageType`, `connectorUrl`, etc.

Load **before** `favorites.js` so the JS uses the correct strings and limit.

Uses Fenom chunk **tplMs3fLexiconScript**.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **cultureKey** | Lexicon language (`ru`, `en`) | from context or `cultureKey` |
| **resource_type** | Default resource type | `products` |

maxItems and storageType come from system settings `ms3favorites.max_items`, `ms3favorites.storage_type`.

## Usage

::: code-group

```fenom
{'ms3fLexiconScript' | snippet}
```

```modx
[[!ms3fLexiconScript]]
```

:::

If not loaded, `favorites.js` falls back to Russian strings. For a multilingual site the lexicon is required.

## Keys in window.ms3fLexicon

| Key | Description |
|-----|-------------|
| `empty` | Empty list |
| `added` | Added to favorites |
| `removed` | Removed from favorites |
| `add_tooltip` | Add tooltip |
| `remove_tooltip` | Remove tooltip |
| `list_default`, `list_gifts`, `list_plans` | List names |
| `share_title`, `share_copy_link`, `share_success` | Sharing |
| `add_to_cart`, `add_selected` | Cart |
| `comment_placeholder`, `comment_updated` | Notes |

## Keys in window.ms3fConfig

| Key | Description |
|-----|-------------|
| `maxItems` | Max items in list |
| `storageType` | `localStorage` or `cookie` |
| `cultureKey` | Language |
| `maxLists` | Max number of lists |
| `resourceType` | Resource type |
| `connectorUrl` | Connector URL |
| `commentsEnabled` | Whether item notes are enabled |
