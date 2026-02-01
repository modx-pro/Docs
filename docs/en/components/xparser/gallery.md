# Gallery support

Since version 1.5.0 the component works with ms2Gallery and miniShop2 galleries.

## Example

Uploading images to the gallery component is simple. Collect image URLs in a JSON array with Fenom:

```fenom
@INLINE {($content | preg_get_all : '!https?://[^"]+\.(?:jpe?g|png|gif)!Ui') | toJSON}
```

The component converts it to a PHP array and uploads each image to the gallery.

The gallery field JSON must look like:

```json
["http://site.ru/image1.jpg","http://site.ru/image2.jpg", ...]
```

Then all images will be added to the selected gallery.
