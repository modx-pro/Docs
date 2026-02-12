# Output filters

In Revolution, output filters behave like PHx in Evolution, except the filters are now built directly into the MODX engine. The syntax is:

```modx
[[element:modifier=`value`]]
```

Filters can be applied in sequence. Write them one after another (left to right):

```modx
[[element:modifier:anothermodifier=`value`:andanothermodifier:yetanother=`value2`]]
```

Filters can also be used to modify snippet output. The filter must be placed before all parameters (before the question mark):

```modx
[[mySnippet:modifier=`value`? &mySnippetParam=`something`]]
```
