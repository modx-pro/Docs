---
title: Video, maps and iframes
description: Consent-aware media snippets, inert templates, posters and AJAX embeds.
---

# Video, maps and iframes

Enable the required service in Manager and assign a **visible optional category**. In Strict mode an iframe is not created before permission; Legacy follows the first-visit rule described in [Modes](settings).

## YouTube with CookieConsentVideo

```modx
[[!CookieConsentVideo?
    &provider=`youtube`
    &url=`https://www.youtube.com/watch?v=M7lc1UVf-VE`
    &title=`Company video`
    &start=`30`
    &autoplay=`0`
    &controls=`1`
    &poster=`/assets/img/video-preview.webp`
    &aspectRatio=`16:9`
    &width=`720`
]]
```

For portrait video use `aspectRatio=`9:16``. Prefer a poster hosted on your own domain: external placeholder images are intentionally not fetched.

## RUTUBE and VK Video

```modx
[[!CookieConsentVideo?
    &provider=`rutube`
    &url=`https://rutube.ru/video/7716bd3e665725c3c008ae7ab4ff02e2/`
    &title=`RUTUBE`
]]
```

VK Video requires the official `video_ext.php` iframe URL from **Share → Embed code**. Preserve the `hash` parameter if provided. A normal VK video page URL is not accepted.

```modx
[[!CookieConsentVideo?
    &provider=`vk_video`
    &url=`https://vkvideo.ru/video_ext.php?oid=-123456&id=789012&hd=2`
    &title=`VK Video`
]]
```

The IDs above are placeholders. Replace them with the official embed URL for an embeddable video.

## Maps with CookieConsentMap

```modx
[[!CookieConsentMap?
    &provider=`yandex_maps`
    &src=`https://yandex.ru/map-widget/v1/?ll=37.62%2C55.75&z=10`
    &title=`Find us`
]]
```

```modx
[[!CookieConsentMap?
    &provider=`google_maps`
    &src=`https://www.google.com/maps/embed/v1/place?key=YOUR_MAPS_KEY&q=Moscow`
    &title=`Directions`
]]
```

Replace example URLs and keys. The snippet checks supported domains, paths and parameters; arbitrary iframe URLs are not accepted. For another instance, set `provider` to the configured service key.

## Custom iframe using a template

Trusted custom HTML can be held in an inert template:

```html
<div data-cc-embed="youtube" data-cc-aspect-ratio="16:9">
  <template>
    <iframe src="https://www.youtube-nocookie.com/embed/M7lc1UVf-VE"
      title="Example video" allowfullscreen></iframe>
  </template>
</div>
```

`data-cc-embed` identifies an enabled service instance; `<template>` must be a direct child. CookieConsentManager does **not** sanitize arbitrary HTML inside the template.

For markup added by AJAX:

```javascript
const root = document.getElementById('ajax-result');
// Add the wrapper and template to root first.
window.web86CookieConsent?.mountEmbeds(root);
```

You may call `mountEmbeds()` more than once; no permanent MutationObserver is installed. An ordinary directly embedded live iframe is not blocked automatically.
