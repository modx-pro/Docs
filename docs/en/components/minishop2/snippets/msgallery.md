# msGallery

Snippet for outputting the product gallery.

[![](https://file.modx.pro/files/7/0/7/70795a067dcbc05e6cd13448ce196381s.jpg)](https://file.modx.pro/files/7/0/7/70795a067dcbc05e6cd13448ce196381.png)

## Parameters

| Parameter          | Default    | Description                                                                                          |
| ------------------ | ---------- | ---------------------------------------------------------------------------------------------------- |
| **tpl**            | `tpl.msGallery` | Output chunk                                                                                    |
| **product**        |            | Product id. If not set, uses the current resource id.                                                |
| **limit**          |            | Maximum number of results                                                                             |
| **offset**         |            | Number of results to skip                                                                           |
| **sortby**         | `rank`     | Sort field                                                                                            |
| **sortdir**        | `ASC`      | Sort direction                                                                                        |
| **toPlaceholder**  |            | If set, snippet stores data in a placeholder with this name instead of outputting.                   |
| **where**          |            | JSON-encoded string with extra conditions.                                                            |
| **filetype**       |            | File types to select. Use "image" for images and extensions for others, e.g. "image,pdf,xls,doc".   |
| **showLog**        |            | Show extra snippet debug info. Only for users logged in to context "mgr".                             |

<!--@include: ../parts/tip-general-properties.md-->

## Output

The snippet works with a [Fenom chunk][2] and passes a single variable `$files` (array of files).

To see all gallery placeholders, use an empty chunk:

```modx
<pre>[[!msGallery?tpl=``]]</pre>
```

[![](https://file.modx.pro/files/0/b/a/0babb052b84702f8ca9a9f32eda62312s.jpg)](https://file.modx.pro/files/0/b/a/0babb052b84702f8ca9a9f32eda62312.png)

The gallery uses [Fotorama][3]. You can pass options in the chunk [per the docs][4].

Scripts load only if the chunk contains `.fotorama` inside `#msGallery` and it has files.

To disable Fotorama, remove the `.fotorama` class from the chunk.

[2]: /en/components/pdotools/parser
[3]: http://fotorama.io/
[4]: http://fotorama.io/customize/options/
