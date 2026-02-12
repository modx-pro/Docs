# Resources (modResource)

## Standard resource fields

| Field           | Name                                  |
| --------------- | ----------------------------------------- |
| id              | Id resource                                |
| pagetitle       | Title                                 |
| longtitle       | Long title                     |
| description     | Description                                  |
| introtext       | Intro text                                 |
| template        | Template (id)                               |
| alias           | Alias                                 |
| menutitle       | Menu title                                |
| link_attributes | Link attributes                           |
| hidemenu        | Hide from menu                            |
| published       | Published                               |
| parent          | Parent resource (id)                   |
| class_key       | Resource type                               |
| content_type    | Content type                           |
| content_dispo   | Content disposition               |
| menuindex       | Menu index                            |
| publishedon     | Date, when resource was published        |
| pub_date        | Publish date                           |
| unpub_date      | Unpublish date                    |
| isfolder        | Container                                 |
| searchable      | Searchable                       |
| alias_visible   | Use alias in alias path |
| richtext        | Use HTML editor                |
| uri_override    | Freeze URI                            |
| uri             | URI                                       |
| cacheable       | Cached                                |
| deleted         | Deleted                                    |
| content         | Content                      |
| context_key     | Context                                  |
| tv1             | TV with id 1                   |

### Field modifiers

| Field         | Name                       |
| ------------- | ------------------------------ |
| template_name | Template (name)              |
| parent_name   | Parent resource (name) |

## ms2Gallery

| Name   | Name        |
| ------ | --------------- |
| images | list of images |

All image files must be on the server

## SEO Tab

| Field          | Name                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| seo.index      | Search engine indexability                                             |
| seo.follow     | Follow links                                                    |
| searchable     | Include in site search. Standard field resource |
| seo.sitemap    | Include in Sitemap.xml                                         |
| seo.priority   | Priority                                                                |
| seo.changefreq | Content update frequency                                           |
| seo.redirect   | 301 redirects                                                            |
| uri_override   | Freeze URL alias for this page. Standard field resource     |
| uri            | URL to freeze. Standard field resource                              |

## SEO Pro

| Field                      | Name       |
| -------------------------- |--------------- |
| keywords \|\| seo.keywords | Keywords |

## Example

**Export fields:** `id,pagetitle,description,tv1`

**Table result:**

![Table result](https://file.modx.pro/files/b/c/9/bc9a67ebe6f717d0b0a6b8f90032ca19.jpg)

## System events

Class **gsResource** fires these events:

```php
<?php
switch ($modx->event->name) {
  // fetches the list of resources
  case 'gsOnBeforeGetResource':
    // $query - selection query
    // $range - sheet name, where data will be exported
    break;
  case 'gsOnGetResource':
    // $resources - array of resources with all fields
    // $range - sheet name
    break;
}
```

### Examples

1. Select resources with a specific template

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetResource') {
      $query->where(array('template' => 3)); // 3  - id template
    }
    ```

2. Change field value publishedon (milliseconds => date)

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetResource') {
      $modx->event->params['resources'] = array_map(function ($resource) {
        if (!empty($resource['publishedon'])) {
          $resource['publishedon'] = date("d-m-Y",$resource['publishedon']);
        }
        return $resource;
      }, $resources);
    }
    ```
