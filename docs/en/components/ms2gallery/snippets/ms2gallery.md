# ms2Gallery

Snippet for outputting a resource gallery.

## Parameters

| Parameter        | Default                     | Description                                                                                                                                                                                                                  |
|------------------|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **parents**      |                             | Comma-separated list of parent IDs for the query. Default: limited to current parent. Use `0` for no limit.                                                                                                                  |
| **resources**    |                             | Comma-separated list of resource IDs to include. If an ID is prefixed with minus, that resource is excluded.                                                                                                                |
| **showLog**      |                             | Show extra snippet debug info. Only for authenticated users in `mgr` context.                                                                                                                                               |
| **toPlaceholder**|                             | If set, snippet output is saved to a placeholder with this name instead of printed.                                                                                                                                          |
| **tpl**          | `tpl.ms2Gallery`           | Chunk for the whole gallery using [Fenom].                                                                                                                                                                                    |
| **limit**        |                             | Maximum number of results                                                                                                                                                                                                     |
| **offset**       |                             | Number of results to skip from the start                                                                                                                                                                                     |
| **where**        |                             | JSON-encoded extra query conditions. For file filtering use table alias **File**. Example: ``&where=`{"File.name:LIKE":"%img%"}` ``                                                                                           |
| **filetype**     |                             | File types to include. Use `image` for images and extensions for others. Example: `image, pdf, xls, doc`.                                                                                                                    |
| **showInactive** |                             | Include inactive files.                                                                                                                                                                                                      |
| **sortby**       | `rank`                      | Sort field                                                                                                                                                                                                                    |
| **sortdir**       | `ASC`                       | Sort direction                                                                                                                                                                                                               |
| **frontend_css** | `[[+cssUrl]]web/default.css` | Path to your CSS, or leave empty and include styles in the site template.                                                                                                                                                    |
| **frontend_js**  | `[[+jsUrl]]web/default.js`  | Path to your JS, or leave empty and include scripts in the site template.                                                                                                                                                    |
| **tags**         |                             | Comma-separated list of tags for filtering files.                                                                                                                                                                            |
| **tagsVar**      |                             | If set, snippet takes **tags** from `$_REQUEST["this_name"]`. E.g. `tag` → filter by `$_REQUEST["tag"]`.                                                                                                                    |
| **getTags**      |                             | Run extra queries to get each file's tags as a string?                                                                                                                                                                       |
| **tagsSeparator**| `,`                         | If file tags are requested, they are joined with this string.                                                                                                                                                                |

## Chunks

Before 2.0 ms2Gallery used 4 chunks:

- **tplRow** — one result row: `tpl.ms2Gallery.row`.
- **tplOuter** — wrapper: `tpl.ms2Gallery.outer`.
- **tplEmpty** — when no results: `tpl.ms2Gallery.empty`.
- **tplSingle** — when exactly one file: `tpl.ms2Gallery.single`.

Now there is a single **tpl** that receives the `$files` array and must iterate it:

```fenom
{if count($files) > 1}
  <!-- multiple files — loop -->
  {foreach $files as $file}
    <a href="{$file.url}">
      <img src="{$file.small}" />
    </a>
  {/foreach}
{elseif count($files) == 1}
  <!-- single image — print full data -->
  {$file | print}
{else}
  No files, show this message.
{/if}
```

All [thumbnails generated for files][preview-generation] are available by their aliases.

To keep the old chunk layout, set your old chunks and leave **&tpl** empty:

```modx
[[!ms2Gallery?
  &tplRow=`tpl.ms2Gallery.row`
  &tplOuter=`tpl.ms2Gallery.outer`
  &tplEmpty=`tpl.ms2Gallery.empty`
  &tplSingle=`tpl.ms2Gallery.single`
  &tpl=``
]]
```

Rewriting to Fenom is recommended for easier use and editing.

### Scripts and Styles

**frontend_css** and **frontend_js** control which assets are loaded. By default: simple styling and main image change on click (for pre-2.0 chunks).

For the 2.0 chunk, [Fotorama] is also loaded if the image container has `class="fotorama"`. You can [configure it via data attributes][Fotorama Docs].

To disable default scripts and styles, set the parameters to empty:

```modx
[[!ms2Gallery?
  &frontend_css=``
  &frontend_js=``
]]
```

## Examples

Output gallery of the current resource:

```modx
[[!ms2Gallery]]
```

Output images from several resources in one gallery:

```modx
[[!ms2Gallery?
  &parents=`0`
  &resources=`5,16,7`
]]
```

[preview-generation]: /components/ms2gallery/preview-generation
[Fenom]: /components/pdotools/parser
[Fotorama Docs]: https://fotorama.io/docs/4/
[Fotorama]: https://fotorama.io/
