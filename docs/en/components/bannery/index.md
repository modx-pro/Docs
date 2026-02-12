---
title: BannerY
description: Component for managing site banners. Create banners and ad positions, link them, and output them where needed. Click statistics are tracked.
logo: https://modstore.pro/assets/extras/bannery/logo-lg.jpg
author: biz87
modstore: https://modstore.pro/packages/photos-and-files/bannery
repository: https://github.com/modx-pro/BannerY

items: [
  {
    text: 'Interface',
    items: [
      { text: 'Banners', link: 'interface/banners' },
      { text: 'Positions', link: 'interface/positions' },
    ],
  },
]
---
# BannerY

Component for managing site banners.

Create banners and ad positions, link them, and output them where needed. The Manager tracks click statistics.

## Parameters

| Name                    | Description                                                                                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **&positions**          | Comma-separated list of ad position IDs to show banners from.                                                                                                                                                                                                                        |
| **&showLog**            | Show extra snippet debug info. Only for users logged in to the "mgr" context.                                                                                                                                                                                                          |
| **&fastMode**           | Fast chunk processing. All unprocessed tags (conditions, snippets, etc.) are stripped.                                                                                                                                                                                                |
| **&limit**              | Maximum number of results.                                                                                                                                                                                                                                                            |
| **&offset**             | Number of results to skip.                                                                                                                                                                                                                                                            |
| **&sortby**             | Sort field. You can use "RAND()".                                                                                                                                                                                                                                                     |
| **&sortdir**            | Sort direction.                                                                                                                                                                                                                                                                       |
| **&outputSeparator**    | Optional string to separate results.                                                                                                                                                                                                                                                  |
| **&where**              | JSON-encoded array of extra query conditions.                                                                                                                                                                                                                                         |
| **&showInactive**       | Include disabled positions.                                                                                                                                                                                                                                                          |
| **&tpl**                | Chunk name for each banner. If empty, banner fields are printed as-is.                                                                                                                                                                                                                |
| **&tplFirst**           | Chunk for the first banner.                                                                                                                                                                                                                                                           |
| **&tplLast**            | Chunk for the last banner.                                                                                                                                                                                                                                                            |
| **&tplOdd**             | Chunk for every second banner.                                                                                                                                                                                                                                                        |
| **&tplWrapper**         | Wrapper chunk for all results. Accepts `[[+output]]`. Does not work with **&toSeparatePlaceholders**.                                                                                                                   |
| **&wrapIfEmpty**        | Output the **&tplWrapper** chunk even when there are no results.                                                                                                                                                                                                                      |
| **&toPlaceholder**      | If set, the snippet stores all data in a placeholder with this name instead of outputting.                                                                                                                                                                                           |
| **&toSeparatePlaceholders** | If you set a prefix here, each result is put in a placeholder named prefix + row index (from 0). E.g. "myPl" gives `[[+myPl0]]`, `[[+myPl1]]`, etc. |

## Examples

Create a banner and a position first. See the Interface section.

To show banners in random order (default), call the snippet uncached:

```modx
[[!BannerY? &positions=`2`]]
```
