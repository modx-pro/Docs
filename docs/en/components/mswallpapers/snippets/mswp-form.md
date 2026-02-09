# mswp.form

Main component snippet that outputs the wallpaper order form on the frontend.

## Parameters

| Name            | Default        | Description                                                                                             |
|-----------------|----------------|---------------------------------------------------------------------------------------------------------|
| **id**          | `0`            | Product ID; default is current resource.                                                                |
| **image**       |                | Texture image. Required.                                                                                |
| **unit**        | `mm`           | Unit of measure. Values: `mm`, `cm`, `m`.                                                               |
| **width**       | `2700`         | Width in selected unit.                                                                                 |
| **height**      | `1800`         | Height in selected unit.                                                                                |
| **min**         | `3`            | Minimum area (sq m) from which price is calculated.                                                     |
| **spacingStripes** | `450`       | Spacing between stripes for "Show stripes". In selected unit.                                            |
| **preview_width**  | `800`       | Max preview area width in pixels.                                                                       |
| **preview_height** | `300`       | Max preview area height in pixels.                                                                      |
| **cart_id**     | `0`            | Cart resource ID for "Go to cart" button link.                                                          |
| **tpl**         | `tpl.mswp.form`| Form template chunk.                                                                                    |

## Examples

### Form on product page

```fenom
{'!mswp.form' | snippet: [
  'id' => $_modx->resource.id,
  'image' => $_modx->resource.image,
  'cart_id' => 7,
]}
```

Snippet is called on msProduct page. Cart resource ID = 7.

### Form with max 800x800 px square preview

```fenom
{'!mswp.form' | snippet: [
  'id' => $_modx->resource.id,
  'image' => $_modx->resource.image,
  'preview_width' => 800,
  'preview_height' => 800,
  'cart_id' => 7,
]}
```

If width and height in the form don't form a square, the form will have those proportions.

### Form in cm with default 300x200 cm

```fenom
{'!mswp.form' | snippet: [
  'id' => $_modx->resource.id,
  'image' => $_modx->resource.image,
  'unit' => 'cm',
  'width' => 300,
  'height' => 200,
  'cart_id' => 7,
]}
```

### Form in m with default 3.5x2.5 m

```fenom
{'!mswp.form' | snippet: [
  'id' => $_modx->resource.id,
  'image' => $_modx->resource.image,
  'unit' => 'm',
  'width' => 3.5,
  'height' => 2.5,
  'cart_id' => 7,
]}
```
