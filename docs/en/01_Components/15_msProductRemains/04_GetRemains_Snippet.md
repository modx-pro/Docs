The snippet displays the number of product remains. It can show both a total amount of remains for each property and a number for a certain combination of product properties.

If you call the snippet without specifying one or several properties, it will display a total amount of remains for all combinations of properties.

## Parameters
Name					| By default						| Description
----------------------------|-----------------------------------|-------------------------
**&id**						| Resource ID						| Product ID.
**&color**					| 									| Product color.
**&size**					| 									| Product size.

## Call options
For a better and more precise calculation of remains, **the snippet should be called non-cached**.

For a total number of remains on the product page:
```
[[!getRemains]]
```

For an amount of remains of a certain combination of properties:
```
[[!getRemains?
	&id=[[+id]]
	&color=`color`
	&size=`size`
]]
```

Use standard MODx filter for call recording in a placeholder:
```
[[!getRemains:toPlaceholder=`remains`?
	&id=[[+id]]
	&color=`color`
	&size=`size`
]]
```
