---
title: PageBreaker
description: Split a page into parts by a special tag
logo: https://modstore.pro/assets/extras/pagebreaker/logo-lg.jpg
author: bezumkin
modstore: https://modstore.pro/packages/content/pagebreaker
repository: https://github.com/modx-pro/PageBreaker

items: [
  { text: 'Settings', link: 'settings' },
  { text: 'Support for TinyMCE', link: 'tinymce-support' },
]
---
# PageBreaker

Plugin that splits long page content into multiple subpages.

## How it works

The plugin looks for separators in the page content (default `<!-- pagebreak -->`). When found, it splits the page at those points and generates links to the next parts.

When following such a link, MODX does not find a real page (it does not exist) and fires *OnPageNotFound*.
The plugin handles this event, computes the requested content part and outputs it.

So you get several "virtual" pages from one real page.

## Demo

See the plugin in action on the [demo site][1].

![Demo](https://file.modx.pro/files/0/e/d/0ed53550272ad3c7d3860d18a0697762.png)

## Features

- Works with cached resources.
- Runs only when the content has separators.
- Includes a PageBreak plugin for TinyMCE (TypoMCE) for automatic text splitting.
- Supports friendly URLs.
- Supports regular documents and containers.

## Chunks

The following chunks are used for pagination:

| Name                       | Description                                      | Placeholders                                                                                                                                                             |
|----------------------------|--------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **tpl.PageBreaker.begin**  | Link to the first page                           | `[[+link]]` — page link                                                                                                                                                  |
| **tpl.PageBreaker.next**   | Link to the next page (may be empty)              | `[[+link]]` — page link                                                                                                                                                  |
| **tpl.PageBreaker.prev**   | Link to the previous page (may be empty)         | `[[+link]]` — page link                                                                                                                                                  |
| **tpl.PageBreaker.outer**  | Block with all links                              | `[[+pb_link_prev]]`, `[[+pb_link_next]]`, `[[+pb_link_begin]]` — links, `[[+pb_page]]` — current page number, `[[+pb_total]]` — total pages                              |

On the first or last page, the previous or next link is not generated.
This lets you handle those cases with [output filters][2] and put the link at the start of the document.
That is how the standard outer chunk works:

```modx
<div class="pagebreaker">
  [[+pb_link_prev]]

  <span class="pb_page_current">[[+pb_page]]</span>
  [[%pb_page_from]]
  <span class="pb_page_total">[[+pb_total]]</span>

  [[+pb_link_next:default=`[[+pb_link_begin]]`]]
</div>
```

## Ajax

The plugin can work in Ajax mode (switch pages without reload).

- Enable the [system setting][3] **pagebreaker_ajax**
- Page links must have the class `pb_link`. Check if you changed the default chunks.
- The `[[*content]]` tag must be wrapped in an element with **#pagebreaker_content** (can be changed in **pagebreaker_ajax_selector**).

Example:

```modx
<div id="pagebreaker_content">
  [[*content]]
</div>
```

In Ajax mode the plugin uses the JavaScript History API, so the URL updates as without Ajax.
No extra parameters in the address bar.

For older browsers, a hash in the URL is used.

[1]: http://demo.modx.pro/pagebreaker
[2]: /en/system/basics/output-filters
[3]: /en/components/pagebreaker/settings
