This snippet simply displays the list of [additional product options][2] without choice unlike [msOptions][1].

[![](https://file.modx.pro/files/2/4/5/2452dfe5f33009776d55943b61ce3414s.jpg)](https://file.modx.pro/files/2/4/5/2452dfe5f33009776d55943b61ce3414.png)

## Parameters

Parameter           | By default    | Description
--------------------|---------------|---------------------------------------------
**tpl**             | tpl.msProductOptions    | Formatting chunk
**product**         |               | Product identifier. If not indicated, id of the current document is used.
**onlyOptions**     |               | Display only this option list, separated by commas.
**ignoreOptions**   |               | The options, which do not need to be listed, separated by commas.
**groups**          |               | To display only indicated group options (category name or identifier, separated by commas)

## Formatting
The snippet counts on the work with [Fenom chunk][3] and transfers there only one variable`$options` with option array.

You may see all available placeholders by indicating empty chunk:
```
<pre>[[msProductOptions?tpl=``]]</pre>
```

[![](https://file.modx.pro/files/d/b/c/dbc7a001d2c7fe6d565b054a5119099bs.jpg)](https://file.modx.pro/files/d/b/c/dbc7a001d2c7fe6d565b054a5119099b.png)


[1]: /en/01_Components/02_miniShop2/02_Snippets/07_msOptions.md
[2]: /en/01_Components/02_miniShop2/01_Interface/04_Settings.md
[3]: /en/01_Components/01_pdoTools/03_Parser.md
