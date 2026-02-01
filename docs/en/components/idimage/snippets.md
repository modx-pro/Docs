## Snippets

### idImageSimilar

The `idImageSimilar` snippet **only provides** the IDs of products that are similar to the current product.

It **does not render** the product block; it only passes similar product data for you to use.

```modx
[[!idImageSimilar]]
[[!msProducts?
    &resources=`[[+idimage.ids]]`
    &sortby=`FIELD(msProduct.id, [[+idimage.ids]])`
    &tpl=`@FILE chunks/catalog/product.row.tpl`
    &parents=`0`
]]
```

**Placeholders**

Set when calling idImageSimilar:

**idimage.ids** — list of product IDs sorted by similarity  
**idimage.probability** — similarity percentages (product id => percentage)

**Parameters**

| Name            | Default              | Description                                                                                                                              |
|-----------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **&pid**        | $modx->resource->id  | Product ID to get similar images for                                                                                                     |
| **&min_scope**  | 70                   | Minimum similarity 0–100. Lower values allow more different images                                                                       |
| **&max_scope**  | 100                  | Maximum similarity 100–0 (default 100; 100 means identical to original)                                                                  |
| **&limit**      | 10                   | Number of similar product IDs to return                                                                                                 |

::: code-group

```fenom
# store product IDs in placeholder idimage.ids
{$modx->runSnippet('idImageSimilar', [
  'min_scope' => 65
])}

{var $ids = $modx->getPlaceholder('idimage.ids')}
{if  $ids}
  {$modx->runSnippet('msProducts', [
    'tpl' => '@FILE chunks/catalog/product.row.tpl',
    'resources' => $ids,
    'sortby' => "FIELD(msProduct.id, {$ids})",
    'parents' => 0,
  ])}
{/if}
```

```php
# Similarity percentage
{var $similar= 'idimage.probability' | placeholder}
{var $probability = $similar[$id]}
```

:::
