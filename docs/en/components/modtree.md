---
title: ModTree
description: Linking resources to each other
logo: https://modstore.pro/assets/extras/modtree/logo-lg.png
author: visermort
modstore: https://modstore.pro/packages/ecommerce/modtree
modx: https://extras.modx.com/package/modtree
repository: https://github.com/visermort/ModTree
---
# ModTree

Component for linking site resources. Linked resources are shown as a tree on the page.

Create links between resources in the manager.

![Create links between resources](https://file.modx.pro/files/b/3/1/b31a66bf709cb4e4212e157d7c1d496d.jpg)

Demo: [examples](http://modtree.visermort.ru/examples.html).

On page load an initial query runs:

- ``&queryLinks=`1` `` (default) — linked resources for &parent (default: current resource),
- ``&queryLinks=`0` `` — child resources for &parent.

Clicking node icons then loads linked resources for those nodes.

Clicking a resource shows its content.

![Clicking a resource shows its content](https://file.modx.pro/files/4/1/1/41169caaac34dbce4a1215f8a61963ff.png)

Uses AJAX. jQuery not required.

## Snippet call examples

### Show child resources

```modx
&queryLinks=`0`
```

Show child resources of resource 7 on page load.

```modx
[[modTree?
  &parent=`7`
  &limitList=`5`
  &queryLinks=`0`
]]
```

### Show linked resources

Show linked resources of resource 15 on page load.

```modx
[[modTree?
  &parent=`15`
  &limitList=`5`
]]
```

### Snippet parameters

#### Display parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **&tplOuter** | `tpl.ModTree.outer` | Main template |
| **&tplList** | `tpl.ModTree.itemList` | Template for initial list items |
| **&tplTree** | `tpl.ModTree.itemTree` | Template for tree child items |
| **&tplSearchField** | `tpl.ModTree.itemSearchField` | Search field template |
| **&tplButtons** | `tpl.ModTree.paginateBtns` | Pagination buttons template |
| **&sortBy** | `menuindex` | Sort field |
| **&sortDir** | `ASC` | Sort direction |
| **&limit** | `0` | Max child resources |
| **&limitList** | `15` | Max initial query results |
| **&contentIdPrefix** | `modtree-` | ID prefix for content areas. With two or more snippet calls per page, use a different template and prefix per call. Content areas can be anywhere on the page |
| **&customCss** | `0` | 1 — do not load component CSS (use your own styles) |

#### Search parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **&queryLinks** | `1` | Initial query: `1` — linked resources, `0` — child resources |
| **&parent** | Current resource | Resource for initial query |
| **&queryForce** | `1` | When to run initial query: `1` — on page load, `0` — only on "Search" click |
| **&linkWay** | `0` | Link direction: `1` — master to slave, `-1` — slave to master, `0` — both |
| **&searchFields** | `pagetitle,content` | Comma-separated search fields. Use &searchFields=`` to disable |
