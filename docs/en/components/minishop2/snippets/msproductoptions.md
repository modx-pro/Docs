# msProductOptions

Unlike [msOptions][1], this snippet simply outputs the list of [product options][2] without a selector.

[![](https://file.modx.pro/files/2/4/5/2452dfe5f33009776d55943b61ce3414s.jpg)](https://file.modx.pro/files/2/4/5/2452dfe5f33009776d55943b61ce3414.png)

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msProductOptions` | Output chunk |
| **product** | | Product id. If omitted, current resource id is used. |
| **onlyOptions** | | Output only these options, comma-separated. |
| **ignoreOptions** | | Options to exclude from output, comma-separated. |
| **ignoreGroups** | | Groups whose options to exclude from output, comma-separated. |
| **groups** | | Output only options from these groups (group name or category id, comma-separated). |
| **sortGroups** | | Sort order of option groups. Accepts IDs or names. E.g. `22,23,24` or `Sizes,Electronics,Other`. |
| **sortOptions** | | Sort order of options. Passed as a string, e.g. `size,color`. |
| **sortOptionValues** | | Sort order of option values. E.g. `size:SORT_DESC:SORT_NUMERIC:100,color:SORT_ASC:SORT_STRING` |

## Output

The snippet expects a [Fenom chunk][3] and passes one variable **$options** (array of option values).

To see all placeholders, use an empty chunk:

```modx
<pre>[[msProductOptions?tpl=``]]</pre>
```

[![](https://file.modx.pro/files/d/b/c/dbc7a001d2c7fe6d565b054a5119099bs.jpg)](https://file.modx.pro/files/d/b/c/dbc7a001d2c7fe6d565b054a5119099b.png)

[1]: /en/components/minishop2/snippets/msoptions
[2]: /en/components/minishop2/interface/settings
[3]: /en/components/pdotools/parser
