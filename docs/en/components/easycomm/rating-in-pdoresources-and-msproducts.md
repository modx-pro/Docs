# Rating in snippets pdoResources, msProducts

A common question is how to output rating when using mFilter2, msProducts, pdoResources, etc.

There are two approaches:

## Option 1. Call snippet ecThreadRating

To output a product rating, call ecThreadRating in the chunk for each product (default chunk is tpl.msProducts.row).

The important part is the **thread** parameter. In MODX parser syntax:

::: code-group

```modx
[[ecThreadRating?
  &thread=`resource-[[+id]]`
]]
```

```fenom
{'ecThreadRating' | snippet: [
  'thread' => 'resource-' ~ $id,
]}
```

:::

This is simple but with many products per page you get many DB queries and slower pages.

For 5–20 products it is usually fine; for 50+ consider the next option.

## Option 2. Join data (JOIN)

Use a JOIN to get the data in one query.

Two options for joining:

- ecThread's **resource** field points to the product (or page)
- ecThread's **name** field also contains the resource id (e.g. resource-42)

If each product has one thread (e.g. reviews), you can JOIN by resource:

```modx
&loadModels=`easycomm`
&leftJoin=`{
  "ecThread": {
    "class": "ecThread",
    "on": "msProduct.id = ecThread.resource"
  }
}`
&select=`{
  "msProduct": "*",
  "ecThread": "ecThread.rating_simple AS rating"
}`
```

In select we only take rating_simple as rating; add more fields if needed.

The above fails if a product has more than one thread (e.g. Reviews and Q&A). Then you must use ecThread.name.

In the example below we get rating from one thread (Rating) and question count from another (QA). Thread names are resource-rating-XX and resource-qa-XX.

```modx
&loadModels=`easycomm`
&leftJoin=`{
  "ecThreadRating": {
    "class": "ecThread",
    "alias": "ecThreadRating",
    "on": " CONCAT('resource-rating-', modResource.id) = ecThreadRating.name"
  },
  "ecThreadQA": {
    "class": "ecThread",
    "alias": "ecThreadQA",
    "on": " CONCAT('resource-qa-', modResource.id) = ecThreadQA.name"
  }
}`
&select=`{
  "modResource": "*",
  "ecThreadRating": "ecThreadRating.rating_simple AS rating",
  "ecThreadQA": "ecThreadQA.count AS qa_count"
}`
```

We use `CONCAT` to build the thread name from the resource id and filter by it. Adapt this pattern for your site.
