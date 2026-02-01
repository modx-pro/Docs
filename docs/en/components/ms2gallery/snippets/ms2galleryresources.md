# ms2GalleryResources

Snippet for outputting resources via **pdoResources** with the first image from each resource's gallery joined.

## Parameters

All [pdoResources] parameters are supported, plus:

| Parameter            | Default | Description                                                                                                                                                                                       |
|----------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **typeOfJoin**       | `left`  | How to join gallery images. `left` — Left Join: resources are included even without images. `inner` — Inner Join: only resources that have images.                                              |
| **includeThumbs**    | `small`| Comma-separated list of [thumbnail sizes][preview-generation]. Example: `small, medium`.                                                                                                          |
| **includeOriginal**  |         | Add a join with the original image URL. Available on the resource as `alias.original`, e.g. `small.original`.                                                                                     |

## Examples

Output all resources; first gallery file is joined where available:

```modx
[[!ms2GalleryResources?
  &parents=`0`
  &typeOfJoin=`left`
]]
```

Output only resources that have galleries:

```modx
[[!ms2GalleryResources?
  &parents=`0`
  &typeOfJoin=`inner`
]]
```

[pdoResources]: /components/pdotools/snippets/pdoresources
[preview-generation]: /components/ms2gallery/preview-generation
