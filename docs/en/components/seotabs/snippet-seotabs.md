# seoTabs

Snippet for outputting SEOtabs on the site.

## Parameters

| Parameter       | Default                                                 | Description                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|**ajax**         | `0`                                                     | Ajax tab data loading
|**rid**          | `0`                                                     | Resource id for tabs. If empty, current resource id is used.
|**up**           | `1`                                                     | Look for tabs in parents if current resource has none.
|**css**          | `null`                                                  | Path to custom styles, or clear and load via site template.
|**jquery**       | `0`                                                     | Whether to load jQuery.
|**jqueryUrl**    | `https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js` | jQuery URL.
|**js**           | `{+assets_url}js/web/default.min.js`                    | Path to custom scripts, or clear and load via site template.
|**tpl**          | `tpl.seoTabs`                                           | Chunk for snippet output.
|**tplTab**       | `tpl.seoTabsTab`                                        | Chunk for tab.
|**tplTabContent**| `tpl.seoTabsContent`                                    | Chunk for tab content.
|**tplWrapper**   | `tpl.seoTabsWrapper`                                    | Wrapper chunk for all output.

## AJAX parameter

When `ajax` is set to `1` (`ajax => 1`), the seoTabs snippet does not output other tab content in SEO tab virtual page code. SEO tab content is not in the main page code. This creates maximally unique virtual pages for specific query groups.
