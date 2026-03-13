---
title: ms3FavoritesPopularity
---
# Snippet ms3FavoritesPopularity

Shows how many users added the resource to favorites (e.g. “In 12 users’ favorites”).

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **resource_id** | Resource ID (required) | — |
| **resource_type** | Resource type: `products`, `resources` | `products` |
| **tpl** | Output chunk. Placeholders: `[[+count]]`, `[[+resource_id]]`, `[[+text]]`. Empty — number only | — |
| **minCount** | Do not output if `count < minCount` | `0` |

## Chunk placeholders

| Placeholder | Description |
|-------------|-------------|
| `[[+count]]` | User count |
| `[[+resource_id]]` | Resource ID |
| `[[+text]]` | Text from lexicon (ms3favorites_popularity) |

## Examples

**In product card:**

::: code-group
```modx
<span class="ms3f__popularity">[[!ms3FavoritesPopularity? &resource_id=`[[+id]]`]]</span>
```

```fenom
<span class="ms3f__popularity">{'!ms3FavoritesPopularity' | snippet : ['resource_id' => $id]}</span>
```
:::

**With minimum threshold (hide if less than 2):**

::: code-group
```modx
[[!ms3FavoritesPopularity?
  &resource_id=`[[+id]]`
  &minCount=`2`
]]
```

```fenom
{'!ms3FavoritesPopularity' | snippet : [
  'resource_id' => $id,
  'minCount' => 2
]}
```
:::

**With custom chunk:**

::: code-group
```modx
[[!ms3FavoritesPopularity?
  &resource_id=`[[+id]]`
  &tpl=`tplPopularityBadge`
]]
```

```fenom
{'!ms3FavoritesPopularity' | snippet : [
  'resource_id' => $id,
  'tpl' => 'tplPopularityBadge'
]}
```
:::

**Client-side load** (connector action `get_popularity`):

```javascript
fetch(connectorUrl, {
  method: 'POST',
  body: new URLSearchParams({ action: 'get_popularity', ids: '1,2,3', resource_type: 'products' })
}).then(r => r.json()).then(counts => { /* {1: 5, 2: 12, 3: 0} */ });
```
