# getRemains snippet

Snippet for outputting remaining product quantity. Can output either total stock across all properties or for a specific product property combination.

If called without specifying one or more properties, the result will be total stock across all property combinations.

## Parameters

| Name      | Default       | Description                                  |
|-----------|---------------|----------------------------------------------|
| **&id**   | `Resource ID` | Product ID                                   |
| **&color**|               | Product color                                |
| **&size** |               | Product size                                 |
| **&return** | `data`      | Return number (data) or data array (json)    |

## Call options

For correct and accurate stock calculation, **the snippet should be called uncached**.

To get total stock on the product page:

```modx
[[!getRemains]]
```

To get stock for a specific property combination:

```modx
[[!getRemains?
  &id=[[+id]]
  &color=`color`
  &size=`size`
]]
```

To write the output to a placeholder, use the standard MODX filter:

```modx
[[!getRemains:toPlaceholder=`remains`?
  &id=[[+id]]
  &color=`color`
  &size=`size`
]]
```

## Stock data array

When calling the snippet like this:

```modx
[[!getRemains? &return=`json`]]
```

the response will be a product stock data array, for example:

```json
[{
  "id": 112,
  "options": {
    "color": "Red",
    "size":"Small"
  },
  "remains": 56
},
{
  "id": 113,
  "options": {
    "color": "Blue",
    "size": "Large"
  },
  "remains": 0
},
{
  "id": 114,
  "options": {
    "color": "Blue",
    "size": "Small"
  },
  "remains": 75
}]
```
