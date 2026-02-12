# Output modifiers

This section describes some modifiers and examples of their use. In the examples, modifiers are applied to placeholders, but remember they can be applied to any MODX tags. Make sure the tag you use outputs something for the modifier to process.

## Filter chaining (Multiple modifiers) {#chaining}

A good example of filter chaining is date formatting:

```modx
[[*publishedon:strtotime:date=`%d.%m.%Y`]]

```

## Using output modifiers with parameters {#with-params}

If the tag has parameters, they must be placed immediately after the modifier:

```modx
[[!getResources:default=`Sorry, nothing found`?
  &tplFirst=`blogTpl`
  &parents=`2,3,4,8`
  &tvFilters=`blog_tags==%[[!tag:htmlent]]%`
  &includeTVs=`1`
]]
```
