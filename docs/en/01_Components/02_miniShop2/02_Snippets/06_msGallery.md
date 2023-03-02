Snippet for goods gallery display.

[![](https://file.modx.pro/files/7/0/7/70795a067dcbc05e6cd13448ce196381s.jpg)](https://file.modx.pro/files/7/0/7/70795a067dcbc05e6cd13448ce196381.png)

## Parameters

Parameter           | By default    | Description
--------------------|---------------|---------------------------------------------
**tpl**             | tpl.msGallery | Formatting chunk
**product**         |               | Product identifier. If not indicated, current document id is used.
**limit**           |               | Sample results limit
**offset**          |               | Skip results from the beginning of the sample
**sortby**          | rank          | Sample sorting
**sortdir**         | ASC           | Sorting direction
**toPlaceholder**   |               | If not empty, snippet will store all data in placeholder with this name, instead of displaying.
**where**           |               | The line, coded in JSON,  containing additional sample conditions.
**filetype**        |               | File type for sampling. "image" may be used for picture indication and other files extension. For example: "image,pdf,xls,doc".
**showLog**         |               | To show additional information of snippet operation. For authorized in "mgr" context only.

*Other [pdoTools general parameters][1] may be also used*

## Formatting
The snippet counts on the work with [chunk Fenom][2] and transfers there only one variable`$files` with file array.

You may see all available gallery placeholders simply indicating the empty chunk:
```
<pre>[[!msGallery?tpl=``]]</pre>
```

[![](https://file.modx.pro/files/0/b/a/0babb052b84702f8ca9a9f32eda62312s.jpg)](https://file.modx.pro/files/0/b/a/0babb052b84702f8ca9a9f32eda62312.png)

For gallery design [Fotorama][3]is used.
You may indicate your parameters directly in the chunk , [according to instruction][4].

The presence of the  chunk`.fotorama` element in `#msGallery` is verified when initializing scripts.
The Fotorama scripts and styles will be loaded if only this element is present and contains files.

So if you need not Fotorama at all, simply exclude `.fotorama` from the  chunk.


[1]: /en/01_Components/01_pdoTools/04_General_parameters.md
[2]: /en/01_Components/01_pdoTools/03_Parser.md
[3]: http://fotorama.io/
[4]: http://fotorama.io/customize/options/
