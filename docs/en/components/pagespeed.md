---
title: PageSpeed
description: PageSpeed Insights optimizations integration for MODX Revolution
logo: https://modstore.pro/assets/extras/pagespeed/logo-lg.jpg
author: wfoojjaec
modstore: https://modstore.pro/packages/ecommerce/pagespeed
---
# PageSpeed

## Description

This add-on integrates PageSpeed Insights optimizations for MODX Revolution. It can:

- Run automatically with standard configuration.
- Convert **gif**, **jpg** and **png** to **webp** when the browser supports it, with or without caching. Adjust size and quality of converted images.
- Generate critical CSS, detect and preload fonts.
- Add **font-display** to **@font-face** declarations.
- Set **crossorigin** and compute **SRI** hashes.
- Use multiple configs with efficient caching.
- Apply native lazy loading for **img** and **iframe**.
- Minify styles, scripts, JSON and HTML.
- Add **defer** or **async** to **script** tags.
- Fetch page resources via **cdnjs.com** API and download fonts from **Google Fonts**.
- Process **meta** and **link** tags with **http-equiv** and **preconnect**.
- Output [MODX timing tags](https://docs.modx.com/revolution/2.x/making-sites-with-modx/tag-syntax#TagSyntax-Timing) to the browser console for **Administrator** group members.

You can purchase this add-on at [Modstore](https://en.modstore.pro/packages/utilities/pagespeed).

## Modes

| Mode           | Description                                                                              |
| -------------- | ----------------------------------------------------------------------------------------- |
| **Automatic**  | When **subresources** is not set, the plugin finds resources in HTML and processes them.  |
| **Manual**     | Processes only resources from the **subresources** option.                                |

## Syntax

This is **not** a working config, but an overview of all available parameters.

```modx
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
    "link": [
      { "name" : "", "version" : "", "filename" : "", "crossorigin" : "", "integrity" : "", "media" : "" },
      { "url" : "", "crossorigin" : "", "integrity" : "", "media" : "" }
    ],
    "script": [
      { "name" : "", "version" : "", "filename" : "", "async" : "", "crossorigin" : "", "defer" : "", "integrity" : "", "nomodule" : "" },
      { "url" : "", "async" : "", "crossorigin" : "", "defer" : "", "integrity" : "", "nomodule" : "" }
    ]
  }`
]]
```

## Parameters

| Parameter         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **bundle**       | Optional. Default **link script**. Content types to bundle. Case insensitive. Values: **link**, **script**, any combination or empty. <ul><li>**link** - CSS files.</li><li>**script** - JS files.</li></ul> |
| **convert**      | Optional. Default **static**. Converts **gif**, **jpg**, **png** to **webp**. Values: **disable**, **dynamic**, **static**. <ul><li>**disable** - no conversion.</li><li>**dynamic** - no cache after conversion; more CPU.</li><li>**static** - cached; more disk.</li></ul> |
| **critical**     | Optional. Default **true**. Critical CSS generator. Boolean. |
| **crossorigin**  | Optional. Default **anonymous**. **crossorigin** for all resources. Values: **anonymous**, **use-credentials**, or empty. |
| **display**      | Optional. Default **swap**. CSS **font-display**. Values: **auto**, **block**, **swap**, **fallback**, **optional**. |
| **integrity**    | Optional. Default **sha256**. SRI hash algorithm. Values: **sha256**, **sha384**, **sha512**, combination or empty. |
| **lifetime**     | Optional. Default **604800**. Resource cache lifetime. |
| **loading**      | Optional. Default **lazy**. **loading** for **img** and **iframe**. Values: **auto**, **eager**, **lazy**. |
| **minify**       | Optional. Default **html link script**. Content types to minify. Values: **css**, **html**, **js**, **json**, **link**, **script**, any combination. <ul><li>**css** - inline CSS.</li><li>**html** - HTML.</li><li>**js** - inline JS.</li><li>**json** - inline JSON and JSON+LD.</li><li>**link** - CSS files.</li><li>**script** - JS files.</li></ul> |
| **quality**      | Optional. Default **80**. **webp** quality. Integer 0-100. |
| **resize**       | Optional. Default **true**. Resize images in **img** tags. Boolean. |
| **script**       | Optional. Default **defer**. Attribute for **script** tags. Values: **async**, **defer**. |
| **subresources** | Optional. Default auto. JSON with resource info. Either **url** or **name** (for cdnjs.com) is required; other properties get defaults from the API. |

### Examples

Latest **jQuery** with **daily** updates from **jsdelivr.net**:

```modx
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

Latest **Bootstrap** with **defer** for all **script** resources and **weekly** updates from **cdnjs.com**:

```modx
[[!PageSpeed?
  &subresources=`{
    "link": [
      { "name" : "twitter-bootstrap", "filename" : "css/bootstrap.min.css" }
    ],
    "script": [
      { "name" : "jquery" },
      { "name" : "popper.js", "filename" : "umd/popper.min.js" },
      { "name" : "twitter-bootstrap" }
    ]
  }`
]]
```

Add any **inline** style or script using **PHx**. Note: this creates a new config instance if data differs on page load. **Do not use** for third-party code such as Google Analytics:

```modx
[[+phx:input=`data:text/css,
  html {
    color: [[+color]];
  }
`:cssToHead]]

[[+phx:input=`data:text/javascript,
  console.log('[[+id]]');
`:jsToHead]]

[[+phx:input=`data:text/javascript,
  if (typeof performance === 'object')
    performance.mark('[[++site_name]]');
`:jsToBottom]]
```

### Notes

Automatic mode may not work on every MODX configuration.

Cache can be cleared manually in **Manager** / **Clear cache** / **PageSpeed**.

For manual mode add them to the **script** section of the **subresources** parameter.

Animated **gif** support requires [Image Processing (ImageMagick)](https://www.php.net/manual/en/book.imagick.php) for PHP.

To prevent concurrent execution, install [Semaphore, Shared Memory and IPC](https://www.php.net/manual/en/book.sem.php) for PHP.

This add-on uses [PHP CSS Parser](https://github.com/sabberworm/PHP-CSS-Parser/) and [Minify](https://github.com/matthiasmullie/minify).
