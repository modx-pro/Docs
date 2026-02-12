# Resources (modResource)

## Standard fields

Leave empty or use "ignore" to skip a field

| Field           | Name                                  | Possible value |
|-----------------|-------------------------------------------|--------------------|
| id              | Id resource                                |                    |
| pagetitle       | Title                                 |                    |
| longtitle       | Long title                     |                    |
| description     | Description                                  |                    |
| introtext       | Intro text                                 |                    |
| template        | Template (id or name)                  |                    |
| alias           | Alias                                 |                    |
| menutitle       | Menu title                                |                    |
| link_attributes | Link attributes                           |                    |
| hidemenu        | Hide from menu                            | `0 \|\| 1`         |
| published       | Published                               | `0 \|\| 1`         |
| parent          | Parent resource (id or title)     |                    |
| class_key       | Resource type                               |                    |
| content_type    | Content type                           |                    |
| content_dispo   | Content disposition               |                    |
| menuindex       | Menu index                            |                    |
| publishedon     | Date, when resource was published        |                    |
| pub_date        | Publish date                           |                    |
| unpub_date      | Unpublish date                    |                    |
| isfolder        | Container                                 | `0 \|\| 1`         |
| searchable      | Searchable                       | `0 \|\| 1`         |
| alias_visible   | Use alias in alias path | `0 \|\| 1`         |
| richtext        | Use HTML editor                | `0 \|\| 1`         |
| uri_override    | Freeze URI                            | `0 \|\| 1`         |
| uri             | URI                                       |                    |
| cacheable       | Cached                                |                    |
| deleted         | Deleted                                    |                    |
| content         | Content                      |                    |
| context_key     | Context                                  |                    |
| tv1             | TV with id 1                   |                    |

## ms2Gallery

| Name     | Name        |
| -------- | --------------- |
| `images` | list of images |

All image files must be on the server

## SEO Tab

| Field          | Name                                                         | Possible values                                                            |
| -------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| seo.index      | Search engine indexability                                     | 0 \|\| 1                                                                      |
| seo.follow     | Follow links                                            | 0 \|\| 1                                                                      |
| searchable     | Include in site search. Standard field | 0 \|\| 1                                                                      |
| seo.sitemap    | Include in Sitemap.xml                                 | 0 \|\| 1                                                                      |
| seo.priority   | Priority                                                        | 1 \|\| 0.5 \|\| 0.25                                                          |
| seo.changefreq | Content update frequency                                   | always \|\| hourly \|\| daily \|\| weekly \|\| monthly \|\| yearly \|\| never |
| seo.redirect   | 301 redirects                                                    | list of URLs                                                                    |
| uri_override   | Freeze URL alias for this page. Standard field     | 0 \|\| 1                                                                      |
| uri            | URL to freeze. Standard field                              |                                                                               |

## SEO Pro

| Field                      | Name       |
| -------------------------- | -------------- |
| keywords \|\| seo.keywords | Keywords |

## Example

**Import fields:** id,pagetitle,description,tv1

**Unique field:** id

**In table:**

![Example](https://file.modx.pro/files/b/c/9/bc9a67ebe6f717d0b0a6b8f90032ca19.jpg)
