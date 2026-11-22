# ResVideoGallery for MODX 2

Responsive video gallery with Ajax loading for MODX Revolution 2.x. For MODX 3, see [ResVideoGallery for MODX 3](modx3).

Supported video hosts:

- youtube.com
- vimeo.com
- dailymotion.com
- rutube.ru
- vk.com
- coub.com

[ResVideoGallery (old video)](https://www.youtube.com/watch?v=GC-YCY_vmWM)

[RuTube](https://rutube.ru/video/f3a71cfc764f0692a2abf484c1f321be/)

## Snippets

### ResVideoGallery

Snippet for outputting video on a page.

#### Parameters

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

#### Video preview size

Previews are generated via [phpThumb][1]. You can set its parameters in the component settings; the default is:

```json
{"w":640,"h":390,"q":90,"zc":"1","f":"jpg","bg":"000000"}
```

##### ResVideoGallery with Ajax load on button click for resource ID 5

```modx
[[!ResVideoGallery?
  &limit=`3`
  &resources=`5`
]]
```

##### ResVideoGallery with Ajax load on scroll for resource ID 5

```modx
[[!ResVideoGallery?
  &limit=`3`
  &resources=`5`
  &ajaxMode=`scroll`
]]
```

##### ResVideoGallery via pdoPage for pagination for resource ID 5

```modx
[[!pdoPage?
  &element=`ResVideoGallery`
  &ajaxMode=`default`
  &limit=`4`
  &resources=`5`
]]

[[!+page.nav]]
```

##### ResVideoGallery with miniShop2 photo gallery (video and photos together)

```modx
[[!ResVideoGallery?
  &limit=`3`
  &resources=`5`
  &photoGallery=`ms2Images`
]]
```

[1]: http://phpthumb.sourceforge.net/demo/demo/phpThumb.demo.demo.php

### ResVideoGalleryTags

Snippet for outputting a tag cloud with filtering.

#### Parameters

| Parameter       | Default                 | Description                                                                                                                                                                                                          |
|-----------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **parents**     |                          | Comma-separated list of parent IDs for the search. By default the search is limited to the current parent. Use 0 for no limit.                                                                                       |
| **resources**   | Current resource ID      | Comma-separated list of resource IDs to include. If an ID is prefixed with a minus sign, that resource is excluded.                                                                                                   |
| **showInactive**| `0`                      | Include inactive video.                                                                                                                                                                                              |
| **limit**       | `0`                      | Number of videos to output. Use 0 for no limit.                                                                                                                                                                      |
| **offset**      | `0`                      | Number of results to skip from the start.                                                                                                                                                                            |
| **sortby**      | `tag`                    | Sort field.                                                                                                                                                                                                          |
| **sortdir**     | `ASC`                    | Sort direction.                                                                                                                                                                                                     |
| **where**       |                          | JSON string for the SQL WHERE clause. Example: &where={"template":15} (no TV).                                                                                                                                       |
| **tagsVar**     | `tag`                    | If set, the snippet reads the "tags" value from $_REQUEST["name"]. E.g. if you set "tag", the snippet only outputs files matching $_REQUEST["tag"].                                                                   |
| **tpl**         | `resVideoGalleryTagsTpl` | Fenom chunk for the snippet output.                                                                                                                                                                                   |

### ResVideoGalleryUpload

Snippet for adding video from the frontend.

**ResVideoGalleryUpload** outputs a form that lets users add video via Ajax.

#### Parameters

| Parameter    | Default                          | Description |
|--------------|----------------------------------|-------------|
| **resource** | Current resource ID              | Resource ID to add video to. |
| **active**   | `1`                              | Video active after add. |
| **onlyAuth** | `1`                              | Show form only to logged-in users. |
| **usergroups** |                                | Comma-separated user groups that can see the form. |
| **multiple** | `1`                              | Allow adding multiple videos at once. |
| **tags**     |                                  | Comma-separated tags added to user-provided tags. |
| **allowTags**|                                  | HTML tags allowed in title/description (strip_tags). |
| **css**      | `{+assets_url}css/web/default.css` | Path to custom CSS, or empty to load manually. |
| **js**       | `{+assets_url}js/web/default.js` | Path to custom JS, or empty to load manually. |

[resVideoGallery frontend add video (old)](https://www.youtube.com/watch?v=9qOR7CXAgl0)

## Adding a custom video parser

To add your own video parser, create a PHP file in `core/components/resvideogallery/model/resvideogallery/providers` with a class extending RvgProvider, define the "scrape" method and override the required properties.

## Events

Available events:

- **rvgOnBeforeVideoAdd**
  - `properties` - request params
- **rvgOnAfterVideoAdd** - video added
  - `video` - RvgVideos instance
  - `properties` - request params
- **rvgOnBeforeVideoUpdate**
- **rvgOnAfterVideoUpdate** - video updated
  - `video` - RvgVideos instance
  - `properties` - request params
- **rvgOnBeforeVideoRemove**
- **rvgOnAfterVideoRemove** - video removed
  - `video` - RvgVideos instance
- **rvgOnBeforeThumbUpdate**
- **rvgOnAfterThumbUpdate** - video thumbnail updated
  - `properties` - request params
  - `video` - RvgVideos instance
- **rvgOnGetVideoEmbed** - video embed code
  - `data` - video data array

## VKontakte setup

1. Sign up and log in to VKontakte.
2. Open the [App Manager](https://vk.com/apps?act=manage).
3. Create an app in VK. Set a name and choose **Standalone** type.
4. Enable the app by changing the *State* select and save.
5. Go to settings and copy the app ID. Replace {APP_ID} in `https://oauth.vk.com/authorize?client_id={APP_ID}&scope=offline,video&redirect_uri=https://oauth.vk.com/blank.html&display=page&v=5.73&response_type=token` and open in browser.
6. Click Allow in the dialog.
7. You'll get a URL like `https://oauth.vk.com/blank.html#access_token=...&expires_in=0&user_id=...` — copy the access_token. If you see `{"error":"invalid_request","error_description":"Security Error"}`, log out of VK and log in again.
8. In MODX: System Settings → ResVideoGallery, paste the access_token into "Access Token for VKontakte".
