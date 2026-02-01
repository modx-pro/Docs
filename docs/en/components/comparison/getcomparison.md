# getComparison

Snippet to output a link to the current comparison list anywhere (e.g. in the header).

## Parameters

| Name | Default | Description |
|------|---------|-------------|
| **&list** | `default` | Name of the comparison list. |
| **&tpl** | `tpl.Comparison.get` | Chunk for the comparison link. |

## Page call

Default call:

```modx
[[!getComparison]]
```

![Page call](https://file.modx.pro/files/4/e/b/4ebd312439d1736e182fc3ff495dbcd6.png)

## How it works

The snippet reads the comparison list from the user session and outputs a link to the page set as `list_id` in [addComparison](addcomparison).

The default chunk uses classes so the link updates via ajax when products are added or removed from the list (e.g. getComparison in the header, catalog below — the header link updates when the user adds/removes from comparison).

On the comparison page where [CompareList](comparelist) is called for this list, the link is not shown.
