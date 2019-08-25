#### Description:

This extra is designed for easier integration of PageSpeed Insights optimization for MODX Revolution. It can:

- Operate in automatic mode, if default configuration properties are enough.
- Handle subresources via **cdnjs.com** API and download **Google Fonts**.
- Merge and minify styles, scripts and JSON. Minify HTML content.
- Download and cache assets. Add **preconnect** tags.
- Compute **SRI** hashes for files and add **defer** or **async** attributes to **script** tag.
- Convert **gif**, **jpg** and **png** images to **webp** format if browser supports it.
- Manage and efficiently cache multiple configurations at once.
- Output [MODX timing tags](https://docs.modx.com/revolution/2.x/making-sites-with-modx/tag-syntax#TagSyntax-Timing) to browser console for members of **Administrator** user group.

#### Modes:

| Mode | Description |
| ------------- | ------------- |
| **Automatic** | When **subresources** property is not set, plugin looks for subresources in HTML and processes them. |
| **Manual** | Only subresources from **subresources** property are processed. |

## Syntax:

``` php
[[!PageSpeed?
    &assets=`true`
    &async=`false`
    &crossorigin=`anonymous`
    &defer=`true`
    &integrity=`sha256 sha384 sha512`
    &lifetime=`604800`
    &minify=`css html js json link script`
    &preconnect=`true`
    &quality=`-1`
    &subresources=`{
        "link" : [
            { "name" : "", "version" : "", "filename" : "", "media" : "" },
            { "url" : "", "media" : "" }
        ],
        "script" : [
            { "name" : "", "version" : "", "filename" : "", "media" : "" },
            { "url" : "", "media" : "" }
        ]
    }`
    &tplConsole=`PageSpeed.tplConsole`
    &tplLinkPreconnect=`PageSpeed.tplLinkPreconnect`
    &tplLinkStylesheet=`PageSpeed.tplLinkStylesheet`
    &tplScript=`PageSpeed.tplScript`
]]
```

#### Script properties:

| Property | Description |
| ------------- | ------------- |
| **assets** | Optional. Default is **true**. Enables CSS assets download. Value is interpreted as a **boolean**. |
| **async** | Optional. Default is **false**. **Async** attribute value for **script** subresource. Value is interpreted as a **boolean**. |
| **crossorigin** | Optional. Default is **anonymous**. **Crossorigin** attribute value for subresource. Case insensitive. Possible values are: **anonymous**, **use-credentials**. |
| **defer** | Optional. Default is **true**. **Defer** attribute value for **script** subresource. Value is interpreted as a **boolean**. |
| **integrity** | Optional. Default is **sha256 sha384 sha512**. Algorithms to use for subresource integrity hashing. Case insensitive. Possible values are: **sha256**, **sha384**, **sha512**, or any their combination. |
| **lifetime** | Optional. Default is **604800**. Subresource cache lifetime. |
| **minify** | Optional. Default is **css html js json link script**. Determines types of content that will be minified. Case insensitive. Possible values are: **css**, **html**, **js**, **json**, **link**, **script**, or any their combination. <ul><li>**css** - inline CSS and style attributes.</li><li>**html** - HTML content.</li><li>**js** - inline JS and event attributes.</li><li>**json** - inline JSON and JSON+LD microdata.</li><li>**link** - CSS files.</li><li>**script** - JS files.</li></ul> |
| **preconnect** | Optional. Default is **true**. Enables **preconnect** tag management. Value is interpreted as a **boolean**. |
| **quality** | Optional. Default is **-1**. Enables convertion of **gif**, **jpg** and **png** images to **webp** format with specified quality. Possible values are integer from **0** to **100**. |
| **subresources** | Optional. Default is built by automatic mode. JSON object, containing information about subresources, their versions and files. Either subresource **URL** or **name** parameter for **cdnjs.com** API is required, while **media** attribute is optional. For **cdnjs.com** API all other properties are replaced by API defaults, if unspecified. |
| **tplConsole** | Optional. Default is **PageSpeed.tplConsole**. Template for information in browser console. |
| **tplLinkPreconnect** | Optional. Default is **PageSpeed.tplLinkPreconnect**. Template for **link** tags with **preconnect** attribute. |
| **tplLinkStylesheet** | Optional. Default is **PageSpeed.tplLinkStylesheet**. Template for **link** tags with **stylesheet** attribute. |
| **tplScript** | Optional. Default is **PageSpeed.tplScript**. Template for **script** tags. |

#### Examples:

**Automatic** processing mode without local assets cache:
``` php
[[!PageSpeed?
    &assets=`false`
]]
```

Most recent **jQuery** with **daily** updates from **jsdelivr.net**:
``` php
[[!PageSpeed?
    &defer=`false`
    &lifetime=`86400`
    &subresources=`{
        "script" : [
            { "url" : "https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js" }
        ]
    }`
]]
```

Most recent **Bootstrap** with **defer** attribute for **script** subresources and **weekly** updates from **cdnjs.com**:
``` php
[[!PageSpeed?
    &subresources=`{
        "link" : [
            { "name" : "twitter-bootstrap", "filename" : "css/bootstrap.min.css" }
        ],
        "script" : [
            { "name" : "jquery" },
            { "name" : "popper.js", "filename" : "umd/popper.min.js" },
            { "name" : "twitter-bootstrap" }
        ]
    }`
]]
```

## Notes:

Simultaneous execution is prevented by [System V Semaphores](https://www.php.net/manual/en/book.sem.php) extension. Cache can be refreshed manually from **Manage** / **Clear Cache** / **PageSpeed** menu. When using automatic conversion of **gif**, **jpg** and **png** images to **webp** format make sure to have **80%** more free space for cache. Automatic mode can not and will not handle any MODX confiuration ever by itself. This extra uses a [Minify](https://github.com/matthiasmullie/minify) library.
