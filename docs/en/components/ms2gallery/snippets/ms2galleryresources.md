# ms2GalleryResources

Snippet for the results output through **pdoResources** with an attachment of the first picture fron the resource's gallery.

## Parameters

All parameters [pdoResources][1] are acceptable, plus there are some unique ones:

Parameter           | By default | Description
--------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**typeOfJoin**      | `left`     | Type of adding pictures from a resource. Left stands for Left Join, whicn means that resources will be selected even if they do not host any pictures. And inner stands for Inner Join, which will select only resources with pictures.
**includeThumbs**   | `small`    | List of [previews generated][2] with commas. For example, "small,medium".
**includeOriginal** |            | Adding an extra join to the selection with a link to the original picture. It will be available in the resource's array as "pseudonym.original", for example, "small.original".

## Examples

Output of all resources. For those resources that have galleries the first file will be attached.

```modx
[[!ms2GalleryResources?
  &parents=`0`
  &typeOfJoin=`left`
]]
```

Output of resources with galleries only

```modx
[[!ms2GalleryResources?
  &parents=`0`
  &typeOfJoin=`inner`
]]
```

[1]: /en/components/pdotools/snippets/pdoresources
[2]: /en/components/ms2gallery/preview-generation
