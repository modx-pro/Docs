# Load by button

This button allows you to load any image from the internet directly into the gallery.
After pasting the link, a preview of the image is automatically displayed first, which indicates that the image is available.

![](https://file.modx.pro/files/4/3/1/43173dc1fac6e344bcaa5670ca7523de.png)

In action (GIF)

![](https://file.modx.pro/files/f/6/f/f6fd07cc59a6812e025e24dd74699b37s.jpg)

## How images are loaded

During loading the component does not control settings such as: **allowed image extensions**, **watermark overlay** and other settings that are set via the **file source**.

So make sure your settings match your expectations.

File source settings [minishop2](/en/components/minishop2/interface/product)
<!-- TODO: Replace link -->
File source settings [ms2Gallery](/en/components/ms2gallery/preview-generation)

## Errors during loading

When an error occurs, various messages may be returned depending on the server from which you are trying to download images.

If the image does not download from your link, there can be different reasons:

- Dynamic paths for images
- Image cache that is generated only personally when visiting the page
- The image link was copied incorrectly (you can verify by opening it in a browser)
- When copying from Google search, since Google caches images on its servers, after you copied the image link and pasted it, it may not actually exist and it was only Google's cache.

### Do not close checkbox after download

Needed when you plan to load more than one image.

![](https://file.modx.pro/files/5/9/b/59b41a33f9c666e0e2a17d28e232b085.png)

### Links to Google and Yandex search

A special block with links has been added to the window:

- Short title
- Extended title
- Article (link visible only in product card)

After clicking you are automatically taken to Google or Yandex image search where the search field will already contain your resource's title.

![](https://file.modx.pro/files/5/7/2/5728a77499b5beb948064b98eaf86a8c.png)

### Custom search

Ability to create your own search and go to results.

*Empty by default, and the tab is not displayed.*

![](https://file.modx.pro/files/e/1/2/e1228022446cfc57942549a5a3b55f03.png)

---

You can set in system setting: **msgallerysearch_custom_search** the address of the site where the search will be performed with the **{query}** parameter (when clicking the link it will be replaced with the short or extended resource title)

![](https://file.modx.pro/files/3/d/b/3db07df63ccab9302ac9f0b3945f1ffb.png)

```
http://mysite.ru/search.html?query={query}
```

After clicking the link, search results will open on your site.

![](https://file.modx.pro/files/8/3/4/8345fa757c3668d5e24c595e4fad6698.png)
