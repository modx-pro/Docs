---
title: userMarker
description: Adding labels and tags to resources
logo: https://modstore.pro/assets/extras/usermarker/logo-lg.png
author: webnitros
modstore: https://modstore.pro/packages/ecommerce/usermarker
---
# userMarker

Paid component for adding labels to resources.

- [Demo](http://usermarker.bustep.ru/demo.html)
- [Demo video](https://www.youtube.com/watch?v=0nksuTp1spQ)
- [Buy](https://modstore.pro/packages/ecommerce/usermarker)

## Main features

- Labels can be assigned not only to resources but to any other objects. Set your own classKey for the button
- Context from which the resource was added is taken into account (can be disabled)
- Output of user's labeled resources via snippet ``[[!userMarker.Resource? &label=`Verified`]]`` with the desired label
- Managing created labels via personal cabinet
- Access control. Assign label management rights to specific groups and contexts. Access policy template **userMarker**

## Quick start

### Script initialization

Add the snippet to the page to initialize js and css (place in the site header)

```modx
[[!userMarker.Initialize]]
```

### Label list

Insert the snippet with labels and the add-label button

```modx
[[!userMarker.Label]]
```

#### Chunk for resource

example **tpl.userMarker.resource.row**

```modx
<h3>[[+pagetitle]]</h3>
[[!userMarker.Record? &resource_id=`[[+id]]`]]
```

#### Output list of resources

Add to the page to output labeled resources

```modx
[[!pdoPage?
  &element=`userMarker.Resource`
]]

[[!+page.nav]]
```

Or using pdoResources

```modx
[[!pdoResources?
  &tpl=`tpl.userMarker.resource.row`
  &innerJoin=`{
    "Marker": {
      "class": "userMarkerResource",
      "on": "modResource.id=Marker.resource_id"
    }
  }`
]]
```

Output list of resources with a specific label

```modx
[[!pdoPage?
  &label=`Label name`
  &element=`userMarker.Resource`
]]

[[!+page.nav]]
```

### Managing labels

Add to the page for logged-in users.

```modx
[[!userMarker.label?
  &tpl=`tpl.userMarker.manager.row`
  &tplOuter=`tpl.userMarker.manager.outer`
]]
```

### JS overrides for modal

Custom events for the js modal

```js
// Event for opening the modal
userMarker.Modal.show = function () {
  // Add your modal open script here
  $(userMarker.options.modal).modal('show');

  // Clear data after close
  $(userMarker.options.modal).on('hidden.bs.modal', function (e) {
    userMarker.removeModal();
  });
};

// Event for closing the modal
userMarker.Modal.hide = function () {
  if ($(userMarker.options.modal).length) {
    // Add your modal close script here
    $(userMarker.options.modal).modal('hide');
  }
};
```

## Snippets

### Parameters userMarker.Initialize

for loading scripts and styles

| Parameter     | Default | Description                           |
|---------------|---------|--------------------------------------|
| **selector** | `userMarker` | Selector for the add-label button |

### Parameters userMarker.Label

userMarker snippet for outputting the label block

| Parameter             | Default           | Description                                               |
|-----------------------|-------------------|-----------------------------------------------------------|
| **tplOuter**         | `tpl.userMarker.outer` | Wrapper for snippet output.                    |
| **tpl**              | `tpl.userMarker.row`   | Chunk for each result row                   |
| **resource_markers** |                        | ID of the page with labeled resources results             |
| **defaultLabel**     | `all`                  | Default label for resource selection                      |
| **user**             | `1`                    | Show only labels created by the user.                     |

### Parameters userMarker.Resource

snippet returns the list of user resources with labels

| Parameter                   | Default                  | Description                                                                                                                                                                                                                                                                           |
|----------------------------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **label**                  |                          | Label name for user resource selection. Default all returns all resources of the logged-in user                                                                                                                                                                                      |
| **class**                  | `modResource`            | Class name for selection. Default "modResource".                                                                                                                                                                                                                                      |
| **user_id**                |                          | User ID for label output                                                                                                                                                                                                                                                              |
| **tpl**                    | `tpl.userMarker.resource.row` | Chunk for each result row                                                                                                                                                                                                                                                |
| **tplOuter**               | `@INLINE [[+output]]`    | Wrapper for snippet output.                                                                                                                                                                                                                                                           |
| **limit**                  | `10`                     | Maximum number of results                                                                                                                                                                                                                                                             |
| **offset**                 | `0`                      | Number of results to skip                                                                                                                                                                                                                                                             |
| **sortby**                 | `id`                     | Sort field. For sorting by label fields add prefix "Resource.", e.g.: "&sortby=`Marker.label_id`"                                                                                                                                                                                      |
| **sortdir**                | `ASC`                    | Sort direction                                                                                                                                                                                                                                                                        |
| **toPlaceholder**          |                          | If set, the snippet stores all data in a placeholder with this name instead of outputting.                                                                                                                                                                                           |
| **toSeparatePlaceholders** |                          | If you set a word in this parameter, ALL results will be put in separate placeholders starting with this word and ending with the row index (from zero). E.g. "myPl" gives `[[+myPl0]]`, `[[+myPl1]]`, etc.                                                                           |
| **showLog**                |                          | Show extra snippet debug info. Only for users logged in to the "mgr" context.                                                                                                                                                                                                          |
| **parents**                |                          | Comma-separated list of parent IDs for the search. By default the search is limited to the current parent. Use 0 for no limit.                                                                                                                                                         |
| **resources**              |                          | Comma-separated list of product IDs to include. If product id starts with minus, that product is excluded.                                                                                                                                                                           |
| **includeContent**         |                          | Include the "content" field of products.                                                                                                                                                                                                                                               |
| **where**                  |                          | JSON-encoded string with extra conditions.                                                                                                                                                                                                                                           |
| **outputSeparator**        |                          | Optional string to separate results.                                                                                                                                                                                                                                                  |
| **returnIds**              |                          | Return a string of product IDs instead of formatted chunks.                                                                                                                                                                                                                            |
| **showUnpublished**        |                          | Include unpublished products.                                                                                                                                                                                                                                                          |
| **showDeleted**            |                          | Include deleted products.                                                                                                                                                                                                                                                              |
| **showHidden**             | `1`                      | Include products hidden in menu.                                                                                                                                                                                                                                                      |
| **outerIfEmpty**           | `1`                      | Output wrapper chunk (tplOuter) even when there are no results.                                                                                                                                                                                                                        |

### Parameters userMarker.Record

snippet for the add-label button for a resource

| Parameter        | Default            | Description                               |
|------------------|--------------------|-------------------------------------------|
| **selector**    | `userMarker`       | Selector for the add-label button         |
| **tpl**         | `tpl.userMarker.record` | Chunk for each result row         |
| **classKey**    | `modResource`      | classKey of resource for adding the record |
| **context_key** | `web`              | Resource context. Default web             |
| **resource_id** |                    | Resource ID to add the label to           |

### Parameters userMarker.Colors

snippet for outputting colors in the form

| Parameter     | Default           | Description                                                       |
|---------------|-------------------|-------------------------------------------------------------------|
| **label_id** |                    | Label ID for selection. Used when label name is missing          |
| **tpl**      | `tpl.userMarker.color` | Chunk for each result row                         |

## System settings

| Settings               | Description                                               |
|------------------------|-----------------------------------------------------------|
| **frontend_jgrowl_js**  | Frontend jgrowl scripts                                  |
| **frontend_jgrowl_css** | Frontend jgrowl styles                                   |
| **frontend_css**        | Frontend styles                                          |
| **frontend_js**         | Frontend scripts                                         |
| **meta_context**        | Register meta context tag                                |
| **regular_expression**  | Regular expression for label name validation             |
| **framework**           | Load framework                                           |
| **framework_modal**     | Modal window styles                                     |
| **resource_markers**    | ID of the page with labeled resources results            |
