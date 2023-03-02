#### Description:

This extra is designed for easier integration of PageSpeed Insights optimization for MODX Revolution. It can:

- Operate in automatic mode, if default configuration properties are enough.
- Convert **gif**, **jpg** and **png** images to **webp** format, if browser supports it, with or without caching. Adjust converted image size and quality.
- Generate critical path CSS rules, detect and preload required fonts.
- Add **font-display** property to **@font-face** declarations.
- Set **crossorigin** attribute and compute **SRI** hashes.
- Manage and efficiently cache multiple configurations at once.
- Apply native lazy loading for **img** and **iframe** elements.
- Minify styles, scripts, JSON and HTML content.
- Add **defer** or **async** attribute to **script** tags.
- Handle subresources via **cdnjs.com** API and download **Google Fonts**.
- Process **meta** and **link** tags with **http-equiv** and **preconnect** attributes.
- Output [MODX timing tags](https://docs.modx.com/revolution/2.x/making-sites-with-modx/tag-syntax#TagSyntax-Timing) to browser console for members of **Administrator** user group.

You can buy this extra on [Modstore](https://en.modstore.pro/packages/utilities/pagespeed).

#### Modes:

| Mode | Description |
| ------------- | ------------- |
| **Automatic** | When **subresources** property is not set, plugin looks for subresources in HTML and processes them. |
| **Manual** | Only subresources from **subresources** property are processed. |

#### Syntax:

This is **not** a working configuration example, but an overview of all available properties.
``` php
[[!PageSpeed?
    &bundle=`link script`
    &convert=`static`
    &critical=`true`
    &crossorigin=`anonymous`
    &display=`swap`
    &integrity=`sha256`
    &lifetime=`604800`
    &loading=`lazy`
    &minify=`html link script`
    &quality=`80`
    &resize=`true`
    &script=`defer`
    &subresources=`{
        "link" : [
            { "name" : "", "version" : "", "filename" : "", "crossorigin" : "", "integrity" : "", "media" : "" },
            { "url" : "", "crossorigin" : "", "integrity" : "", "media" : "" }
        ],
        "script" : [
            { "name" : "", "version" : "", "filename" : "", "async" : "", "crossorigin" : "", "defer" : "", "integrity" : "", "nomodule" : "" },
            { "url" : "", "async" : "", "crossorigin" : "", "defer" : "", "integrity" : "", "nomodule" : "" }
        ]
    }`
]]
```

#### Script properties:

| Property | Description |
| ------------- | ------------- |
| **bundle** | Optional. Default is **link script**. Determines types of content that will be bundled into one file. Case insensitive. Possible values are: **link**, **script**, any their combination or empty value. <ul><li>**link** - CSS files.</li><li>**script** - JS files.</li></ul> |
| **convert** | Optional. Default is **static**. Enables convertion of **gif**, **jpg** and **png** images to **webp** format with specified quality. Case insensitive. Possible values are: **disable**, **dynamic**, **static**. <ul><li>**disable** - images are not converted.</li><li>**dynamic** - images are not cached after convertsion. Requires additional CPU resources.</li><li>**static** - images are cached after conversion. Requires additional free space.</li></ul> |
| **critical** | Optional. Default is **true**. Enables critical path CSS generator. Value is interpreted as a **boolean**. |
| **crossorigin** | Optional. Default is **anonymous**. **Crossorigin** attribute value for subresource. Case insensitive. Possible values are: **anonymous**, **use-credentials**, or empty value. |
| **display** | Optional. Default is **swap**. **font-display** CSS property value. Case insensitive. Possible values are: **auto**, **block**, **swap**, **fallback**, **optional**. |
| **integrity** | Optional. Default is **sha256**. Algorithms to use for subresource integrity hashing. Case insensitive. Possible values are: **sha256**, **sha384**, **sha512**, any their combination or empty value. |
| **lifetime** | Optional. Default is **604800**. Subresource cache lifetime. |
| **loading** | Optional. Default is **lazy**. **loading** attribute value for **img** and **iframe** tags. Case insensitive. Possible values are: **auto**, **eager**, **lazy**. |
| **minify** | Optional. Default is **html link script**. Determines types of content that will be minified. Case insensitive. Possible values are: **css**, **html**, **js**, **json**, **link**, **script**, or any their combination. <ul><li>**css** - inline CSS.</li><li>**html** - HTML content.</li><li>**js** - inline JS.</li><li>**json** - inline JSON and JSON+LD microdata.</li><li>**link** - CSS files.</li><li>**script** - JS files.</li></ul> |
| **quality** | Optional. Default is **80**. Quality of converted **webp** images. Possible values are integer from **0** to **100**. |
| **resize** | Optional. Default is **true**. Enables resizing of images in **img** tags. Value is interpreted as a **boolean**. |
| **script** | Optional. Default is **defer**. Attribute to be used for **script** tags. Case insensitive. Possible values are: **async**, **defer**. |
| **subresources** | Optional. Default is built by automatic mode. JSON object, containing information about subresources, their versions and files. Either subresource **URL** or **name** parameter for **cdnjs.com** API is required, while **media** attribute is optional. For **cdnjs.com** API all other properties are replaced by API defaults, if unspecified. |

#### Examples:

Most recent **jQuery** with **daily** updates from **jsdelivr.net**:
``` php
[[!PageSpeed?
    &lifetime=`86400`
    &script=`async``
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

Appending custom **inline** style or script can be done with **PHx**. Please note, that this will force the creation of new configuration instance, if data differs on page load. **Do not** use this for third-party code, like Google Analytics:
``` php
[[+phx:input=`data:text/css,
    html {
        color : [[+color]];
    }
`:cssToHead]]

[[+phx:input=`data:text/javascript,
    console.log( '[[+id]]' );
`:jsToHead]]

[[+phx:input=`data:text/javascript,
    if( typeof performance === 'object' )
        performance.mark( '[[++site_name]]' );
`:jsToBottom]]
```

#### Notes:

Automatic mode can not and will not handle any MODX confiuration ever by itself.

Cache can be refreshed manually from **Manage** / **Clear Cache** / **PageSpeed** menu.

For manual configuration you should add them to **script** section of **subresources** property.

Animated **gif** image processing is possible after installing [Image Processing (ImageMagick)](https://www.php.net/manual/en/book.imagick.php) PHP extension.

Simultaneous execution can be prevented by installing [Semaphore, Shared Memory and IPC](https://www.php.net/manual/en/book.sem.php) PHP extension.

This extra uses a [PHP CSS Parser](https://github.com/sabberworm/PHP-CSS-Parser/) and [Minify](https://github.com/matthiasmullie/minify).
