# Working with images

## Built-in lazy-load

The package includes a JS plugin for lazy-loading images that listens to the document `scroll` event. Enable it by clearing system setting `mpc_lazyload_attr`. The plugin may not work with some sliders or elements that hide images initially; in that case trigger it manually. Put a script in `assets/js/` like:

```js
import * as functions from './../components/migxpageconfigurator/js/web/functions.js';

document.addEventListener('DOMContentLoaded', () => {
  elem.addEventListener('some-event', () => {
    functions.lazyLoad(elem, 1);
  });
});
```

`lazyLoad` takes 3 arguments:

1. `lazyLoadAttr` — attribute that holds the real image URL before setting `src`; default `data-lazy`
2. `parent` — element to search for images in; default `document`
3. `show` — force load images without checking visibility

## Image cropping

If an image has `width` and `height` attributes, they are saved in the admin and used when parsing to build a thumbnail via snippet `pThumb`. Thumbnail format is set in `mpc_thumb_format`. Example:

```html
<img
  data-mpc-field="img"
  src="assets/project_files/images/otkrytie1.png"
  width="100"
  height="100"
  alt=""
>
```

Output:

```fenom
<img
  src="assets/components/migxpageconfigurator/images/fake-img.png"
  width="{$img_w}"
  height="{$img_h}"
  alt="{$title | notags}"
  data-lazy="{set $params = 'w='~$img_w~'&h='~$img_h~'&zc=1&ra=1&bg=&f=png'}{$img | pThumb:$params}"
>
```
