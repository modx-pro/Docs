---
title: PromoDs
description: Top page banner
logo: https://modstore.pro/assets/extras/promods/logo-lg.png
author: electrica
modstore: https://modstore.pro/packages/discounts/promods
---
# PromoDs

Paid component for quick installation of a top-of-site banner. Users can hide it and it won't show again.

[Buy](http://promods.bustep.ru/)

Demo: [promods.bustep.ru](http://promods.bustep.ru/)

Useful for privacy policy consent ([banner demo](http://promods.bustep.ru/banner-s-politikoj-konfidenczialnosti.html)). Message shows until user agrees.

## Features

- Quick start: add `[[!promoDs]]` to any template and banner appears at top
- 2 built-in banner templates: **promoDsBanner** (ad) and **promoDsBannerConfidentiality** (privacy policy)
- Output anywhere with auto expand
- Yandex Metrika goals
- Pass any params: ``[[!promoDs? &myparams=`Banner name`]]``
- Show once; after close button banner won't show again. For logged-in users, state stored in **extended**
- Output any content via **content** placeholder
- Use standard BannerY: ```[[!promoDs? &content=`[[!BannerY? &postion=`1` &limit=`1`]]`]]```
- AdBlock resistant
- Yandex Metrika goals (link clicks sent to Metrika)

::: warning
Only 1 banner per page.
:::

Default banner id is **name = promoDsBanner**. For multiple banners use different names:

```modx
[[!promods?
  &name=`promoDsBanner`
]]
[[!promods?
  &name=`promoDsBanner1`
]]
[[!promods?
  &name=`promoDsBanner2`
]]
```

## Installing banner

```modx
[[!promods?
  &timeout=`600`
  &tpl=`promoDsBanner`
  &name=`promoDsBanner`
]]
```

![Installing banner](https://file.modx.pro/files/3/4/0/340a2e7c337b0f7821ece6006e1f9755.png)

### Privacy policy banner

```modx
[[!promods?
  &timeout=`600`
  &tpl=`promoDsBannerConfidentiality`
  &name=`promoDsBannerConfidentiality`
]]
```

![Privacy policy banner](https://file.modx.pro/files/6/6/e/66e77e3078b827ea9ce0f669593d8960.png)

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `PromodsBanner` | Banner chunk |
| **content** | | Use instead of chunk. Can pass content, e.g. **&content=`Banner text`** |
| **reset** | `false` | Reset current user's view records |
| **target_yandex** | `false` | Send goals to Yandex Metrika (create goal first) |
| **target_target_yandex_counter** | | Metrika counter id, e.g. yaCounter37321225 ![Counter](https://file.modx.pro/files/2/9/c/29c2e861cb2b4dc95a2e6ce6db3aafb1.png) |
| **name** | `promoDsBanner` | Unique banner id for tracking |
| **pageTop** | `true` | Auto-register at top. If false, banner shows where snippet is placed |
| **showAll** | `false` | Always show regardless of close |
| **showFast** | `false` | Show immediately without delay |
| **hide_click** | `false` | Hide after ad link click and don't show again |
| **hide_timeout** | `100` | Delay before showing (ms) |
| **hide_timeout_redirect** | `100` | Redirect delay after ad link click |
| **pageShow** | | Empty = all pages. Comma-separated ids for specific pages |
| **link_target** | `.promo_ads_link_target` | Class for links that trigger Metrika goal + redirect |
| **closed** | `.promo_header__closed` | Class for close button, records that banner was shown |
| **selector** | `promo_header` | id of element where banner loads |
| **frontend_css** | `[[+assetsUrl]]css/web/default.css` | Frontend CSS |
| **frontend_js** | `[[+assetsUrl]]js/web/default.js` | Frontend JS |

### Yandex Metrika goals setup

- Enable: **target_yandex** = `1`
- Counter: **target_yandex_counter** = `yaCounter37222325`
- Default goal name: **name** = `bannerDs`
- Create JavaScript event goal in Metrika: [goal setup guide](https://yandex.ru/support/metrika/objects/report-config.html#concept__goals)

![Yandex Metrika goals](https://file.modx.pro/files/9/b/9/9b9bc3a42fce0877234b304c2ef83402.png)

### JS events

```js
PromoDs.showBefore = function () {
  // before banner expand
};
PromoDs.showAfter = function () {
  // after banner expand
};
PromoDs.hideBefore = function () {
  // before banner hide
};
PromoDs.hideAfter = function () {
  // after banner hide
};
PromoDs.beforeClick = function () {
  // after link click
};
```
