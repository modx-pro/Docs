---
title: msGoodsLinks
description: Navigation, internal linking
logo: https://modstore.pro/assets/extras/msgoodslink/logo-lg.png
author: prihod
modstore: https://modstore.pro/packages/other/msgoodslink
---

# msGoodsLinks

msGoodsLinks is a navigation tool for creating internal links by product options and properties in miniShop2. It lets you set links from a product to categories that contain that product.

The main idea is to let site visitors go to a prepared category of similar products when they click an option or property. msGoodsLinks improves UX (handy links to similar products) and behavioral metrics (time on site, depth, lower bounce), and helps with SEO.

Useful for online stores that categorize products and do SEO. We recommend using it with msProductsComposerSelection.

Thanks to [DSMC](https://dsmc.agency/) for help with development and testing.

[![](https://file.modx.pro/files/3/5/8/358d2d91e94d914b8d426bde0b9ebed4s.jpg)](https://file.modx.pro/files/3/5/8/358d2d91e94d914b8d426bde0b9ebed4.png)

[![](https://file.modx.pro/files/6/3/b/63b925878bacc66a6cfdaef400a19362s.jpg)](https://file.modx.pro/files/6/3/b/63b925878bacc66a6cfdaef400a19362.png)

## Snippets

### Output link list

#### Parameters

| Name          | Description                                                                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `up`         | Look for links in parent categories if the current category has none. Default: `1`.                                                           |
| `id`         | Product ID to return links for. Default: ID of the resource where the snippet is called.                                                    |
| `cid`        | Category ID to search for links. If set, `up` is ignored. Default: `0`.                                                                        |
| `return`     | Output format. Use "data" to return an array.                                                                                                 |
| `scheme`     | URL scheme. Default: `-1`                                                                                                                     |
| `tpl`        | Chunk for output. If empty, raw fields are printed. Default: `tpl.msGoodsLink`.                                                              |
| `tplEmpty`   | Chunk for empty result.                                                                                                                       |
| `tplWrapper` | Wrapper chunk for all results. One placeholder: `[[+output]]`.                                                                             |

## Usage in msProductOptions chunk

```fenom
{set $links = $_modx->runSnippet('msGoodsLink',['return'=>'data'])}
{foreach $options as $option}
    <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{$option.caption}:</label>
        <div class="col-6 col-md-9">
            {if $option.value is array}
                {set $count = count($option.value)-1}
                {foreach $option.value as $idx => $val}
                    {set $keyVal = "{$key}{$val|md5}"}
                    {if $links[$keyVal]?}<a href="{$links[$keyVal]['link']}" target="_blank">{$val}</a>{else}{$val}{/if}{if $idx < $count}, {/if}
                {/foreach}
            {else}
                {set $keyVal = "{$key}{$option.value|md5}"}
                {if $links[$keyVal]?}<a href="{$links[$keyVal]['link']}" target="_blank">{$option.value}</a>{else}{$option.value}{/if}
            {/if}
        </div>
    </div>
{/foreach}
```
