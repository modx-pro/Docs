# ResVideoGallery

Snippet for outputting video on a page.

## Parameters

| Parameter       | Default                         | Description                                                                                                                                                                                                          |
|-----------------|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **autoPlay**    | `1`                              | Start video playback automatically.                                                                                                                                                                                  |
| **parents**     |                                  | Comma-separated list of parent IDs for the search. By default the search is limited to the current parent. Use 0 for no limit.                                                                                        |
| **resources**   | Current resource ID              | Comma-separated list of resource IDs to include. If an ID is prefixed with a minus sign, that resource is excluded.                                                                                                   |
| **showInactive**| `0`                              | Include inactive video.                                                                                                                                                                                              |
| **limit**       | `12`                             | Number of videos to output. Use 0 for no limit.                                                                                                                                                                      |
| **offset**      | `0`                              | Number of results to skip from the start.                                                                                                                                                                             |
| **sortby**      | `rank`                           | Sort field.                                                                                                                                                                                                          |
| **sortdir**     | `DESC`                           | Sort direction.                                                                                                                                                                                                      |
| **where**       |                                  | JSON string for the SQL WHERE clause. Example: &where={"template":15} (no TV).                                                                                                                                       |
| **tags**        |                                  | Comma-separated list of tags; only video that has these tags is included.                                                                                                                                             |
| **getTags**     | `0`                              | Make extra queries to load tags?                                                                                                                                                                                     |
| **tagsVar**     | `tag`                            | If set, the snippet reads the "tags" value from $_REQUEST["name"]. E.g. if you set "tag", the snippet only outputs files matching $_REQUEST["tag"].                                                                  |
| **photoGallery**|                                  | Include photo gallery files with the video. One of: ms2Images or ms2Gallery (miniShop2 gallery or MS2Gallery).                                                                                                         |
| **primarily**   | `video`                          | Output priority: video or photo.                                                                                                                                                                                      |
| **thumb**       | `small`                          | Thumbnail size name for the photo gallery. From the file source thumbnails option.                                                                                                                                   |
| **ajaxMode**    | `button`                         | AJAX pagination mode: button or scroll.                                                                                                                                                                              |
| **plPrefix**    |                                  | Placeholder prefix.                                                                                                                                                                                                   |
| **tpl**         | `resVideoGalleryTpl`             | Fenom chunk for the whole gallery.                                                                                                                                                                                    |
| **tplRow**      | `resVideoGalleryRowTpl`         | Fenom chunk for one gallery item.                                                                                                                                                                                     |
| **tplEmbed**    | `resVideoGalleryEmbedTpl`       | Fenom chunk for the video player code.                                                                                                                                                                                |
| **css**         | `{+assets_url}css/web/default.css` | Path to custom styles, or clear and load them manually in the site template.                                                                                                                                       |
| **js**          | `{+assets_url}js/web/default.js` | Path to custom scripts, or clear and load them manually in the site template.                                                                                                                                        |

## Video preview size

Previews are generated via [phpThumb][1]. You can set its parameters in the component settings; the default is:

```json
{"w":640,"h":390,"q":90,"zc":"1","f":"jpg","bg":"000000"}
```

### ResVideoGallery with Ajax load on button click for resource ID 5

```modx
[[!ResVideoGallery?
  &limit=`3`
  &resources=`5`
]]
```

### ResVideoGallery with Ajax load on scroll for resource ID 5

```modx
[[!ResVideoGallery?
  &limit=`3`
  &resources=`5`
  &ajaxMode=`scroll`
]]
```

### ResVideoGallery via pdoPage for pagination for resource ID 5

```modx
[[!pdoPage?
  &element=`ResVideoGallery`
  &ajaxMode=`default`
  &limit=`4`
  &resources=`5`
]]

[[!+page.nav]]
```

### ResVideoGallery with miniShop2 photo gallery (video and photos together)

```modx
[[!ResVideoGallery?
  &limit=`3`
  &resources=`5`
  &photoGallery=`ms2Images`
]]
```

[1]: http://phpthumb.sourceforge.net/demo/demo/phpThumb.demo.demo.php
