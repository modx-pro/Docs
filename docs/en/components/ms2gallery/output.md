# Images on the Page

**ms2Gallery** can output images directly when the resource page is generated, without any snippets.

You only need to enable the system setting **ms2gallery_set_placeholders** and you can use these placeholders in content:

- `[[+ms2g.0]]` — printed array with all data of the resource's first image. The second image will be `[[+ms2g.1]]`
- `[[+ms2g.0.url]]` — link to the original image
- `[[+ms2g.0.small]]` — link to one thumbnail
- `[[+ms2g.0.medium]]` — link to another thumbnail
- `[[+ms2g.0.name]]` — image name
- and so on.

Fetching all images generates extra database queries, so it is disabled by default.

## Settings

The first setting controls the output format; the other two are for saving resources.

### ms2gallery_placeholders_tpl

Name of a TV parameter or chunk used to format the `[[+ms2g.0]]` placeholder content for displaying the image. For example:

```modx
<a href="[[+url]]">
  <img src="[[+120x90]]" />
</a>
```

Logic:

1. If placeholder output is enabled and **ms2gallery_placeholders_tpl** is not empty, then
2. Check whether the current resource has a TV with that name.
3. If not, look for a chunk with that name.
4. If a non-empty TV or chunk is found, use its content to format the placeholders on the page.
5. Otherwise, output remains the printed array with all properties.

You can write site text and insert tags like `[[+ms2g.1]]` or `[[+ms2g.25]]`. Placeholders are set by **rank**, not **id**, so you can change image order by dragging them in the gallery.

The look of the output can be set in the resource's TV, in that TV's default settings, or in a shared chunk.

### ms2gallery_placeholders_for_templates

Comma-separated list of template IDs for which to enable the placeholder feature. Empty by default, so placeholders are set for all templates.

### ms2gallery_placeholders_thumbs

List of thumbnail sizes to fetch for the page. Empty by default (all thumbnails). You can set e.g. `"medium,small"` to reduce database queries.
